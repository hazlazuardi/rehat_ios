//
//  TherapyView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 11/09/23.
//

import SwiftUI

struct TherapyView: View {
//  @State private var showToolbarTitle = false
  
  
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
  }
}

struct TherapyView_Previews: PreviewProvider {
    static var previews: some View {
        TherapyView()
    }
}
