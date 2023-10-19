//
//  PulsatingCirclesView.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 19/10/2023.
//

import SwiftUI
import Combine

struct PulsatingCirclesView: View {
    @State private var currentScaleFactor1: CGFloat = 1.0
    @State private var currentScaleFactor2: CGFloat = 1.0
    @State private var currentScaleFactor3: CGFloat = 1.0

    let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                Circle()
                    .fill(Color.orange.opacity(0.2))
                    .frame(width: geometry.size.width * 0.5, height: geometry.size.width * 0.5)
                    .scaleEffect(currentScaleFactor1)
                
                Circle()
                    .fill(Color.orange.opacity(0.5))
                    .frame(width: geometry.size.width * 0.5, height: geometry.size.width * 0.5)
                    .scaleEffect(currentScaleFactor2)
                
                Circle()
                    .fill(Color.orange.opacity(0.75))
                    .frame(width: geometry.size.width * 0.5, height: geometry.size.width * 0.5)
                    .scaleEffect(currentScaleFactor3)

                Text("Help")
                    .foregroundColor(.white)
            }
            .onReceive(timer) { _ in
              withAnimation(.easeInOut(duration: CGFloat.random(in: 0.1...2))) {
                    // Randomly change the scale factor between 0.8 and 1.2 (for example)
                    currentScaleFactor1 = CGFloat.random(in: 0.8...1.2)
                    currentScaleFactor2 = CGFloat.random(in: 0.8...1.2)
                    currentScaleFactor3 = CGFloat.random(in: 0.8...1.2)
                }
            }
            .position(x: geometry.size.width / 2, y: geometry.size.height / 2.2)
        }
    }
}

