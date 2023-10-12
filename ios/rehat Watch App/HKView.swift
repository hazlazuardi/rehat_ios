//
//  HKView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 23/9/2023.
//

import SwiftUI
import HealthKit

struct HKView: View {
//  private var healthStore = HKHealthStore()
  let heartRateQuantity = HKUnit(from: "count/min")
  
  @State private var value = 0
  @State private var timestamp = ""
  
  
  
  var body: some View {
    VStack{
      HStack{
        Text("Deg-degan gasi")
          .font(.system(size: 12))
        Spacer()
        
      }
      
      HStack{
        Text("\(value)")
          .fontWeight(.regular)
          .font(.system(size: 70))
        
        Text("BPM")
          .font(.headline)
          .fontWeight(.bold)
          .foregroundColor(Color.red)
          .padding(.bottom, 28.0)
        
        Spacer()
        
      }
      // Display the timestamp below the BPM
      Text(timestamp)
        .font(.subheadline)
        .foregroundColor(Color.gray)
      
      Spacer()
    }
    .padding()
    .onAppear(perform: start)
  }
  
  func start() {
    requestHealthKitAuthorization(healthStore: RehatHealthStore.store)
    startHealthKitQuery(quantityTypeIdentifier: .heartRateVariabilitySDNN, healthStore: RehatHealthStore.store, updateFunction: displayLatestSample)
  }
  
  private func displayLatestSample(samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) -> Void {
    let (reading, timestamp) = getLatestSample(samples: samples, type: type)
    self.value = Int(reading)
    self.timestamp = timestamp
  }
}

#Preview {
  HKView()
}
