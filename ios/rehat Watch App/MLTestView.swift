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
        let prediction: PanicAttackClassifierOutput = predict(hr: 88.8, sdnn: 55.5)
        print(prediction.label)
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
