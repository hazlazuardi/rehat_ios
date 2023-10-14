//
//  WorkoutUtils.swift
//  rehat Watch App
//
//  Created by Avanox on 12/10/23.
//

import Foundation
import HealthKit

// Singleton workout session
//class WorkoutSession {
//  static var instance: HKWorkoutSession?
//}

class WorkoutManager: NSObject, ObservableObject {
  let healthStore = RehatHealthStore.store
  @Published var isPanic: Bool = false
  @Published var heartRate: Double = 0.0
  @Published var restingHeartRate: Double = 0.0
  @Published var hrv: Double = 0.0
  @Published var workout: HKWorkout?
  private var averageHeartRate: Double = 0.0
  private var dateOnLastNotifSent: Date = Calendar.current.startOfDay(for: .now)
  private var dateOnLastPredict: Date = Calendar.current.startOfDay(for: .now)
  // FIXME: Tweak these downtime intervals
  private let NOTIF_DOWNTIME: Double = -3600
  private let PREDICT_DOWNTIME: Double = -60
  
  var session: HKWorkoutSession?
  var builder: HKLiveWorkoutBuilder?
  
  func startWorkout() {
    print("Starting workout...")
    let configuration = HKWorkoutConfiguration()
    configuration.activityType = .other
    // assumption: location data unimportant,
    // improves battery life as location tracking isn't needed
    configuration.locationType = .indoor
    
    do {
      session = try HKWorkoutSession(healthStore: healthStore, configuration: configuration)
      builder = session?.associatedWorkoutBuilder()
    } catch {
        // Handle failure here.
        return
    }
    
    builder?.dataSource = HKLiveWorkoutDataSource(healthStore: healthStore, workoutConfiguration: configuration)
    session?.delegate = self
    builder?.delegate = self
    
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
  
  // Background processing
  // Continuously scan for new HK readings and make classification
  func updateForStatistics(_ statistics: HKStatistics?) {
      guard let statistics = statistics else { return }

      DispatchQueue.main.async {
        self.runBackgroundTask()
      }
  }
  
  private func runBackgroundTask() {
    // skip if it's been too soon since last bg task
    if (dateOnLastPredict.timeIntervalSinceNow > PREDICT_DOWNTIME) {
      return
    }
    
    // skip if it's been too soon since last notification
    if (dateOnLastNotifSent.timeIntervalSinceNow > NOTIF_DOWNTIME) {
      return
    }
    
    let clock = ContinuousClock()
    let runtime = clock.measure {
      print("Running Background Task!")
      startAverageQuery(
        quantityTypeIdentifier: .heartRate,
        healthStore: self.healthStore,
        lastNSeconds: TimeInterval(600),
        updateFunction: self.updateAverageHeartRate
      )
      
      startHealthKitQuery(
        quantityTypeIdentifier: .heartRateVariabilitySDNN,
        healthStore: self.healthStore,
        updateFunction: self.updateHRV
      )
      
      print("Running prediction on HR \(self.heartRate)bpm, HRV \(self.hrv)ms")
      let label = predict(hr: self.averageHeartRate, sdnn: self.hrv).label
      self.dateOnLastPredict = Date()
      
      if ([1,2].contains(label)) {
        self.endWorkout()
        sendNotification()
        self.dateOnLastNotifSent = Date()
      }
    }
    
    print("Ran Background Task for \(runtime)")
  }
  
  private func updateAverageHeartRate(samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) -> Void {
    self.averageHeartRate = getAverageOfSamples(samples: samples, type: type)
    print("Updated average HR: \(self.averageHeartRate)")
  }
  
  private func updateHRV(samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) -> Void {
    (self.hrv, _) = getLatestSample(samples: samples, type: type)
    print("Got latest HRV: \(self.hrv)")
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
}

// MARK: - HKWorkoutSessionDelegate
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

    func workoutSession(_ workoutSession: HKWorkoutSession, didFailWithError error: Error) {

    }
  
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
extension WorkoutManager: HKLiveWorkoutBuilderDelegate {
    func workoutBuilderDidCollectEvent(_ workoutBuilder: HKLiveWorkoutBuilder) {
    }

    func workoutBuilder(_ workoutBuilder: HKLiveWorkoutBuilder, didCollectDataOf collectedTypes: Set<HKSampleType>) {
        for type in collectedTypes {
            guard let quantityType = type as? HKQuantityType else { return }

            let statistics = workoutBuilder.statistics(for: quantityType)

            // Update the published values.
            updateForStatistics(statistics)
        }
    }
}
