//
//  RNConnector.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 12/09/23.
//

import Foundation

import WatchConnectivity

final class RNConnector: NSObject, ObservableObject {
  var session: WCSession
  
  @Published var receivedMessage = "Waiting..."
  
  init(session: WCSession = .default) {
    self.session = session
    super.init()
    if WCSession.isSupported() {
      session.delegate = self
      session.activate()
    }
  }
}

extension RNConnector: WCSessionDelegate {
  
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
    guard let messageFromApp = message["messageFromApp"] as? String else { return }
    DispatchQueue.main.async {
      self.receivedMessage = messageFromApp
    }
  }
}


