//
//  EndComponentView.swift
//  rehat Watch App
//
//  Created by Avanox on 15/10/23.
//

import SwiftUI

enum RecoveryMethodNames: String {
  case
    breathing = "Guided Breathing",
    affirmation = "Self-Affirmation",
    muscle_relaxation = "Muscle Relaxation",
    closed_eyes = "Closed Eyes Visualization",
    five_to_one = "5-4-3-2-1",
    call = "Emergency Call"
}

// buttons that appear on recovery method end
// shows buttons to either
//    redo chosen method,
//    choose another method,
//    or end the recovery session.
// Takes the chosen method as a string
struct EndComponentView: View {
  @EnvironmentObject var appState: AppState
  @EnvironmentObject var workoutManager: WorkoutManager
  @Binding var selection: Int
  @Binding var otherTechniquesAreShown: Bool
    var body: some View {
      VStack {
//        Button {
//          // TODO: append another instance to methodsUsed?
//          selection = 1
//        } label: {
//          Text("Restart Recovery")
//        }
        Button {
          // TODO: add method to methodsUsed
          otherTechniquesAreShown = true
          selection = 2
        } label: {
          Text("Try Something Else")
        }
        Button {
          workoutManager.endTracking()
          otherTechniquesAreShown = false
          appState.setPanicFalse()
          // TODO: wrap up panic pipeline.
        } label: {
          Text("I'm Fine Now")
        }
      }
    }
}

//#Preview {
//  return EndComponentView(otherTechniquesAreShown: false)
//}
