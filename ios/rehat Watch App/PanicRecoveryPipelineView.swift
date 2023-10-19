//
//  PanicRecoveryPipelineView.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 15/10/23.
//

import SwiftUI

struct PanicRecoveryPipelineView: View {
    @ObservedObject var rnConnector: RNConnector
    @ObservedObject var recoveryDatas = ReadDataTherapy()
    @EnvironmentObject var workoutManager: WorkoutManager
    @State private var selection = 1
    @State public var otherTechniquesAreShown = false
  
    var body: some View {
      TabView (selection: $selection) {
        EndComponentView(
          selection: $selection,
          otherTechniquesAreShown: $otherTechniquesAreShown
        ).tag(0)
        
        if otherTechniquesAreShown {
          // TODO: don't use recovery view here
          RecoveryView(rnConnector: rnConnector, emergencyContactsShown: true).tag(2)
        } else {
          if rnConnector.recoveryPreferences.isEmpty {
            Text("Loading...")
          } else {
            let firstPreference = rnConnector.recoveryPreferences.first?.label
            switch firstPreference {
              case "Guided Breathing":
                BreathView(autoStart: true).tag(1)
              case "Affirmation":
              AffirmView()
                .tag(1)
                .containerBackground(.purple.gradient, for: .navigation)

              case "Muscle Relaxation":
                DetailView(therapy: recoveryDatas.therapies.first(where: {$0.name == "Muscle Relaxation"})!).tag(1)
              case "Closed Eyes Visualization":
                DetailView(therapy: recoveryDatas.therapies.first(where: {$0.name == "Closed Eyes Visualization"})!).tag(1)
              case "Five Senses":
                DetailView(therapy: recoveryDatas.therapies.first(where: {$0.name == "Five Senses"})!).tag(1)
              case "Emergency Call":
                EmergencyContactsView(rnConnector: rnConnector).tag(1)
              default:
                BreathView(autoStart: true).tag(1)
              }
          }
        }
      }.onAppear {
        // go to first preference
        selection = 1
        
        // start tracking duration
        workoutManager.startTracking()
      }
    }
}

#Preview {
    let rnConnector = RNConnector() // Create an instance of RNConnector
    return PanicRecoveryPipelineView(rnConnector: rnConnector)
}
