//
//  MLUtils.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 13/09/23.
//

import Foundation
import CoreML

func getClassifier() -> PanicAttackClassifier {
  guard
    let classifier = try? PanicAttackClassifier(configuration: MLModelConfiguration.init())
  else {
    fatalError("Error when initializing classifier.")
  }
//  print("Got ML Model!")
  return classifier
}

func predict(hr: Double, sdnn: Double) -> PanicAttackClassifierOutput {
  guard
    let classifierOutput = try? getClassifier().prediction(sdnn: sdnn, hr: hr)
  else {
    fatalError("Classifier done broke")
  }
  print("Made Classification: \(classifierOutput.label)")
  return classifierOutput
}

// Given existing data and current measurements & state,
// updates the model
func retrain(sdnnData: [Double], hrData: [Double], labelData: [Int64], hr: Double, sdnn: Double, label: Int64) throws {
  let hrFeatures = doubleArrayToFeatureArray(doubleArray: hrData) + [MLFeatureValue(double: hr)]
  let sdnnFeatures = doubleArrayToFeatureArray(doubleArray: sdnnData) + [MLFeatureValue(double: sdnn)]
  let labelFeatures = intArrayToFeatureArray(intArray: labelData) + [MLFeatureValue(int64: label)]
  
  // create new feature provider from new data
//  var featureProviders = [MLFeatureProvider]()
//  featureProviders.append(existing)
//  let dataPointFeatures: [String:MLFeatureValue] = ["hr": hrFeature,
//                                                    "sdnn": sdnnFeature,
//                                                    "label": labelFeature]
  let featureDict = [
    "sdnn": sdnnFeatures,
    "hr": hrFeatures,
    "label": labelFeatures
  ]
//  if let provider = try? MLDictionaryFeatureProvider(dictionary: featureDict) {
//    featureProviders.append(provider)
//  } else {
//    print("Error creating ML retraining data")
//  }
  
  // FIXME: this code kinda stinks
  if let url = Bundle.main.url(forResource: "PanicAttackClassifier", withExtension: "mlmodelc") {
    let arrayBatchProvider = try MLArrayBatchProvider(dictionary: featureDict)
    // FIXME: Debug print
    // Update Task
    do {
      let updateTask = try MLUpdateTask(forModelAt: url,
                                               trainingData: arrayBatchProvider,
                                               configuration: nil,
                                               completionHandler: completionHandler
                                            )
      updateTask.resume()
    } catch {
      print("\(error)")
    }
//    else { print("Error creating update task!"); return }
  } else {
    print("ML Model not found!")
  }
}

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

func doubleArrayToFeatureArray(doubleArray: [Double]) -> [MLFeatureValue] {
  return doubleArray.map { MLFeatureValue(double: $0) }
}

func intArrayToFeatureArray(intArray: [Int64]) -> [MLFeatureValue] {
  return intArray.map { MLFeatureValue(int64: $0) }
}

//func getDataset() -> MLDictionaryFeatureProvider {
//  let datasetURL = Bundle.main.url(forResource: "all_subjects_dataset", withExtension: ".csv")
//}
