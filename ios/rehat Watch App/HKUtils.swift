//
//  HKUtils.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 10/10/23.
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

// Fetches HK data of specified type from health store
// data provided starts from beginning of the day to the current timestamp.
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

// fetches average of samples over a given time interval
// FIXME: some duplication, maybe join this with startHealthKitQuery.
func startAverageQuery(
  quantityTypeIdentifier: HKQuantityTypeIdentifier,
  healthStore: HKHealthStore,
  lastNSeconds: TimeInterval,
  updateFunction: @escaping ([HKQuantitySample], HKQuantityTypeIdentifier) -> Void) {
  let now = Date()
  let start = Date(timeInterval: -(lastNSeconds), since: now)
  let predicate = HKQuery.predicateForSamples(withStart: start, end: now)
    
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

func getAverageOfSamples(samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) -> (Double, Bool) {
  var sampleValues: [Double] = []
  var average = 0.0
  var shouldNotify = false
  
  if (!samples.isEmpty) {
    
    if type == .heartRate {
      // check if user is sedentary
      let motionContext: HKHeartRateMotionContext = HKHeartRateMotionContext(rawValue: (samples.last?.metadata?["HKMetadataKeyHeartRateMotionContext"])! as! Int) ?? HKHeartRateMotionContext.active
      print("HR Motion Context: \(motionContext)")
      if motionContext == HKHeartRateMotionContext.sedentary {
        // less chance of high HR due to activity
        shouldNotify = true
      } else {
        // higher chance of high HR due to activity
        // don't notify user to prevent false positive
        shouldNotify = false
      }
      
      // set extract values to double data type
      sampleValues = samples.map { $0.quantity.doubleValue(for: HKUnit(from: "count/min")) }
    } else if type == .heartRateVariabilitySDNN {
      // set extract values to double data type
      sampleValues = samples.map { $0.quantity.doubleValue(for: HKUnit.secondUnit(with: HKMetricPrefix.milli)) }
    }
    
    let sum = sampleValues.reduce(0, +)
    average = (sum / Double(samples.count))
  }
  
  return (average, shouldNotify)
}
