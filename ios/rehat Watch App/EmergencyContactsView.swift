//
//  EmergencyContactsView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 3/10/2023.
//

import SwiftUI

struct EmergencyContactsView: View {
    @EnvironmentObject var workoutManager: WorkoutManager
    @EnvironmentObject var appState: AppState
    @ObservedObject var rnConnector: RNConnector
//  @ObservedObject var rnConnector = RNConnector()
  
  
  func makePhoneCall(phoneNumber: String) {
    if let phoneURL = URL(string: "tel:\(phoneNumber)") {
      WKExtension.shared().openSystemURL(phoneURL)
    }
  }
  
  var body: some View {
    NavigationStack {
      if rnConnector.contacts.isEmpty {
        VStack {
          
          Text("No contacts have been set.")
            .frame(width: 150, alignment: .leading)
            .foregroundColor(.white)
            .font(.caption)
          
          Spacer()
            .frame(height: 8)
          
          Text("Set it on Settings > Manage Emergency Contacts on the iOS app")
            .frame(width: 150, alignment: .leading)
            .foregroundColor(.white.opacity(0.5))
            .font(.custom("test", size: 12))
          
        }
        .containerBackground(.green.gradient, for: .navigation)
        .navigationTitle("Emergency Contacts")
      } else {
        List(rnConnector.contacts, id: \.id) { contact in
          Button(action: {
            // Button to call someone
            self.makePhoneCall(phoneNumber: contact.phoneNum)
          }) {
            VStack(alignment: .leading) {
              Text(contact.name)
                .font(.title3)
              Text(contact.phoneNum)
                .font(.caption2)
                .foregroundColor(Color.white.opacity(0.5))
            }
          }
          .buttonStyle(PlainButtonStyle()) // This will remove the default button appearance
        }
        .containerBackground(.green.gradient, for: .navigation)
        .navigationTitle("Emergency Contacts")
      }
    }
    .onAppear {
      if appState.isPanic {
        workoutManager.methodsUsed.append(RecoveryMethodNames.call.rawValue)
      }
    }
  }
}

#Preview {
  let rnConnector = RNConnector() // Create an instance of RNConnector
  return EmergencyContactsView(rnConnector: rnConnector) // Pass it to EmergencyContactsView
}
