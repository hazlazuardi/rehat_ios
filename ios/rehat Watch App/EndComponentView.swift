//
//  EndComponentView.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 15/10/23.
//

import SwiftUI


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
