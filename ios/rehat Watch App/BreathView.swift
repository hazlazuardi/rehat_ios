//
//  BreathView.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 18/9/2023.
//

import SwiftUI

struct BreathView: View {
  enum TimerState: Equatable {
    case selection
    case running(time: TimeInterval, breathIn: Bool)
  }
  
  @State private var timerState: TimerState = .selection
  @State private var remainingTime: TimeInterval = 0
  @State private var isBreathIn = true
  @State private var timer: Timer? = nil
  @State private var textTimer: Timer? = nil
  @State private var textUpdateInterval: TimeInterval = 5 // 5 second interval for the timer
  
  var body: some View {
      VStack {
        if timerState == .selection {
          Button(action: {
            startTimer(with: 30, breathIn: true)
          }) {
            Text("30-Second Breathing")
              .font(.headline)
              .frame(height:30)
          }
          
          Button(action: {
            startTimer(with: 60, breathIn: true)
          }) {
            Text("1-Minute Breathing")
              .font(.headline)
              .frame(height:30)
          }
        } else {
          Text(isBreathIn ? "Breath In" : "Breath Out")
          Text("\(Int(remainingTime))")
            .font(.title)
            .padding()
          
          Button(action: {
            stopTimer()
          }) {
            Text("Stop")
              .font(.headline)
              .padding()
          }
        }
      }
    .navigationTitle("Breathing")
    .onAppear {
      startTextTimer()
    }
    .onDisappear {
      textTimer?.invalidate()
    }
  }
  
  private func startTimer(with duration: TimeInterval, breathIn: Bool) {
    timer?.invalidate()
    timer = nil
    
    timerState = .running(time: duration, breathIn: breathIn)
    remainingTime = duration
    isBreathIn = breathIn
    
    startTextTimer()
    
    timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { timer in
      if remainingTime <= 0 {
        if isBreathIn {
          isBreathIn = false
        } else {
          isBreathIn = true
        }
        stopTimer()
      } else {
        remainingTime -= 1
      }
    }
  }
  
  private func stopTimer() {
    timer?.invalidate()
    timer = nil
    
    timerState = .selection
    remainingTime = 0
  }
  
  private func startTextTimer() {
    textTimer?.invalidate()
    textTimer = Timer.scheduledTimer(withTimeInterval: textUpdateInterval, repeats: true) { timer in
      // Toggle between "Breath In" and "Breath Out" every 5 seconds interval
      isBreathIn.toggle()
    }
  }
}

struct BreathView_Previews: PreviewProvider {
    static var previews: some View {
        BreathView()
    }
}

