//
//  EmergencyContactsView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 3/10/2023.
//

import SwiftUI

struct EmergencyContactsView: View {
    @EnvironmentObject var workoutManager: WorkoutManager
    @ObservedObject var rnConnector: RNConnector
//  @ObservedObject var rnConnector = RNConnector()
  
  
  func makePhoneCall(phoneNumber: String) {
    if let phoneURL = URL(string: "tel:\(phoneNumber)") {
      WKExtension.shared().openSystemURL(phoneURL)
    }
  }
  
  var body: some View {
    NavigationStack {
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
      .navigationTitle("Emergency Contacts")
      .containerBackground(.green.gradient, for: .navigation)
    }
  }
}

#Preview {
  let rnConnector = RNConnector() // Create an instance of RNConnector
  return EmergencyContactsView(rnConnector: rnConnector) // Pass it to EmergencyContactsView
}
