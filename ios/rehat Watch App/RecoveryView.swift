//
//  RecoveryView.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 13/9/2023.
//

import SwiftUI

struct Therapy: Identifiable, Decodable {
  var id: UUID?
  var name: String
  var slides: [Slide]
  
  struct Slide: Decodable {
    var title: String
    var subTitle: String
  }
}


class ReadDataTherapy: ObservableObject {
  @Published var therapies = [Therapy]()
  
  init(){
    loadData()
  }
  
  func loadData() {
    guard let url = Bundle.main.url(forResource: "recoveryData", withExtension: "json") else {
      print("JSON file not found")
      return
    }
    
    do {
      let data = try Data(contentsOf: url)
      var decodedTherapies = try JSONDecoder().decode([Therapy].self, from: data)
      
      for index in decodedTherapies.indices {
        if decodedTherapies[index].id == nil {
          decodedTherapies[index].id = UUID()
        }
      }
      
      self.therapies = decodedTherapies
      print("JSON data successfully loaded.")
    } catch let error {
      print("Error loading JSON data: \(error)")
    }
  }
}

struct RecoveryView: View {
  @ObservedObject var recoveryDatas = ReadDataTherapy()
  
  //  init() {
  //    UINavigationBar.appearance().largeTitleTextAttributes = [.foregroundColor: UIColor.red]
  //  }
  
  
  
  var body: some View {
    NavigationSplitView {
      List {
        NavigationLink(destination: BreathView()) {
          Text("Breathe")
        }
        ForEach(recoveryDatas.therapies, id: \.id) { therapy in
          NavigationLink(destination: DetailView(therapy: therapy)) {
            Text(therapy.name)
              .font(.title3)
              .fontWeight(.regular)
              .foregroundColor(Color.primary)
          }
        }
        NavigationLink(destination: AffirmView()) {
          Text("Words of Affirmation")
        }
      } .navigationTitle("Recovery")
    } detail: {
      BreathView()
    }
  }
}


struct RecoveryView_Previews: PreviewProvider {
  static var previews: some View {
    RecoveryView()
  }
}

//  NavigationStack {
//    ScrollView {
//      VStack {
//        NavigationLink(destination: EmergencyCallView()) {
//          Text("Emergency Call")
//        }
//        NavigationLink(destination: BreathView()) {
//          Text("Breathing Exercise")
//        }
//        ForEach(recoveryDatas.therapies, id: \.id) { therapy in
//          NavigationLink(destination: DetailView(therapy: therapy)) {
//            Text(therapy.name)
////                .font(.title3)
////                .fontWeight(.regular)
////                .foregroundColor(Color.primary)
//          }
//        }
//        NavigationLink(destination: AffirmView()) {
//          Text("Words of Affirmation")
//        }
//      }
//    }
//    .navigationTitle("Recovery")
//    .navigationBarTitleDisplayMode(.automatic)
//    
//  }
//}
