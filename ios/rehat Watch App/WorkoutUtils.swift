//
//  WorkoutUtils.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 12/10/23.
//

import Foundation
import HealthKit
import WatchConnectivity

/// Workout Management
/// =================
/// Implemented as a workaround for running background tasks on WatchOS,
/// as I couldn't get the BackgroundTasks module working.
/// base workout code adapted from: https://developer.apple.com/videos/play/wwdc2021/10009/
///
/// Used to run background tasks to:
/// - Continuously measure HR and HRV Data
/// - Infer the user's panic state using the model
/// - Track the user's recovery time & methods used during the guided recovery phase
class WorkoutManager: NSObject, ObservableObject {
  // app-wide HealthKit storage
  let healthStore = RehatHealthStore.store
  
  // biofeedback data
  @Published var heartRate: Double = 0.0
  @Published var restingHeartRate: Double = 0.0
  @Published var hrv: Double = 0.0
  @Published var workout: HKWorkout?
  private var averageHeartRate: Double = 0.0
  
  // prediction notification downtime settings
  private var shouldNotify: Bool = true
  private var dateOnLastNotifSent: Date = Calendar.current.startOfDay(for: .now)
  private var dateOnLastPredict: Date = Calendar.current.startOfDay(for: .now)
  private let NOTIF_DOWNTIME: Double = -3600
  private let PREDICT_DOWNTIME: Double = -60
  
  // panic state tracking data
  private var isPanic: Bool = false
  @Published var methodsUsed: [String] = []
  private var treatmentStart: Date = Calendar.current.startOfDay(for: .now)
  private var treatmentEnd: Double = Calendar.current.startOfDay(for: .now).timeIntervalSince1970
  private var recoveryDuration: Int = 0
  
  // recovery method suggestions
  private var methodScoringData: [MethodScoringData] = []
  @Published var recommendedMethod: String = ""
  
  // workout session management
  var session: HKWorkoutSession?
  var builder: HKLiveWorkoutBuilder?
  
  // MARK: Enable background processing
  /// Starts workout to enable background processing
  func startWorkout() {
    let configuration = HKWorkoutConfiguration()
    configuration.activityType = .other
    // assumption: location data unimportant,
    // improves battery life as location tracking isn't needed
    configuration.locationType = .indoor
    
    // set up workout session
    do {
      session = try HKWorkoutSession(healthStore: healthStore, configuration: configuration)
      builder = session?.associatedWorkoutBuilder()
    } catch {
        return
    }
    
    // link HealthKit storage to workout session
    builder?.dataSource = HKLiveWorkoutDataSource(healthStore: healthStore, workoutConfiguration: configuration)
    
    // establish workout session delegates
    session?.delegate = self
    builder?.delegate = self
    
    // start workout
    let startDate = Date()
    session?.startActivity(with: startDate)
    builder?.beginCollection(withStart: startDate) { (success, error) in
      // workout starts
      if success {
        print("Workout has started!")
      } else {
        print("Failed to start workout.")
      }
    }
  }
  
  /// Enable running tasks in the background, as soon as the workout samples new data from HealthKit
  ///
  /// Parameter:
  /// - statistics: newly-updated HealthKit statistics, sampled by the workout session
  func updateForStatistics(_ statistics: HKStatistics?) {
    guard statistics != nil else { return }
      // run background tasks asynchronously
      DispatchQueue.main.async {
        if self.isPanic {
          // track recovery data, then stop if HR falls below threshold
          self.endOnPanicStop()
        } else {
          // classify panic states
          self.runBackgroundTask()
        }
      }
  }
  
