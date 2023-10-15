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
  
    var body: some View {
      TabView {
        RecoveryView(rnConnector: rnConnector)
        EmergencyContactsView(rnConnector: rnConnector)
      }
    }
}

#Preview {
    let rnConnector = RNConnector() // Create an instance of RNConnector
    return PanicRecoveryPipelineView(rnConnector: rnConnector)
}
