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
  @Published var heartRate: Double = 0.0
  @Published var restingHeartRate: Double = 0.0
  @Published var hrv: Double = 0.0
  @Published var workout: HKWorkout?
  
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
  
  func updateForStatistics(_ statistics: HKStatistics?) {
      guard let statistics = statistics else { return }

      // TODO: get average heart rate over 6 minute intervals (Rubin et al. section 3)
      DispatchQueue.main.async {
        print("updating statistics for ", terminator: "")
        switch statistics.quantityType {
        case HKQuantityType.quantityType(forIdentifier: .heartRate):
          let heartRateUnit = HKUnit.count().unitDivided(by: HKUnit.minute())
          self.heartRate = statistics.mostRecentQuantity()?.doubleValue(for: heartRateUnit) ?? 0
          print("HR: \(self.heartRate) BPM")
          _ = predict(hr: self.heartRate, sdnn: 55.5)
        case HKQuantityType.quantityType(forIdentifier: .restingHeartRate):
          let heartRateUnit = HKUnit.count().unitDivided(by: HKUnit.minute())
          self.restingHeartRate = statistics.mostRecentQuantity()?.doubleValue(for: heartRateUnit) ?? 0
          print("Resting HR: \(self.restingHeartRate) BPM")
        case HKQuantityType.quantityType(forIdentifier: .heartRateVariabilitySDNN):
          let hrvUnit = HKUnit.secondUnit(with: .milli)
          self.hrv = statistics.mostRecentQuantity()?.doubleValue(for: hrvUnit) ?? 0
          print("HRV: \(self.hrv) ms")
        default:
            return
        }
      }
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