  // MARK: Panic State Notification
  /// Background task to be run when user is in a non-panic state
  /// Infers predicted state from compiled model based on gathered HR & HRV data
  private func runBackgroundTask() {
    // skip if it's been too soon since last bg task
    // prevents burning through the watch battery
    if (dateOnLastPredict.timeIntervalSinceNow > PREDICT_DOWNTIME) {
      return
    }
    
    // skip if it's been too soon since last notification
    if (dateOnLastNotifSent.timeIntervalSinceNow > NOTIF_DOWNTIME) {
      return
    }
    
    // track runtime of background task
    let clock = ContinuousClock()
    let runtime = clock.measure {
      print("Running Background Task!")
      // update resting HR
      startHealthKitQuery(
        quantityTypeIdentifier: .restingHeartRate,
        healthStore: self.healthStore,
        updateFunction: self.updateRestingHeartRate
      )
      
      // update average heart rate
      startAverageQuery(
        quantityTypeIdentifier: .heartRate,
        healthStore: self.healthStore,
        lastNSeconds: TimeInterval(600),
        updateFunction: self.updateAverageHeartRate
      )
      
      // update HRV
      startHealthKitQuery(
        quantityTypeIdentifier: .heartRateVariabilitySDNN,
        healthStore: self.healthStore,
        updateFunction: self.updateHRV
      )
      
      print("Running prediction on HR \(self.heartRate)bpm, HRV \(self.hrv)ms")
      let label: ClassifierLabel = predict(hr: self.averageHeartRate, sdnn: self.hrv)
      self.dateOnLastPredict = Date()
      
      if ([.panic,.prePanic].contains(label) && self.shouldNotify) {
        self.endWorkout()
        sendNotification()
        self.dateOnLastNotifSent = Date()
      }
    }
    
    print("Ran Background Task for \(runtime)")
  }
  
  /// Updates average heart rate
  /// To be run as an updateHandler in startAverageQuery
  private func updateAverageHeartRate(samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) -> Void {
    (self.averageHeartRate, self.shouldNotify) = getAverageOfSamples(samples: samples, type: type)
    print("Updated average HR: \(self.averageHeartRate)")
  }
  
  /// Updates HRV
  /// To be run as an updateHandler in startHealthKitQuery
  private func updateHRV(samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) -> Void {
    (self.hrv, _) = getLatestSample(samples: samples, type: type)
    print("Got latest HRV: \(self.hrv)")
  }
  
  /// Updates Resting HR
  /// To be run as an updateHandler in startHealthKitQuery
  private func updateRestingHeartRate(samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) -> Void {
    (self.restingHeartRate, _) = getLatestSample(samples: samples, type: type)
    print("Updated Resting HR to: \(self.restingHeartRate)")
  }
  
  // MARK: - State Control
  // The workout session state.
  @Published var running = false

  func pause() {
      print("Workout paused.")
      session?.pause()
  }

  func resume() {
      print("Resuming workout.")
      session?.resume()
  }

  func togglePause() {
      if running == true {
          pause()
      } else {
          resume()
      }
  }

  func endWorkout() {
      print("Ending workout.")
      session?.end()
  }
  
  // MARK: Panic State Tracking
  /// Start tracking recovery phase
  func startTracking() {
    self.isPanic = true
    if !self.running { self.startWorkout() }
    self.treatmentStart = Date()
  }
  
  /// End recovery phase tracking
  func endTracking() {
    // panic state has ended,
    // either by user input or hr prediction
    print("Stopped tracking")
    self.isPanic = false
    self.treatmentEnd = Date().timeIntervalSince1970
    
    self.recoveryDuration = self.getTrackedDuration()
    self.treatmentEnd = Date().timeIntervalSince1970
      
    // Send data to iOS for self-monitoring
    let recoverySessionData = [
      "timestamp": self.treatmentEnd
    ]
    transferRecoverySessionData(data: recoverySessionData)
    
    // Save recovery durations for each method to calculate effectiveness
    self.methodScoringData = StorageManager.shared.retrieveMethodScoringData()
    for method in self.methodsUsed {
      self.updateMethodScoringData(id: method)
    }
    StorageManager.shared.saveMethodScoringData(self.methodScoringData)
    
    // update recommended recovery method
    self.updateRecommendedMethod()
    self.transferRecommendedMethod()
    
    // clean up
    self.methodsUsed = []
  }
  
  /// Returns length of time since the start of the recovery phase
  func getTrackedDuration() -> Int {
    // NOTE: this may crash if time interval overflows int limit, though unlikely.
    let duration = Int( self.treatmentStart.timeIntervalSinceNow * -1 )
    return duration
  }
  
  /// Background task to be run when user is in the guided recovery phase
  /// Ends tracking if user's heart rate falls below the theshold of their resting heart rate
  private func endOnPanicStop() {
    startHealthKitQuery(
      quantityTypeIdentifier: .heartRateVariabilitySDNN,
      healthStore: self.healthStore,
      updateFunction: self.updateHRV
    )
    
    // HR falls below threshold of resting HR. May need to tweak this
    if self.heartRate < (self.restingHeartRate * 0.1 + self.restingHeartRate) {
      self.endTracking()
    }
  }
  
