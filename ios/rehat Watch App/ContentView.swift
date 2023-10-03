//
//  ContentView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 11/09/23.
//

import SwiftUI

struct ContentView: View {
  
  var body: some View {
    TabView {
      PanicView()
      RecoveryView()
        .navigationTitle("Recovery")
      EmergencyCallView()
    }
  }
}


struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
