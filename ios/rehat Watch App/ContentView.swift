//
//  ContentView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 11/09/23.
//

import SwiftUI

struct ContentView: View {
  @ObservedObject var rnConnector = RNConnector()
  
  var body: some View {
    TabView {
//      ConnectivityView(rnConnector: rnConnector)
      PanicView()
      RecoveryView()
        .navigationTitle("Recovery")
//      EmergencyCallView()
      EmergencyContactsView(rnConnector: rnConnector)
    }
  }
}


struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
