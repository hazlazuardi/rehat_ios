//
//  HKView.swift
//  rehat Watch App
//
//  Created by Wishnu Hazmi Lazuardi on 23/9/2023.
//

import SwiftUI
import HealthKit

struct HKView: View {
  private var healthStore = HKHealthStore()
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
    autorizeHealthKit()
    startHeartRateQuery(quantityTypeIdentifier: .heartRate)
  }
  
  func autorizeHealthKit() {
    let healthKitTypes: Set = [
      HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRate)!]
    
    healthStore.requestAuthorization(toShare: healthKitTypes, read: healthKitTypes) { _, _ in }
  }
  
  private func startHeartRateQuery(quantityTypeIdentifier: HKQuantityTypeIdentifier) {
    
    // 1
    let devicePredicate = HKQuery.predicateForObjects(from: [HKDevice.local()])
    // 2
    let updateHandler: (HKAnchoredObjectQuery, [HKSample]?, [HKDeletedObject]?, HKQueryAnchor?, Error?) -> Void = {
      query, samples, deletedObjects, queryAnchor, error in
      
      // 3
      guard let samples = samples as? [HKQuantitySample] else {
        return
      }
      
      self.process(samples, type: quantityTypeIdentifier)
      
    }
    
    // 4
    let query = HKAnchoredObjectQuery(type: HKObjectType.quantityType(forIdentifier: quantityTypeIdentifier)!, predicate: devicePredicate, anchor: nil, limit: HKObjectQueryNoLimit, resultsHandler: updateHandler)
    
    query.updateHandler = updateHandler
    
    // 5
    
    healthStore.execute(query)
  }
  
  private func process(_ samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) {
    var lastHeartRate = 0.0
    var lastTimestamp = ""
    
    for sample in samples {
      if type == .heartRate {
        lastHeartRate = sample.quantity.doubleValue(for: heartRateQuantity)
        // Retrieve the timestamp from the sample
        let timestamp = sample.startDate
        
        // Format the timestamp as desired (e.g., using DateFormatter)
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "HH:mm:ss" // Customize this format
        
        lastTimestamp = dateFormatter.string(from: timestamp)
      }
      
      self.value = Int(lastHeartRate)
      self.timestamp = lastTimestamp
    }
  }
}

#Preview {
  HKView()
}
