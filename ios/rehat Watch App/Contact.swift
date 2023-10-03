//
//  Contact.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 3/10/2023.
//

import Foundation

//struct Contact: Identifiable {
//    var id: UUID? // This will be generated from recordID
//    let recordID: String
//    let givenName: String
//    let familyName: String
//    let phoneNumbers: [PhoneNumber]
//    let thumbnailPath: String?
//
//    struct PhoneNumber: Decodable {
//        let label: String
//        let number: String
//    }
//}

//struct Contact: Identifiable, Encodable, Decodable {
//    var id: UUID?
//    var name: String
//    var phoneNum: String
//}

func storeContacts(_ contacts: [Contact]) {
    let encoder = JSONEncoder()
    if let encoded = try? encoder.encode(contacts) {
        UserDefaults.standard.set(encoded, forKey: "emergencyContacts")
    }
}

func fetchStoredContacts() -> [Contact]? {
    if let savedContacts = UserDefaults.standard.object(forKey: "emergencyContacts") as? Data {
        let decoder = JSONDecoder()
        if let loadedContacts = try? decoder.decode([Contact].self, from: savedContacts) {
            return loadedContacts
        }
    }
    return nil
}

