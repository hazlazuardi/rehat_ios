//
//  ContentView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 11/09/23.
//

import SwiftUI

struct ContentView: View {
  @StateObject var rnConnector = RNConnector()
  var body: some View {
    TabView {
      NotifTestView()
      PanicView()
      RecoveryView()
      EmergencyContactsView(rnConnector: rnConnector)
    }
  }
//  var body: some View {
//          TabView(selection: $selectedTab) {
//              Button(action: {
//                  selectedTab = 1  // Navigate to Recovery View tab
//                  // Additional logic to present BreatheView as the primary view of Recovery View
//              }) {
//                  Text("Panic Button")
//              }
//              .tag(0)
//              .tabItem {
//                  Text("Panic")
//              }
//
//              RecoveryView()
//                  .tag(1)
//                  .tabItem {
//                      Text("Recovery")
//                  }
//
//              EmergencyCallView()
//                  .tag(2)
//                  .tabItem {
//                      Text("Emergency Call")
//                  }
//          }
//      }
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
