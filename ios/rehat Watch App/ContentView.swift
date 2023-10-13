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
      HKView()
      PanicView()
      RecoveryView(rnConnector: rnConnector)
      EmergencyContactsView(rnConnector: rnConnector)
    }.onAppear(perform: {
      requestAuthorizations()
    })
  }
}

func requestAuthorizations() {
  requestHealthKitAuthorization(healthStore: RehatHealthStore.store)
  requestNotifAuthorization()
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
