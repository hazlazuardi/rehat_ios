//
//  MLTestView.swift
//  rehat Watch App
//
//  Created by Avanox on 13/09/23.
//

import SwiftUI

struct MLTestView: View {
  var body: some View {
    VStack {
      Button {
        // simulate prediction
        let prediction: PanicAttackClassifierOutput = predict(hr: 88.8, sdnn: 55.5)
        print(prediction.label)
        
        let (sdnnData, hrData, labelData) = csvToArrays()
        // simulate retraining model
        do {
          try retrain(sdnnData: sdnnData, hrData: hrData, labelData: labelData, hr: 88.8, sdnn: 55.5, label: 2)
        } catch {
          print("Error retraining model.")
        }
        
        // simulate adding to csv
        let (sdnnDataNew, hrDataNew, labelDataNew) = appendToDataset(sdnnData: sdnnData, hrData: hrData, labelData: labelData, sdnn: 55.5, hr: 88.8, label: prediction.label)
        arraysToCsv(sdnnData: sdnnDataNew, hrData: hrDataNew, labelData: labelDataNew)
      } label: {
        Text("Print")
      }
    }
  }
  
  struct MLTestView_Previews: PreviewProvider {
    static var previews: some View {
      MLTestView()
    }
  }
}
