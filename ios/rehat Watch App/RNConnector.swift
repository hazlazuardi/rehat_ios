//
//  RNConnector.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 12/09/23.
//

import Foundation
import WatchConnectivity

struct Contact: Identifiable, Decodable, Encodable {
  var id: UUID?
  var name: String
  var phoneNum: String
}

final class RNConnector: NSObject, ObservableObject, WCSessionDelegate {
  var session: WCSession
  
  @Published var contacts: [Contact] = []
  
  override init() {
    self.session = WCSession.default
    super.init()
    setupWatchConnectivity()
    loadStoredContacts()
  }
  
  private func setupWatchConnectivity() {
    if WCSession.isSupported() {
      session.delegate = self
      session.activate()
    }
  }
  
  private func loadStoredContacts() {
      self.contacts = StorageManager.shared.retrieveContacts()
  }
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    // Handle session activation completion if needed
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
    guard let contactsArray = message["emergencyContacts"] as? [[String: Any]] else {
      replyHandler(["status": "error", "message": "Failed to get emergencyContacts data."])
      return
    }
    
    // Convert the dictionaries to Contact objects
    let newContacts = contactsArray.compactMap { dict -> Contact? in
      guard let givenName = dict["givenName"] as? String,
            let familyName = dict["familyName"] as? String,
            let recordID = dict["recordID"] as? String,
            let phoneNumbers = dict["phoneNumbers"] as? [[String: Any]],
            let firstPhoneNumber = phoneNumbers.first?["number"] as? String
      else { return nil }
      
      let name = "\(givenName) \(familyName)"
      return Contact(id: UUID(uuidString: recordID) ?? UUID(), name: name, phoneNum: firstPhoneNumber)
    }
    
    DispatchQueue.main.async {
        self.contacts = newContacts
        StorageManager.shared.saveContacts(newContacts)
    }
    
    replyHandler(["status": "success", "message": "Data received successfully."])
  }
}
