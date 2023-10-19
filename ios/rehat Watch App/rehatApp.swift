//
//  rehatApp.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi on 11/09/23.
//

import SwiftUI
import UserNotifications

@main
struct rehat_Watch_App: App {
  // Variables to be shared app-wide
  @StateObject var workoutManager = WorkoutManager() // enables all views to access workout manager
  @StateObject var appState: AppState = AppState()
  @StateObject var notifCenterDelegate = AppNotificationCenterDelegate()
  
  var body: some Scene {
    WindowGroup {
      ContentView()
    } .environmentObject(workoutManager) .environmentObject(appState)
  }
}

// DEPRECATED
// handles user's responses to notification
class AppNotificationCenterDelegate: NSObject, ObservableObject, UNUserNotificationCenterDelegate {
  override init() {
    super.init()
    UNUserNotificationCenter.current().delegate = self
  }
  
  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
  ) {
    
    if response.notification.request.content.categoryIdentifier == "NOTIF_ACTIONS" {
      switch response.actionIdentifier {
        case "SEEK_HELP":
          // user seeks recovery
          // scrapped. can't set app state from here.
          // will open the app when user presses the action button
          break
        default:
          break
      }
    }
    
    completionHandler()
  }
}

// app-wide indicator for panic state
class AppState: ObservableObject {
  static let shared = AppState()
  @Published var isPanic = false
  
  func setPanicTrue() {
    self.isPanic = true
  }
  
  func setPanicFalse() {
    self.isPanic = false
  }
}
