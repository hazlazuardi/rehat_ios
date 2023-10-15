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
    five_to_one = "5-4-3-2-1"
}

// buttons that appear on recovery method end
// shows buttons to either
//    redo chosen method,
//    choose another method,
//    or end the recovery session.
// Takes the chosen method as a string
struct EndComponentView: View {
  @State var chosenMethod: RecoveryMethodNames
  @ObservedObject var therapyList = ReadDataTherapy()
    var body: some View {
        Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/)
    }
}

#Preview {
  return EndComponentView(chosenMethod: RecoveryMethodNames.breathing)
}
