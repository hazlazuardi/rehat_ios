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
  @StateObject var workoutManager = WorkoutManager() // enables all views to access workout manager
  @StateObject var appState: AppState = AppState()
  @StateObject var notifCenterDelegate = AppNotificationCenterDelegate()
  
  var body: some Scene {
    WindowGroup {
      ContentView()
    } .environmentObject(workoutManager) .environmentObject(appState)
  }
}

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
          break
        default:
          break
      }
    }
    
    completionHandler()
  }
}

// indicator for panic state
class AppState: ObservableObject {
  static let shared = AppState()
  @Published var isPanic = false
  @Published var methodsUsed: [String] = []
  
  func setPanicTrue() {
    self.isPanic = true
  }
  
  func setPanicFalse() {
    self.isPanic = false
  }
}
