//
//  EmergencyContactsView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 3/10/2023.
//

import SwiftUI

struct EmergencyContactsView: View {
    @ObservedObject var rnConnector = RNConnector()

    var body: some View {
        List(rnConnector.contacts, id: \.id) { contact in
            VStack(alignment: .leading) {
                Text(contact.name)
                    .font(.headline)
                Text(contact.phoneNum)
                    .font(.subheadline)
            }
        }
        .onAppear {
            // This is optional now, but you can still use it for other setup if needed
        }
    }
}

#Preview {
  EmergencyContactsView()
}
