//
//  HKUtils.swift
//  rehat Watch App
//
//  Created by Avanox on 10/10/23.
//

import Foundation
import HealthKit

func requestHealthKitAuthorization(healthStore: HKHealthStore) {
  let healthKitTypes: Set = [
    HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRate)!,
    HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRateVariabilitySDNN)!
  ]
  
  healthStore.requestAuthorization(toShare: healthKitTypes, read: healthKitTypes) { _, _ in }
}

typealias HKUpdateHandlerType = (HKAnchoredObjectQuery, [HKSample]?, [HKDeletedObject]?, HKQueryAnchor?, Error?) -> Void

func startHealthKitQuery(
  quantityTypeIdentifier: HKQuantityTypeIdentifier,
  healthStore: HKHealthStore,
  updateFunction: @escaping ([HKQuantitySample], HKQuantityTypeIdentifier) -> Void) {
  let devicePredicate = HKQuery.predicateForObjects(from: [HKDevice.local()])
  let updateHandler: HKUpdateHandlerType = {
    query, samples, deletedObjects, queryAnchor, error in
    
    guard let samples = samples as? [HKQuantitySample] else {
      return
    }
    
    updateFunction(samples, quantityTypeIdentifier)
  }
  
  // 4
  let query = HKAnchoredObjectQuery(type: HKObjectType.quantityType(forIdentifier: quantityTypeIdentifier)!, predicate: devicePredicate, anchor: nil, limit: HKObjectQueryNoLimit, resultsHandler: updateHandler)
  
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
  for sample in samples {
    if type == .heartRate {
      latestSample = sample.quantity.doubleValue(for: HKUnit(from: "count/min"))
    } else if type == .heartRateVariabilitySDNN {
      latestSample = sample.quantity.doubleValue(for: HKUnit.secondUnit(with: HKMetricPrefix.milli))
    }
    
    let timestamp = sample.startDate
    lastTimestamp = dateFormatter.string(from: timestamp)
  }
  
  return (latestSample, lastTimestamp)
}
