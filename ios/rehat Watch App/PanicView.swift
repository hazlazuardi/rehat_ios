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
      // TODO: calm design???
      Button {
        appState.setPanicTrue()
      } label: {
        Text("I Need Some Help")
      }
    }
  }
}





#Preview {
    PanicView()
}
