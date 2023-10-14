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
        case running(phase: BreathPhase)
    }
    
    struct BreathPhase: Equatable {
        let breathInDuration: TimeInterval
        let holdDuration: TimeInterval
        let breathOutDuration: TimeInterval
        let holdTwoDuration: TimeInterval
    }
    
    @State private var timerState: TimerState = .selection
    @State private var remainingTime: TimeInterval = 0
    @State private var timer: Timer? = nil
    @State private var textTimer: Timer? = nil
    @State private var breathingStatus = ""
    
    var breathingOptions: [BreathPhase] = [
        BreathPhase(breathInDuration: 4, holdDuration: 0, breathOutDuration: 6, holdTwoDuration: 0),
        BreathPhase(breathInDuration: 4, holdDuration: 2, breathOutDuration: 4, holdTwoDuration: 0),
        BreathPhase(breathInDuration: 5, holdDuration: 0, breathOutDuration: 5, holdTwoDuration: 0),
        BreathPhase(breathInDuration: 4, holdDuration: 4, breathOutDuration: 4, holdTwoDuration: 4),
        BreathPhase(breathInDuration: 4, holdDuration: 0, breathOutDuration: 2, holdTwoDuration: 0),
        BreathPhase(breathInDuration: 4, holdDuration: 7, breathOutDuration: 8, holdTwoDuration: 0),
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
              Text([
                formatDuration(breathingOptions[index].breathInDuration),
                formatDuration(breathingOptions[index].holdDuration),
                formatDuration(breathingOptions[index].breathOutDuration),
                formatDuration(breathingOptions[index].holdTwoDuration)
              ]
                .filter { !$0.isEmpty }
                .joined(separator: "-")
              )
              .font(.headline)
              .frame(height:30)
            }
          }
          .navigationTitle("Breathing")
        } else {
          GeometryReader { geometry in
            ZStack {
              Circle()
                .fill(Color.blue)
                .frame(width: geometry.size.width * 0.5, height: geometry.size.width * 0.5)
                .scaleEffect(scaleFactor(breathingStatus: breathingStatus))
                .animation(.easeInOut(duration: 1), value: breathingStatus)
              
              Text("\(breathingStatus)")
//                .font(.title)
                .foregroundColor(.white)
            }
            .position(x: geometry.size.width / 2, y: geometry.size.height / 1)
          }
          .frame(height: 50)
          
          Text("\(Int(remainingTime + 1))")
//            .font(.title)
            .padding()
          
//          Spacer()
          
            .toolbar {
              ToolbarItem(placement: .bottomBar) {
                HStack {
                  Button(action: {
                    // Pause action here
                  }) {
                    Image(systemName: "pause.fill")
//                      .font(.system(size: 20))
                      .padding(10)
//                      .background(Color.blue)
                      .foregroundColor(.white)
                      .clipShape(Circle())
                  }
                  
                  Spacer()
                  
                  Button(action: {
                    stopTimer()
                  }) {
                    Image(systemName: "stop.fill")
//                      .font(.system(size: 20))
                      .padding(10)
//                      .background(Color.red)
                      .foregroundColor(.white)
                      .clipShape(Circle())
                  }
                }
              }
            }
//          Button(action: {
//            stopTimer()
//          }) {
//            Text("Stop")
//              .font(.headline)
//              .padding()
//          }
        }
      }
    }
//    .navigationTitle("Breathing")
    .onAppear {
      startTextTimer()
    }
    .onDisappear {
      textTimer?.invalidate()
    }
  }
  
  private func scaleFactor(breathingStatus: String) -> CGFloat {
      switch breathingStatus {
      case "Breath In":
          return 1.4
      case "Breath Out":
          return 1
      default:
          return 1.2
      }
  }
    
  private func startTimer(with phase: BreathPhase) {
    timer?.invalidate()
    timer = nil
    
    timerState = .running(phase: phase)
    remainingTime = 59
    
    startTextTimer()
    
    updateBreathingStatus()
    
    
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
    }
    
    private func startTextTimer() {
        textTimer?.invalidate()
        textTimer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { timer in
//            updateBreathingStatus()
        }
    }
    
  private func updateBreathingStatus() {
    guard case let .running(phase) = timerState else {
      return
    }
    
    let totalTime = phase.breathInDuration + phase.holdDuration + phase.breathOutDuration + phase.holdTwoDuration
    
//    print("\(totalTime) total time")
//    print("\(totalTimeInMinutes) total time in minutes")
//    print("\(60/totalTime)")
    
    var remainingBackTime = remainingTime
    
    if totalTime == 16.0 {
      remainingBackTime = remainingTime + 4
    }
    
    if totalTime == 19.0 {
      remainingBackTime = remainingTime + 16
    }
      
    let remainingTimeInCycle = totalTime - remainingBackTime.truncatingRemainder(dividingBy: totalTime)
    
//    print("\(remainingTimeInCycle) Remaining time in cycle")
//    print("\(remainingBackTime)")
//    print("\(remainingTime.truncatingRemainder(dividingBy: totalTime)) Remaining time bla bla")
    
    
    if remainingTimeInCycle <= phase.breathInDuration {
      breathingStatus = "Breath In"
    } else if remainingTimeInCycle <= (phase.breathInDuration + phase.holdDuration) {
      breathingStatus = "Hold"
    } else if remainingTimeInCycle <= (phase.breathInDuration + phase.holdDuration + phase.breathOutDuration) {
      breathingStatus = "Breath Out"
    } else if remainingTimeInCycle <= (phase.breathInDuration + phase.holdDuration + phase.breathOutDuration + phase.holdTwoDuration) {
      breathingStatus = "Hold"
    }
  }
}

struct BreathView_Previews: PreviewProvider {
    static var previews: some View {
        BreathView()
    }
}
