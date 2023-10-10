//
//  RehatComplicationView.swift
//  rehat Watch WidgetExtension
//
//  Created by Kevin Kurniawan on 10/10/2023.
//

import SwiftUI

struct RehatComplicationView: View {
  @Environment(\.widgetFamily) private var family
  
  var body: some View {
    switch family {
    case .accessoryCircular:
      rehatCornerComplication()
    default:
      Image("AppIcon")
    }
  }
}
