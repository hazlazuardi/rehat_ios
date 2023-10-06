////
////  ContentView.swift
////  rehat Watch App
////
////  Created by Wishnu Hazmi on 11/09/23.
////
//
import SwiftUI

struct ContentView: View {
  @StateObject var rnConnector = RNConnector()

  var body: some View {
    TabView {
      PanicView()
      RecoveryView()
      EmergencyContactsView(rnConnector: rnConnector)
    }
  }
}
//
//
//
//struct ContentView_Previews: PreviewProvider {
//  static var previews: some View {
//    ContentView()
//  }
//}

//import SwiftUI
//
//struct FirstView: View {
//  var body: some View {
//    Text("First View")
//  }
//}
//
//struct SecondView: View {
//  var body: some View {
//    Text("Second View")
//  }
//}
//
//struct ThirdView: View {
//  var body: some View {
//    Text("Third View")
//  }
//}
//
//struct ContentView: View {
//  @State private var isPresented: Bool = true
//  @State private var selectedView: String = "FirstView"  // Setting FirstView as the default view
//  
//  var body: some View {
//    NavigationSplitView {
//      List {
//        NavigationLink(destination: FirstView()) {
//          Text("First View")
//        }
//        NavigationLink(destination: SecondView()) {
//          Text("Second View")
//        }
//        NavigationLink(destination: ThirdView()) {
//          Text("Third View")
//        }
//        .navigationDestination(isPresented: $isPresented, destination: {FirstView()})
//      }
//      .navigationTitle("Views")
//    } detail: {
////      switch selectedView {
////      default:
////        FirstView()  // This is the default view
////      }
//      FirstView()
//    }
//  }
//}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
