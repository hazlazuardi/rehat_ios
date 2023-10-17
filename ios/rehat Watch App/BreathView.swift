//
//  BreathView.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 18/9/2023.
//

import SwiftUI
import WatchKit

struct BreathView: View {
  @EnvironmentObject var appState: AppState
  enum TimerState: Equatable {
    case selection
    case running(phase: BreathPhase)
  }
    
  struct BreathPhase: Equatable {
    let name: String
    let breathInDuration: TimeInterval
    let holdDuration: TimeInterval
    let breathOutDuration: TimeInterval
    let holdTwoDuration: TimeInterval
  }
    
  @State public var autoStart: Bool = false // by default, don't automatically start breathing exercise
  @State public var firstPreferenceIndex: Int = 0 // placeholder
  @State private var timerState: TimerState = .selection
  @State private var remainingTime: TimeInterval = 0
  @State private var timer: Timer? = nil
  @State private var textTimer: Timer? = nil
  @State private var breathingStatus = ""
  @State private var currentScaleFactor: CGFloat = 1.0
  @State private var currentAnimationDuration: Double = 1.0

  var breathingOptions: [BreathPhase] = [
    BreathPhase(name: "Extended Exhale", breathInDuration: 4, holdDuration: 0, breathOutDuration: 6, holdTwoDuration: 0),
    BreathPhase(name: "Equal Breathing", breathInDuration: 4, holdDuration: 2, breathOutDuration: 4, holdTwoDuration: 0),
    BreathPhase(name: "Deep Belly", breathInDuration: 5, holdDuration: 0, breathOutDuration: 5, holdTwoDuration: 0),
    BreathPhase(name: "Box Breathing", breathInDuration: 4, holdDuration: 4, breathOutDuration: 4, holdTwoDuration: 4),
    BreathPhase(name: "Energizing Breath", breathInDuration: 4, holdDuration: 0, breathOutDuration: 2, holdTwoDuration: 0),
    BreathPhase(name: "Relaxing Breath", breathInDuration: 4, holdDuration: 7, breathOutDuration: 8, holdTwoDuration: 0),
  ]
  
  private func formatDuration(_ duration: TimeInterval) -> String {
    let intDuration = Int(duration)
    return intDuration > 0 ? "\(intDuration)" : ""
  }
    
  var body: some View {
    ScrollView {
      VStack {
        if timerState == .selection {
          ForEach(breathingOptions.indices, id: \.self) { index in
            Button(action: {
              startTimer(with: breathingOptions[index])
            }) {
              VStack{
                Text(breathingOptions[index].name)
                  .font(.headline)
                Text(
                  "(" +
                  [
                    formatDuration(breathingOptions[index].breathInDuration),
                    formatDuration(breathingOptions[index].holdDuration),
                    formatDuration(breathingOptions[index].breathOutDuration),
                    formatDuration(breathingOptions[index].holdTwoDuration)
                  ]
                    .filter { !$0.isEmpty }
                    .joined(separator: "-") 
                  + ")"
                )
                .foregroundColor(Color.white.opacity(0.5))
              }
            }
          }
          .navigationTitle("Breathing")
        } else {
          GeometryReader { geometry in
            ZStack {
              Circle()
                .fill(Color.orange)
                .frame(width: geometry.size.width * 0.5, height: geometry.size.width * 0.5)
                .scaleEffect(currentScaleFactor)
                .animation(.easeInOut(duration: currentAnimationDuration), value: breathingStatus)
              
              Text("\(breathingStatus)")
                .foregroundColor(.white)
            }
            .position(x: geometry.size.width / 2, y: geometry.size.height / 0.8)
          }
          .frame(height: 50)
          .toolbar {
            ToolbarItemGroup(placement: .bottomBar) {
              Spacer()
              Button(action: {
                stopTimer()
              }) {
                Image(systemName: "stop.fill")
              }
              .buttonStyle(BorderedButtonStyle(tint: Color.red.opacity(0.5)))
              .clipShape(Circle())
            }
          }
        }
      }
    }
    .containerBackground(.blue.gradient, for: .navigation)
    .onAppear {
      startTextTimer()
      if self.autoStart {
        let breathePhase = breathingOptions[self.firstPreferenceIndex]
        startTimer(with: breathePhase)
      }
    }
    .onDisappear {
      textTimer?.invalidate()
    }
  }
  
  private func startTimer(with phase: BreathPhase) {
    timer?.invalidate()
    timer = nil
    
    timerState = .running(phase: phase)
    remainingTime = 59
    
    startTextTimer()
    
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
      self.updateBreathingStatus()
    }
    
    timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { timer in
      if remainingTime <= 0 {
        stopTimer()
      } else {
        remainingTime -= 1
        updateBreathingStatus()
      }
    }
  }
    
  private func stopTimer() {
    timer?.invalidate()
    timer = nil
    
    timerState = .selection
    remainingTime = 0
    breathingStatus = ""
    currentScaleFactor = 0.8
  }
    
  private func startTextTimer() {
    textTimer?.invalidate()
    textTimer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { timer in
    }
  }
    
  private func updateBreathingStatus() {
    guard case let .running(phase) = timerState else {
      return
    }
    
    let totalTime = phase.breathInDuration + phase.holdDuration + phase.breathOutDuration + phase.holdTwoDuration
    
    var remainingBackTime = remainingTime
    
    if totalTime == 16.0 {
      remainingBackTime = remainingTime + 4
    }
    
    if totalTime == 19.0 {
      remainingBackTime = remainingTime + 16
    }
      
    let remainingTimeInCycle = totalTime - remainingBackTime.truncatingRemainder(dividingBy: totalTime)

    if remainingTimeInCycle <= phase.breathInDuration {
      breathingStatus = "Breath In"
      currentAnimationDuration = phase.breathInDuration
    } else if remainingTimeInCycle <= (phase.breathInDuration + phase.holdDuration) {
      breathingStatus = "Hold"
      currentAnimationDuration = phase.holdDuration
    } else if remainingTimeInCycle <= (phase.breathInDuration + phase.holdDuration + phase.breathOutDuration) {
      breathingStatus = "Breath Out"
      currentAnimationDuration = phase.breathOutDuration
    } else if remainingTimeInCycle <= (phase.breathInDuration + phase.holdDuration + phase.breathOutDuration + phase.holdTwoDuration) {
      breathingStatus = "Hold"
      currentAnimationDuration = phase.holdTwoDuration
    }
    
    let previousStatus = breathingStatus
    
    switch breathingStatus {
    case "Breath In":
      currentScaleFactor = 1.4
    case "Breath Out":
      currentScaleFactor = 1
    case "":
      currentScaleFactor = 0.8
    default:
      break
    }
    
    if previousStatus != breathingStatus {
      playHapticFeedback()
    }
  }
  
  private func playHapticFeedback() {
      WKInterfaceDevice.current().play(.click)
  }
}

struct BreathView_Previews: PreviewProvider {
    static var previews: some View {
        BreathView()
    }
}
