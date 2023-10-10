//
//  HealthUtils.swift
//  rehat Watch App
//
//  Created by Avanox on 19/09/23.
//

import Foundation
import HealthKit

func getHR() {
  guard
    let sampleType = HKObjectType.quantityType(forIdentifier: .heartRate)
  else {
    return
  }
  
  let startDate = Calendar.current.date(byAdding: .month, value: -1, to: Date()) // idk why it's like this, got it from a yt vid
  
  let predicate = HKQuery.predicateForSamples(withStart: startDate, end: Date(), options: .strictEndDate)
  
  let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)
  
  let query = HKSampleQuery(sampleType: sampleType, predicate: predicate, limit: Int(HKObjectQueryNoLimit), sortDescriptors: [sortDescriptor]) {
    (sample, result, error) in
    guard error == nil else {
      return
    }
    
    // TODO: get HR from HealthKit data store
  }
}
