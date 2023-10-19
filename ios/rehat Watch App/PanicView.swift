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
//      Button {
//        appState.setPanicTrue()
//      } label: {
//        Text("I Need Some Help")
//      }
      Button(action: {
          // Handle button tap
        print("Circle button tapped!")
        appState.setPanicTrue()
      }) {
//        GeometryReader { geometry in
//          ZStack {
//            Circle()
//              .fill(Color.orange.opacity(0.2))
//              .frame(width: geometry.size.width * 0.5, height: geometry.size.width * 0.5)
//              .scaleEffect(currentScaleFactor+0.2)
//              .animation(
//                Animation.easeInOut(duration: currentAnimationDuration)
//                  .delay(1)
//              )
//            Circle()
//              .fill(Color.orange.opacity(0.5))
//              .frame(width: geometry.size.width * 0.5, height: geometry.size.width * 0.5)
//              .scaleEffect(currentScaleFactor+0.1)
//              .animation(
//                Animation.easeInOut(duration: currentAnimationDuration)
//                  .delay(0.5)
//              )
//            Circle()
//              .fill(Color.orange.opacity(0.75))
//              .frame(width: geometry.size.width * 0.5, height: geometry.size.width * 0.5)
//              .scaleEffect(currentScaleFactor)
//              .animation(.easeInOut(duration: currentAnimationDuration))
//            
//            Text("Help")
//              .foregroundColor(.white)
//            //                  .scaleEffect(currentScaleFactor)
//            //                  .animation(.easeInOut(duration: 1), value: breathingStatus)
//          }
//        }
        PulsatingCirclesView()
      }
      .buttonStyle(PlainButtonStyle())
    }
  }
}





#Preview {
    PanicView()
}
