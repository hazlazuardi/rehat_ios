//
//  rehatApp.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 11/09/23.
//

import SwiftUI

@main
struct rehat_Watch_App: App {
  @StateObject var workoutManager = WorkoutManager() // enables all views to access workout manager
  
  var body: some Scene {
    WindowGroup {
      ContentView()
    } .environmentObject(workoutManager)
  }
}
