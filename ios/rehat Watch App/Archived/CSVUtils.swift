//
//  CSVUtils.swift
//  rehat Watch App
//
//  Created by Avatar Azka on 25/09/23.
//

import Foundation

// Adapted from
//  https://github.com/JacopoMangiavacchi/CoreML-TransferLearning-Demo/blob/e6f63945e6d15cdd6f826cf44d54a84ee58a4cee/CoreML_Training/CoreML_Training/HousingData.swift#L44
public func csvToArrays() -> ([Double], [Double], [Int64]) {
  // Load Data
  let filePath = Bundle.main.url(forResource: "dataset", withExtension: "csv")
  let data = try! String(contentsOf: filePath!, encoding: String.Encoding.utf8)

  // Convert *Comma* Separated CSV with no Header
  let dataRecords: [[Double]] = data.split(separator: "\n").map{ String($0).split(separator: ",").compactMap{ Double(String($0)) } }

  // Data Ingestion
  let numColumns = dataRecords[0].count
  
  let dataFeatures = dataRecords.map{ Array($0[0..<numColumns]) }
  
  let sdnnData = dataFeatures.flatMap{ row in [0].map{ Double(row[$0]) } }
  let hrData = dataFeatures.flatMap{ row in [1].map{ Double(row[$0]) } }
  let labelData = dataFeatures.flatMap{ row in [2].map{ Int64(row[$0]) } }
  
  return (sdnnData, hrData, labelData)
}

public func appendToDataset(
  sdnnData: [Double], hrData: [Double], labelData: [Int64], sdnn: Double, hr: Double, label: Int64) -> ([Double], [Double], [Int64]) {
  let sdnnDataNew = sdnnData + [sdnn]
  let hrDataNew = hrData + [hr]
  let labelDataNew = labelData + [label]
 
  return (sdnnDataNew, hrDataNew, labelDataNew)
}

// Adapted from https://stackoverflow.com/questions/55870174/how-to-create-a-csv-file-using-swift
public func arraysToCsv(sdnnData: [Double], hrData: [Double], labelData: [Int64]) {
  var csvStr = ""
  let numEntries = labelData.count
  for i in 0..<numEntries {
    csvStr = csvStr.appending("\(String(describing: sdnnData[i])),\(String(describing: hrData[i])),\(String(describing: labelData[i]))\n")
  }
  
  do {
    let filePath = Bundle.main.path(forResource: "dataset", ofType: "csv")
    try csvStr.write(toFile: filePath!, atomically: true, encoding: .utf8)
  } catch {
    print("Error writing csv!")
  }
}
