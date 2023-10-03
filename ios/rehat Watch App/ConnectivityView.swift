//
//  ConnectivityView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 12/09/23.
//

import SwiftUI

struct ConnectivityView: View {
  @ObservedObject var rnConnector = RNConnector()
  var body: some View {
    VStack(spacing: 5) {
      Text("Send to Watch")
      Button {
        self.sendMessage()
        print("send w pressed")
      } label: {
        Text("Send")
      }
      Text("Message from App")
      Text(self.rnConnector.receivedMessage).padding()
    }
    .navigationTitle("Connectivity")

  }
  
  
  private func sendMessage() {
    let randomNumber = String(Int.random(in: 0..<100))
    let message: [String: Any] = ["watchMessage": randomNumber]
    self.rnConnector.session.sendMessage(message, replyHandler: nil) { (error) in
      print(error.localizedDescription)
    }
  }
}

struct ConnectivityView_Previews: PreviewProvider {
  static var previews: some View {
    ConnectivityView()
  }
}
