//
//  NotifUtils.swift
//  rehat Watch App
//
//  Created by Avanox on 10/10/23.
//

import Foundation
import UserNotifications

func requestNotifAuthorization() {
  let center = UNUserNotificationCenter.current()
  center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
      
      if let error = error {
        // Handle the error here.
        print("Error requesting notification permissions: \(error.localizedDescription)")
      }
      
      // Enable or disable features based on the authorization.
      // FIXME: Handle different levels of notif authorization. Assume user agress to all for now.
  }
}

func sendNotification() {
    let notifContent = UNMutableNotificationContent()
    notifContent.title = "Hey there"
    notifContent.body = "How are you feeling?"
    notifContent.sound = .default
    notifContent.categoryIdentifier = "actions"
  
  
    let action = UNNotificationAction(
      identifier: "seek_help",
      title: "I need guidance",
      options: [.foreground])
    let category = UNNotificationCategory(
      identifier: "actions",
      actions: [action],
      intentIdentifiers: [],
      options: [])
    
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

func notifyOnPredict() {
  // FIXME: actually read HRs please
  let positiveLabels: [Int64] = [1, 2]
  let classifierOutput = predict(hr: 88.8, sdnn: 55.5)
  if positiveLabels.contains(classifierOutput.label) {
    let notifContent = UNMutableNotificationContent()
    notifContent.title = "Notif Title"
    notifContent.body = "Lorem ipsum dolor sit amet"
    notifContent.sound = .default
    
    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
    
    // Create the request
    let uuidString = UUID().uuidString
    let request = UNNotificationRequest(identifier: uuidString,
                content: notifContent, trigger: trigger)

    // Schedule the request with the system.
    let notificationCenter = UNUserNotificationCenter.current()
    notificationCenter.add(request) { (error) in
       if error != nil {
          // Handle any errors.
       } else {
         print("Successfully requested notification to notifCenter!")
       }
    }
  }
}
