//
//  File.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 20/9/2023.
//

import SwiftUI
import HealthKit

struct HealthKitAuthorizationView: View {
  
  @State private var heartRateData: String = ""

  
  var body: some View {
          VStack {
              Text("Heart Rate Data:")
              Text(heartRateData)
                  .padding()
              
              Button("Authorize HealthKit") {
                  requestHealthKitAuthorization()
              }
          }
          .onAppear {
              requestHealthKitAuthorization()
          }
      }
    
    private func requestHealthKitAuthorization() {
        let healthStore = HKHealthStore()

        // Define the types of data you want to access (in this case, heart rate data).
        let typesToRead: Set<HKSampleType> = [HKObjectType.quantityType(forIdentifier: .heartRate)!]

        // Request authorization from the user.
        healthStore.requestAuthorization(toShare: nil, read: typesToRead) { (success, error) in
            if success {
                // You can now access heart rate data.
                queryHeartRateData()
            } else {
                // Handle the error.
                if let error = error {
                    print("Authorization failed: \(error.localizedDescription)")
                }
            }
        }
    }

    private func queryHeartRateData() {
        let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate)!
        let query = HKSampleQuery(sampleType: heartRateType, predicate: nil, limit: 10, sortDescriptors: nil) { (query, results, error) in
          if let heartRateSamples = results as? [HKQuantitySample] {
                      var heartRateText = ""
                      for sample in heartRateSamples {
                          let heartRate = sample.quantity.doubleValue(for: HKUnit.count().unitDivided(by: HKUnit.minute()))
                          heartRateText += "Heart Rate: \(heartRate) bpm\n"
                      }
                      heartRateData = heartRateText
                  } else {
                      if let error = error {
                          print("Error retrieving heart rate data: \(error.localizedDescription)")
                      }
                  }
        }

        let healthStore = HKHealthStore()
        healthStore.execute(query)
    }
}

