//
//  ContentView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 11/09/23.
//

import SwiftUI

struct ContentView: View {
  @StateObject var rnConnector = RNConnector()
  @EnvironmentObject var workoutManager: WorkoutManager
  @EnvironmentObject var appState: AppState
  @State var selection = 1
  var body: some View {
    if appState.isPanic {
      // handle flow on panic button pressed
      PanicRecoveryPipelineView(rnConnector: rnConnector)
    } else {
      TabView {
        PanicView().tag(1)
        RecoveryView(rnConnector: rnConnector)
        EmergencyContactsView(rnConnector: rnConnector)
      }.onAppear(perform: {
        self.selection = 1
        requestAuthorizations()
        if (!workoutManager.running) {
          workoutManager.startWorkout()
        }
      })
    }
  }
}

func requestAuthorizations() {
  requestHealthKitAuthorization(healthStore: RehatHealthStore.store)
  requestNotifAuthorization()
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
