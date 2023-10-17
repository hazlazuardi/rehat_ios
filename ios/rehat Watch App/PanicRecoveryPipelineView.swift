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
    @State var otherTechniquesAreShown = false
  
    var body: some View {
      TabView (selection: $selection) {
        EndComponentView(
          selection: $selection,
          otherTechniquesAreShown: $otherTechniquesAreShown
        ).tag(0)
        
        if otherTechniquesAreShown {
          // TODO: don't use recovery view here
          RecoveryView(rnConnector: rnConnector).tag(2)
        } else {
          // TODO: show user's first preference
          BreathView().tag(1)
        }
        
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
