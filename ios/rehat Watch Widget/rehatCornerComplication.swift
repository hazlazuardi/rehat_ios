//
//  rehatCircularComplication.swift
//  rehat Watch WidgetExtension
//
//  Created by Kevin Kurniawan on 10/10/2023.
//

import SwiftUI
import WidgetKit

struct rehatCornerComplication: View {
  @Environment(\.widgetRenderingMode) var renderingMode

    var body: some View {
      VStack {
        AccessoryWidgetBackground()
//        Image(systemName: "cup.and.saucer.fill")
        Image(uiImage: UIImage(named: "Complicated")!)
          .font(.title.bold())
          .widgetAccentable()
          .widgetLabel {
            Text("Rehat")
          }
      }
      .containerBackground(for: .widget){
        Color.white
      }
    }
}

//#Preview(as: WidgetFamily .accessoryCorner) {
//  rehatCircularComplication()
//}

struct rehatCornerComplication_Previews: PreviewProvider {
  static var previews: some View {
    rehatCornerComplication()
      .previewContext(WidgetPreviewContext(family: .accessoryCorner))
  }
}
