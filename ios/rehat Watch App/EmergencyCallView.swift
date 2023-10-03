//import SwiftUI
//import WatchConnectivity
//
//
//class ReadDataContact: NSObject, ObservableObject {
//  @Published var contacts = [Contact]()
//  
//  //  override init() {
//  //    super.init()
//  //    setupWatchConnectivity()
//  //  }
//  //
//  //  func setupWatchConnectivity() {
//  //    if WCSession.default.isReachable {
//  //      WCSession.default.delegate = self
//  //      WCSession.default.activate()
//  //    }
//  //  }
//  //}
//  
//  //extension ReadDataContact: WCSessionDelegate {
//  //  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
//  //    // Handle session activation completion if needed
//  //  }
//  //
//  //  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
//  //    if let receivedContacts = message["emergencyContacts"] as? [[String: Any]] {
//  //      self.contacts = receivedContacts.compactMap { dict in
//  //        guard let givenName = dict["givenName"] as? String,
//  //              let familyName = dict["familyName"] as? String,
//  //              let recordID = dict["recordID"] as? String,
//  //              let phoneNumbers = dict["phoneNumbers"] as? [[String: Any]],
//  //              let firstPhoneNumber = phoneNumbers.first?["number"] as? String
//  //        else { return nil }
//  //
//  //        let name = "\(givenName) \(familyName)"
//  //        return Contact(id: UUID(uuidString: recordID) ?? UUID(), name: name, phoneNum: firstPhoneNumber)
//  //      }
//  //      replyHandler(["success": true])
//  //    }
//  //  }
//  //}
//}
//
//struct EmergencyCallView: View {
//  @ObservedObject var contactDatas = ReadDataContact()
//  @State private var isReachable: Bool = WCSession.default.isReachable
//  
//  
//  func makePhoneCall(phoneNumber: String) {
//    if let phoneURL = URL(string: "tel:\(phoneNumber)"), WCSession.default.isReachable {
//      WKExtension.shared().openSystemURL(phoneURL)
//    }
//  }
//  
//  var body: some View {
//    NavigationStack {
//      ScrollView {
//        VStack {
//          if !isReachable {
//            Text("Watch is not reachable. Please ensure your watch is connected and try again.")
//              .padding()
//            
//            Button(action: {
//              self.isReachable = WCSession.default.isReachable
//              if self.isReachable {
//                // Attempt to fetch data or perform any other necessary actions
//                print("Reachable")
//              }
//            }) {
//              Text("Refresh")
//            }
//            .padding()
//          } else {
//            ForEach(contactDatas.contacts, id: \.id) { contact in
//              Button(action: {
//                // Button to call someone
//                makePhoneCall(phoneNumber: contact.phoneNum)
//              }) {
//                VStack {
//                  Text(contact.name)
//                    .font(.title3)
//                    .fontWeight(.bold)
//                    .padding(.bottom, 4)
//                  
//                  Text(contact.phoneNum)
//                    .font(.subheadline)
//                }
//              }
//            }
//          }
//        }
//      }
//      .navigationTitle("Emergency Contacts")
//    }
//  }
//  
//}
//
//struct EmergencyCallView_Previews: PreviewProvider {
//  static var previews: some View {
//    EmergencyCallView()
//  }
//}
