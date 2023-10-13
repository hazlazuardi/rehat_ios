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
  
  var session: HKWorkoutSession?
  var builder: HKLiveWorkoutBuilder?
  
  func startWorkout() {
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
    }
  }
  
  // MARK: - State Control
  // The workout session state.
  @Published var running = false

  func pause() {
      session?.pause()
  }

  func resume() {
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
      session?.end()
  }
  
  @Published var heartRate: Double = 0.0
  @Published var hrv: Double = 0.0
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
                }
            }
        }
    }

    func workoutSession(_ workoutSession: HKWorkoutSession, didFailWithError error: Error) {

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
//            updateForStatistics(statistics)
        }
    }
}
