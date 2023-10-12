//
//  NotifTestView.swift
//  rehat Watch App
//
//  Created by Avanox on 10/10/23.
//

import SwiftUI

struct NotifTestView: View {
    var body: some View {
      VStack {
        Button {
          notifyOnPredict()
        } label: {
          Text("Test Notification")
        }
      }
    }
}

#Preview {
    NotifTestView()
}
