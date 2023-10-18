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

struct RecoveryReference: Identifiable, Decodable, Encodable {
  var id: String
  var label: String
}

struct MethodScoringData: Identifiable, Decodable, Encodable {
  var id: String
  var panicDurations: [Int]
}

class RNConnector: NSObject, ObservableObject, WCSessionDelegate {
  var session: WCSession
  
  @Published var contacts: [Contact] = []
  
  // TODO: check id for preference
  @Published var recoveryReferences: [RecoveryReference] = [
      RecoveryReference(id: "1", label: "Guided Breathing"),
      RecoveryReference(id: "2", label: "Self-Affirmation"),
      RecoveryReference(id: "3", label: "Grounding Technique"),
      RecoveryReference(id: "4", label: "Emergency Call")
  ]
  
  override init() {
    self.session = WCSession.default
    super.init()
    setupWatchConnectivity()
    loadStoredContacts()
    loadStoredRecoveryReferences()
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
  
  private func loadStoredRecoveryReferences() {
      let temp = StorageManager.shared.retrieveRecoveryReferences()
      if !temp.isEmpty {
          self.recoveryReferences = temp
      }
  }
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    // Handle session activation completion if needed
  }
  
  func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String : Any]) {
    // Handle emergencyContacts
    if let contactsArray = applicationContext["emergencyContacts"] as? [[String: Any]] {
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
        print("Successfully updated contacts from ApplicationContext.")
        print(newContacts)
      }
    }
    
    // Handle recoveryReferences
    if let referencesArray = applicationContext["recoveryReferences"] as? [[String: Any]] {
      let newReferences = referencesArray.compactMap { dict -> RecoveryReference? in
        guard let key = dict["key"] as? String,
              let label = dict["label"] as? String
        else { return nil }
        
        return RecoveryReference(id: key, label: label)
      }
      
      DispatchQueue.main.async {
        self.recoveryReferences = newReferences
        StorageManager.shared.saveRecoveryReferences(newReferences)
        print("Successfully updated recovery references from ApplicationContext.")
      }
    }
  }
}
