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
        EmergencyContactView()
        TherapyView()
      }
    }
  }
}

struct EmergencyContactView: View {
  var body: some View {
    VStack {
      Button("Call Emergency Contact") {}
    }
  }
}

struct TherapyView: View {
  @State private var showToolbarTitle = false
  
  
  var body: some View {
    VStack {
      List {
        ForEach(0..<10, id: \.self) { index in
          NavigationLink(destination: Text("Technique View \(index)")) {
            Text("Technique \(index)")
          }
        }
      }
    }
    .navigationTitle("Therapy")
    .toolbar {
      ToolbarItem(placement: .primaryAction) {
        Button("Add") {
        }
      }
    }
  }
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
