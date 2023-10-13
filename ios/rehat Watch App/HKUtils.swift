//
//  HKUtils.swift
//  rehat Watch App
//
//  Created by Avanox on 10/10/23.
//

import Foundation
import HealthKit

// Singleton health store
class RehatHealthStore {
  static let store = HKHealthStore()
}

func requestHealthKitAuthorization(healthStore: HKHealthStore) {
  let healthKitTypes: Set = [
    HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRate)!,
    HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRateVariabilitySDNN)!,
    HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.restingHeartRate)!,
    HKQuantityType.workoutType(),
  ]
  
  healthStore.requestAuthorization(toShare: healthKitTypes, read: healthKitTypes) { _, _ in }
}

typealias HKUpdateHandlerType = (HKAnchoredObjectQuery, [HKSample]?, [HKDeletedObject]?, HKQueryAnchor?, Error?) -> Void

func startHealthKitQuery(
  quantityTypeIdentifier: HKQuantityTypeIdentifier,
  healthStore: HKHealthStore,
  updateFunction: @escaping ([HKQuantitySample], HKQuantityTypeIdentifier) -> Void) {
//  let devicePredicate = HKQuery.predicateForObjects(from: [HKDevice.local()])
  let startDate = Calendar.current.startOfDay(for: .now)
  let endDate = Date()
  let predicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate)
  print("Query started ending at \(endDate.formatted())")
    
  let updateHandler: HKUpdateHandlerType = {
    query, samples, deletedObjects, queryAnchor, error in
    
    guard let samples = samples as? [HKQuantitySample] else {
      return
    }
    
    updateFunction(samples, quantityTypeIdentifier)
  }
  
  // 4
  let query = HKAnchoredObjectQuery(type: HKObjectType.quantityType(forIdentifier: quantityTypeIdentifier)!, predicate: predicate, anchor: nil, limit: HKObjectQueryNoLimit, resultsHandler: updateHandler)
  
  query.updateHandler = updateHandler
  
  // 5
  
  healthStore.execute(query)
}

func getLatestSample(samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) -> (Double, String) {
  var latestSample: Double = 0.0
  var lastTimestamp = ""
  
  // Format the timestamp as desired (e.g., using DateFormatter)
  let dateFormatter = DateFormatter()
  dateFormatter.dateFormat = "HH:mm:ss" // Customize this format
  
  print("Getting latest samples")
  if (!samples.isEmpty) {
    if type == .heartRate {
      latestSample = samples.lazy.map { $0.quantity.doubleValue(for: HKUnit(from: "count/min")) } .last!
      print("Got HR sample: \(latestSample) bpm at ", terminator: "")
    } else if type == .heartRateVariabilitySDNN {
      latestSample = samples.lazy.map { $0.quantity.doubleValue(for: HKUnit.secondUnit(with: HKMetricPrefix.milli)) } .last!
      print("Got HRV sample: \(latestSample) ms at ", terminator: "")
    }
    
    lastTimestamp = dateFormatter.string(from: samples.last!.startDate)
    print("\(lastTimestamp)")
  }
  
  return (latestSample, lastTimestamp)
}

