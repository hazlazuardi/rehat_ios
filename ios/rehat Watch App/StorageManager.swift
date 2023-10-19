//
//  StorageManager.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 3/10/2023.
//

import Foundation

class StorageManager {
    static let shared = StorageManager()
    
    private let contactsKey = "storedContacts"
    private let recoveryPreferencesKey = "storedRecoveryPreferences" // New key for recoveryPreferences
    private let methodScoringDataKey = "methodsUsed"

    // MARK: - Contacts
    func saveContacts(_ contacts: [Contact]) {
        if let encoded = try? JSONEncoder().encode(contacts) {
            UserDefaults.standard.set(encoded, forKey: contactsKey)
        }
    }

    func retrieveContacts() -> [Contact] {
        if let savedContacts = UserDefaults.standard.object(forKey: contactsKey) as? Data {
            if let loadedContacts = try? JSONDecoder().decode([Contact].self, from: savedContacts) {
                return loadedContacts
            }
        }
        return []
    }

    // MARK: - Recovery References
    func saveRecoveryPreferences(_ references: [RecoveryReference]) {
        if let encoded = try? JSONEncoder().encode(references) {
            UserDefaults.standard.set(encoded, forKey: recoveryPreferencesKey)
        }
    }

    func retrieveRecoveryPreferences() -> [RecoveryReference] {
        if let savedReferences = UserDefaults.standard.object(forKey: recoveryPreferencesKey) as? Data {
            if let loadedReferences = try? JSONDecoder().decode([RecoveryReference].self, from: savedReferences) {
                return loadedReferences
            }
        }
        return []
    }
  
    // MARK: Recovery Method Scoring Data
    func saveMethodScoringData(_ methodScoringData: [MethodScoringData]) {
        if let encoded = try? JSONEncoder().encode(methodScoringData) {
            UserDefaults.standard.set(encoded, forKey: methodScoringDataKey)
        }
    }

    func retrieveMethodScoringData() -> [MethodScoringData] {
        if let savedMethodScoringData = UserDefaults.standard.object(forKey: methodScoringDataKey) as? Data {
            if let loadedMethodScoringData = try? JSONDecoder().decode([MethodScoringData].self, from: savedMethodScoringData) {
                return loadedMethodScoringData
            }
        }
        return []
    }
    
}
