//
//  PanicRecoveryPipelineView.swift
//  rehat Watch App
//
//  Created by Avanox on 15/10/23.
//

import SwiftUI

struct PanicRecoveryPipelineView: View {
    @ObservedObject var rnConnector: RNConnector
    @EnvironmentObject var workoutManager: WorkoutManager
    @State private var selection = 1
  
    var body: some View {
      TabView (selection: $selection) {
        // TODO: set recovery view as landing page
        EndComponentView()
        RecoveryView(rnConnector: rnConnector).tag(1)
        EmergencyContactsView(rnConnector: rnConnector)
      }.onAppear {
        selection = 1
        if (!workoutManager.running) {
          workoutManager.isPanic = true
          workoutManager.startWorkout()
        } 
      }
    }
}

#Preview {
    let rnConnector = RNConnector() // Create an instance of RNConnector
    return PanicRecoveryPipelineView(rnConnector: rnConnector)
}
