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
}