  /// Send data to iOS companion app
  /// Parameter:
  /// - data: expected to be a String:Int dictionary
  /// Note:
  /// - iOS companion app expects contents of the dictionary to contain one element with
  ///     key   : "timestamp"
  ///     value: Double containing the end time of the recovery session formatted according to UNIX Epoch
  func transferRecoverySessionData(data: [String:Any]) {
    print("Transferring data: \(data)")
    // use UserInfo here so separate instances don't overwrite each other
    WCSession.default.transferUserInfo(data)
  }
  
  /// Send recommended method to iOS companion app
  func transferRecommendedMethod() {
    print("Transferring recommended recovery method: \(self.recommendedMethod)")
    do {
      // use ApplicationContext here so new recommended method gets replaced
      try WCSession.default.updateApplicationContext(["recommendedMethod" : self.recommendedMethod])
    }
    catch {
      print("error sending application context: \(error)")
    }
  }
  
  // MARK: Recovery Method Scoring
  /// Updates locally stored recovery stage durations associated to each method
  /// Parameters:
  /// - id: name of the method used
  func updateMethodScoringData(id: String) {
    if let index = self.methodScoringData.firstIndex(where: { $0.id == id }) {
      self.methodScoringData[index].panicDurations += [self.recoveryDuration]
    } else {
      self.methodScoringData.append(
        MethodScoringData(
          id: id,
          panicDurations: [self.recoveryDuration]
        )
      )
    }
  }
  
  /// Updates current method to recommend to the user
  func updateRecommendedMethod() {
    if let best = self.methodScoringData.min(by: {
        mean(of: $0.panicDurations) < mean(of: $1.panicDurations)
      }) {
      print("Updated best method to \(best.id)")
      self.recommendedMethod = best.id
    } else {
      return
    }
  }
  
  /// Caclulates mean of an array of integers
  /// To be used to calculate the average recovery duration of a particular method
  private func mean(of ints: [Int]) -> Double {
    return Double(ints.reduce(0, +)) / Double(ints.count)
  }
}

// MARK: - HKWorkoutSessionDelegate
/// Enables the WorkoutManager to handle HealthKitWorkoutSession background processes
extension WorkoutManager: HKWorkoutSessionDelegate {
    func workoutSession(_ workoutSession: HKWorkoutSession,
                        didChangeTo toState: HKWorkoutSessionState,
                        from fromState: HKWorkoutSessionState,
                        date: Date) {
        DispatchQueue.main.async {
            self.running = toState == .running
        }

        // Wait for the session to transition states before ending the builder.
        if toState == .ended {
            builder?.endCollection(withEnd: date) { (success, error) in
                self.builder?.finishWorkout { (workout, error) in
                  DispatchQueue.main.async {
                    self.workout = workout
                  }
                }
            }
        }
    }

    /// To be called when workout session fails
    func workoutSession(_ workoutSession: HKWorkoutSession, didFailWithError error: Error) {

    }
  
    /// Resets background task-related data
    func resetWorkout() {
        print("Resetting workout statistics.")
        builder = nil
        session = nil
        workout = nil
        heartRate = 0
        restingHeartRate = 0
        hrv = 0
    }
}

// MARK: - HKLiveWorkoutBuilderDelegate
/// Enables the WorkoutManager to call a function when HealthKit receives a new sample during the workout
extension WorkoutManager: HKLiveWorkoutBuilderDelegate {
    func workoutBuilderDidCollectEvent(_ workoutBuilder: HKLiveWorkoutBuilder) {
    }

    /// Is called whenever HealthKit collects new data during the workout
    func workoutBuilder(_ workoutBuilder: HKLiveWorkoutBuilder, didCollectDataOf collectedTypes: Set<HKSampleType>) {
        for type in collectedTypes {
            guard let quantityType = type as? HKQuantityType else { return }

            let statistics = workoutBuilder.statistics(for: quantityType)

            // Update the published values.
            updateForStatistics(statistics)
        }
    }
}

func setPanic(appState: AppState) {
  appState.setPanicTrue()
}

