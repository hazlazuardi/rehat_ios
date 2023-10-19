//
//  NotifUtils.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 10/10/23.
//

import Foundation
import UserNotifications

/// Requests permission from the user to send notifications
func requestNotifAuthorization() {
  let center = UNUserNotificationCenter.current()
  center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
      
      if let error = error {
        // Handle the error here.
        print("Error requesting notification permissions: \(error.localizedDescription)")
      }
  }
}

/// Sends notification to the user to check up on them
func sendNotification() {
    // set notification contents
    let notifContent = UNMutableNotificationContent()
    notifContent.title = "Hey there"
    notifContent.body = "How are you feeling?"
    notifContent.sound = .default
    notifContent.categoryIdentifier = "NOTIF_ACTIONS"
  
    // show button for the user to press to open the app
    let action = UNNotificationAction(
      identifier: "SEEK_HELP",
      title: "I need guidance",
      options: [.foreground]) // brings app to the foreground
    let category = UNNotificationCategory(
      identifier: "NOTIF_ACTIONS",
      actions: [action],
      intentIdentifiers: [],
      options: [])
    
    // set the notification to fire after a certain amount of time has passed
    // prevents conflict with the workout session
    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 3, repeats: false)
    
    // Create the request
    let uuidString = UUID().uuidString
    let request = UNNotificationRequest(identifier: uuidString,
                content: notifContent, trigger: trigger)

    // Schedule the request with the system.
    let notificationCenter = UNUserNotificationCenter.current()
    notificationCenter.setNotificationCategories([category])
    notificationCenter.add(request) { (error) in
       if error != nil {
          // Handle any errors.
       } else {
         print("Successfully requested notification to notifCenter!")
       }
    }
}
