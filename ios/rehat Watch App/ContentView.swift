//
//  ContentView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 11/09/23.
//

import SwiftUI

struct ContentView: View {
  
  var body: some View {
    NavigationStack {
      TabView {
<<<<<<< HEAD
        HKView()
=======
        RecoveryView()
>>>>>>> f2c96de (Feat: Added RecoverView: Emergency Call, and more)
        ConnectivityView()
//        EmergencyContactView()
//        TherapyView()
      }
//      .navigationTitle("Avanox")
    }
  }
}


struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
