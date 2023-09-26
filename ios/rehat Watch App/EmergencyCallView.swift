//
//  EmergencyCallView.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 17/9/2023.
//

import SwiftUI
import WatchConnectivity

struct Contact: Identifiable, Decodable {
  var id: UUID?
  var name: String
  var phoneNum: String
}

class ReadDataContact: ObservableObject {
    @Published var contacts = [Contact]()

    init(){
        loadData()
    }

  func loadData() {
    guard let url = Bundle.main.url(forResource: "emergencyContactData", withExtension: "json") else {
      print("JSON file not found")
      return
    }
    
    do {
      let data = try Data(contentsOf: url)
      var decodedContact = try JSONDecoder().decode([Contact].self, from: data)
      
      for index in decodedContact.indices {
        if decodedContact[index].id == nil {
          decodedContact[index].id = UUID()
        }
      }
      
      self.contacts = decodedContact
      print("JSON data successfully loaded.")
    } catch let error {
      print("Error loading JSON data: \(error)")
    }
  }
}

struct EmergencyCallView: View {
  @ObservedObject var contactDatas = ReadDataContact()
  
  func makePhoneCall(phoneNumber: String) {
          if let phoneURL = URL(string: "tel:\(phoneNumber)"), WCSession.default.isReachable {
              WKExtension.shared().openSystemURL(phoneURL)
          }
      }
  
  var body: some View {
    NavigationStack {
      ScrollView {
        VStack {
          ForEach(contactDatas.contacts, id: \.id) { contact in
            Button(action: {
              // Button to call someone
              makePhoneCall(phoneNumber: contact.phoneNum)

            }) {
              VStack {
                Text(contact.name)
                  .font(.title3)
                  .fontWeight(.bold)
                  .padding(.bottom, 4)
                
                Text(contact.phoneNum)
                  .font(.subheadline)
              }
            }
          }
        }
      }
      .navigationTitle("Emergency Contacts")
    }
  }
}

struct EmergencyCallView_Previews: PreviewProvider {
  static var previews: some View {
    EmergencyCallView()
  }
}
