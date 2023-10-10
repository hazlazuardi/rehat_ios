//
//  rehat_Watch_Widget.swift
//  rehat Watch Widget
//
//  Created by Kevin Kurniawan on 10/10/2023.
//

import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), emoji: "😀")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), emoji: "😀")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, emoji: "😀")
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let emoji: String
}

struct rehat_Watch_WidgetEntryView : View {
  @Environment(\.widgetFamily) private var family
  
  var entry: Provider.Entry

  var body: some View {
    //        VStack {
    //            HStack {
    //                Text("Time:")
    //                Text(entry.date, style: .time)
    //            }
    //
    //            Text("Emoji:")
    //            Text(entry.emoji)
    //        }
//    ZStack {
//      AccessoryWidgetBackground()
//      Image("AppIcon")
//        .font(.title.bold())
//        .widgetAccentable()
//    }
    switch family {
    case .accessoryCorner:
      rehatCornerComplication()
//      Text("kontol")
    case .accessoryCircular:
      rehatCircularComplication()
    default:
      Image("AppIcon")
    }
  }
}

@main
struct rehat_Watch_Widget: Widget {
    let kind: String = "rehat_Watch_Widget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(watchOS 10.0, *) {
                rehat_Watch_WidgetEntryView(entry: entry)
//              RehatComplicationView()
                    .containerBackground(.fill.tertiary, for: .widget)
            } else {
                rehat_Watch_WidgetEntryView(entry: entry)
                    .padding()
                    .background()
            }
        }
        .configurationDisplayName("Rehat")
        .description("This is a shortcut widget.")
        .supportedFamilies([.accessoryCorner, .accessoryCircular, .accessoryInline])
    }
}

#Preview(as: WidgetFamily .accessoryCorner) {
    rehat_Watch_Widget()
} timeline: {
    SimpleEntry(date: .now, emoji: "😀")
//    SimpleEntry(date: .now, emoji: "🤩")
}
