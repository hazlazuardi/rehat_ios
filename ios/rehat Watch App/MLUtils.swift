//
//  MLUtils.swift
//  rehat Watch App
//
//  Created by Avanox on 13/09/23.
//

import Foundation
import CoreML

func getClassifier() -> PanicAttackClassifier {
  guard
    let classifier = try? PanicAttackClassifier(configuration: MLModelConfiguration.init())
  else {
    fatalError("Error when initializing classifier.")
  }
  print("Got ML Model!")
  return classifier
}

func predict(hr: Double, sdnn: Double) -> PanicAttackClassifierOutput {
  guard
    let classifierOutput = try? getClassifier().prediction(sdnn: sdnn, hr: hr)
  else {
    fatalError("Classifier done broke")
  }
  print("Made Classification!")
  return classifierOutput
}

// Given existing data and current measurements & state,
// updates the model
func retrain(existing: MLDictionaryFeatureProvider, hr: Double, sdnn: Double, label: Int64) throws {
  let hrFeature = MLFeatureValue(double: hr)
  let sdnnFeature = MLFeatureValue(double: sdnn)
  let labelFeature = MLFeatureValue(int64: label)
  
  // create new feature provider from new data
  var featureProviders = [MLFeatureProvider]()
  featureProviders.append(existing)
  let dataPointFeatures: [String:MLFeatureValue] = ["hr": hrFeature,
                                                    "sdnn": sdnnFeature,
                                                    "label": labelFeature]
  if let provider = try? MLDictionaryFeatureProvider(dictionary: dataPointFeatures) {
    featureProviders.append(provider)
  } else {
    print("Error creating ML retraining data")
  }
  
  // FIXME: this code kinda stinks
  if let url = URL(string: "PanicAttackClassifier.mlmodelc") {
    let arrayBatchProvider = MLArrayBatchProvider(array: featureProviders)
    // FIXME: Debug print
    guard let updateTask = try? MLUpdateTask(forModelAt: url, trainingData: arrayBatchProvider, configuration: nil, completionHandler: {(MLUpdateContext) -> () in print("Successfully updated model.")})
    else { print("Error updating model!"); return }
  }
  print("ML Model not found!")
}
