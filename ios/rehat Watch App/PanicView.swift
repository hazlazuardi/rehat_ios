//
//  PanicView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 28/9/2023.
//

import SwiftUI

struct PanicView: View {
  @EnvironmentObject var appState: AppState
  
  var body: some View {
    VStack {
      Button(action: {
        appState.setPanicTrue()
      }) {
        PulsatingCirclesView()
      }
      .buttonStyle(PlainButtonStyle())
    }
  }
}





#Preview {
    PanicView()
}
