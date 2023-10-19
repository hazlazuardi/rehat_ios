//
//  MLUtils.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 13/09/23.
//

import Foundation
import CoreML

// MARK: Retrieving and inferring from compiled model
/// Get compiled classifier model
///
/// - Returns: Classifier model used to infer panic states based on HR and HRV
func getClassifier() -> PanicAttackClassifier {
  guard
    let classifier = try? PanicAttackClassifier(configuration: MLModelConfiguration.init())
  else {
    fatalError("Error when initializing classifier.")
  }
  return classifier
}

/// Classifier output labels, as defined by:
/// Jonathan Rubin, Rui Abreu, Shane Ahern, Hoda Eldardiry, and Daniel G. Bobrow. Time, Frequency & Complexity Analysis for Recognizing Panic States from Physiologic Time-Series. In Proceedings of the 10th EAI International Conference on Pervasive Computing Technologies for Healthcare, PervasiveHealth, 2016.
enum ClassifierLabel: Int64 {
  case
    nonPanic = 0,
    panic = 1,
    prePanic = 2
}

/// Infer a predicted panic state based on the given HR and HRV values
///
/// - Parameters:
///   - hr: The measured Heart Rate
///   - sdnn: The measured Heart Rate Variability, as defined by HealthKit's heartRateVariabilitySDNN type, converted into a Double
/// - Returns: The classifier's output
func predict(hr: Double, sdnn: Double) -> ClassifierLabel {
  guard let classifierOutput = try? getClassifier().prediction(sdnn: sdnn, hr: hr)
  else { fatalError("Failed to infer classification") }
  
  guard let label: ClassifierLabel = .init(rawValue: classifierOutput.label)
  else { fatalError("Invalid classification") }
  
  return label
}

// MARK: (Deprecated) Model Retraining
/// Given existing data and current measurements & state
/// updates the model
///
/// - Parameters:
///   - sdnnData: existing sdnn data
///   - hrData: existing hr data
///   - labelData: existing label data
///   - hr: new hr data
///   - sdnn: new sdnn data
///   - label: new true label
func retrain(sdnnData: [Double], hrData: [Double], labelData: [Int64], hr: Double, sdnn: Double, label: Int64) throws {
  let hrFeatures = doubleArrayToFeatureArray(doubleArray: hrData) + [MLFeatureValue(double: hr)]
  let sdnnFeatures = doubleArrayToFeatureArray(doubleArray: sdnnData) + [MLFeatureValue(double: sdnn)]
  let labelFeatures = intArrayToFeatureArray(intArray: labelData) + [MLFeatureValue(int64: label)]
  
  let featureDict = [
    "sdnn": sdnnFeatures,
    "hr": hrFeatures,
    "label": labelFeatures
  ]
  
  // Update stored model
  if let url = Bundle.main.url(forResource: "PanicAttackClassifier", withExtension: "mlmodelc") {
    // Create training data from updated dataset
    let arrayBatchProvider = try MLArrayBatchProvider(dictionary: featureDict)
    
    // Update the model using the provided training data
    do {
      let updateTask = try MLUpdateTask(forModelAt: url,
                                      trainingData: arrayBatchProvider,
                                      configuration: nil,
                                      completionHandler: completionHandler)
      updateTask.resume()
    } catch {
      print("\(error)")
    }
  } else {
    print("ML Model not found!")
  }
}

/// handles the completion of model retraining
/// saves the model into watch storage
func completionHandler(updateContext: MLUpdateContext) -> Void {
  let updatedModel = updateContext.model
  let fileManager = FileManager.default
  let url = Bundle.main.url(forResource: "PanicAttackClassifier", withExtension: "mlmodelc")?.absoluteURL
  
  do {
    try updatedModel.write(to: url!)
  } catch {
    print("Error writing updated model to file!")
  }
  print("Successfully updated model!")
}

/// turns an array of doubles into an array of CoreML features
func doubleArrayToFeatureArray(doubleArray: [Double]) -> [MLFeatureValue] {
  return doubleArray.map { MLFeatureValue(double: $0) }
}

/// turns an array of integers into an array of CoreML features
func intArrayToFeatureArray(intArray: [Int64]) -> [MLFeatureValue] {
  return intArray.map { MLFeatureValue(int64: $0) }
}
