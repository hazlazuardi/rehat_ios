//
//  WorkoutView.swift
//  rehat Watch App
//
//  Created by Avanox on 12/10/23.
//

import SwiftUI

struct WorkoutView: View {
  @EnvironmentObject var workoutManager: WorkoutManager
    var body: some View {
      VStack {
        Button {
          workoutManager.startWorkout()
        } label: {
          Text("Start Workout")
        }
        Button {
          workoutManager.endWorkout()
        } label: {
          Text("End Workout")
        }
      }
    }
}

#Preview {
    WorkoutView()
}
