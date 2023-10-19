//
//  HKUtils.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 10/10/23.
//

import Foundation
import HealthKit

/// Singleton health store
class RehatHealthStore {
  static let store = HKHealthStore()
}

/// Requests user for HealthKit access
func requestHealthKitAuthorization(healthStore: HKHealthStore) {
  let healthKitTypes: Set = [
    HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRate)!,
    HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRateVariabilitySDNN)!,
    HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.restingHeartRate)!,
    HKQuantityType.workoutType(),
  ]
  
  healthStore.requestAuthorization(toShare: healthKitTypes, read: healthKitTypes) { _, _ in }
}

/// HealthKit Update Handler function type
typealias HKUpdateHandlerType = (HKAnchoredObjectQuery, [HKSample]?, [HKDeletedObject]?, HKQueryAnchor?, Error?) -> Void

/// Fetches HK data of specified type from health store
/// data provided starts from beginning of the day to the current timestamp.
///
/// Parameters:
/// - quantityTypeIdentifier: type of samples to query
/// - healthStore: HealthKit store to pull from
/// - updateFunction: function to call when new samples are received
func startHealthKitQuery(
  quantityTypeIdentifier: HKQuantityTypeIdentifier,
  healthStore: HKHealthStore,
  updateFunction: @escaping ([HKQuantitySample], HKQuantityTypeIdentifier) -> Void) {
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
  
  // form the query to be executed on the HealthKit store
  let query = HKAnchoredObjectQuery(type: HKObjectType.quantityType(forIdentifier: quantityTypeIdentifier)!, predicate: predicate, anchor: nil, limit: HKObjectQueryNoLimit, resultsHandler: updateHandler)
  
  query.updateHandler = updateHandler
  
  healthStore.execute(query)
}

/// Gets the latest sample stores in the HealthKit store
///
/// Parameters:
/// - samples: a range of samples in the HK store
/// - type: the type of sample we want
/// Returns:
/// - Tuple of
///   - Latest sample of the given type
///   - Timestamp at which the latest sample was taken
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

/// Fetches the average of HK data of specified type from health store
/// data provided starts from the last N seconds before the time of execution
///
/// Parameters:
/// - quantityTypeIdentifier: type of samples to query
/// - healthStore: HealthKit store to pull from
/// - lastNSeconds: time interval from which to pull the samples
/// - updateFunction: function to call when new samples are received
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

/// Gets the average of samples in the HealthKit store
///
/// Parameters:
/// - samples: All samples in the HK store
/// - type: the type of sample we want
/// Returns:
/// - Tuple of
///   - average of samples of the given type
///   - boolean of whether or not the app should notify the user
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
