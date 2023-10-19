//
//  NotifTestView.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 10/10/23.
//

import SwiftUI

struct NotifTestView: View {
    var body: some View {
      VStack {
        Button {
          sendNotification()
        } label: {
          Text("Test Notification")
        }
      }
    }
}

#Preview {
    NotifTestView()
}
