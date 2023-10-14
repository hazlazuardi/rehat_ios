//
//  PanicView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 28/9/2023.
//

import SwiftUI

struct PanicView: View {
  var body: some View {
    NavigationView {
      VStack {
        NavigationLink(destination: BreathView()) {
          Text("PANIC")
            .font(.largeTitle)
            .foregroundColor(.white)
            .padding()
            .background(Circle().fill(Color.red))
        }
      }
    }
  }
}





#Preview {
    PanicView()
}
