//
//  rehatCircularComplication.swift
//  rehat Watch WidgetExtension
//
//  Created by Kevin Kurniawan on 10/10/2023.
//

import SwiftUI
import WidgetKit

struct rehatCircularComplication: View {
  @Environment(\.widgetRenderingMode) var renderingMode

    var body: some View {
      VStack {
//        AccessoryWidgetBackground()
//        Image(systemName: "cup.and.saucer.fill")
        Image(uiImage: UIImage(named: "Complicated")!)
          .font(.title.bold())
//          .widgetAccentable()
      }
      .containerBackground(for: .widget){
        Color.white
      }
    }
}

struct rehatCircularComplication_Previews: PreviewProvider {
  static var previews: some View {
    rehatCircularComplication()
      .previewContext(WidgetPreviewContext(family: .accessoryCircular))
  }
}

