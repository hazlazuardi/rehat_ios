//
//  AffirmView.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 18/9/2023.
//

import SwiftUI

struct Affirm: Identifiable, Decodable {
    var id: UUID?
    var words: String
}

class ReadDataAffirm: ObservableObject {
  @Published var affirmations = [Affirm]()
  var lastRandomIndex: Int?

  
  init() {
    loadData()
  }
  
  func loadData() {
    guard let url = Bundle.main.url(forResource: "affirmWordsData", withExtension: "json") else {
      print("JSON file not found")
      return
    }
    
    do {
      let data = try Data(contentsOf: url)
      var decodedAffirmations = try JSONDecoder().decode([Affirm].self, from: data)
      
      for index in decodedAffirmations.indices {
        if decodedAffirmations[index].id == nil {
          decodedAffirmations[index].id = UUID()
        }
      }
      
      self.affirmations = decodedAffirmations
      print("JSON data successfully loaded.")
    } catch let error {
      print("Error loading JSON data: \(error)")
    }
  }
  
  func getRandomAffirmation() -> Affirm? {
      var randomIndex: Int
      
      if affirmations.count > 1 {
        // Generate a new random index different from the last one
        repeat {
          randomIndex = Int.random(in: 0..<affirmations.count)
        } while randomIndex == lastRandomIndex
      } else if affirmations.count == 1 {
        randomIndex = 0
      } else {
        return nil
      }
      
      lastRandomIndex = randomIndex
      return affirmations[randomIndex]
    }
}

struct AffirmView: View {
  @ObservedObject var affirmData = ReadDataAffirm()
  @State private var randomAffirmation: Affirm?
  
  var body: some View {
    VStack {
      if let affirmation = randomAffirmation {
        Text(affirmation.words)
          .padding()
      } else {
        Text("Loading...")
          .padding()
      }
      
      Spacer()
      
      HStack {
        Spacer()
        Button(action: {
          randomAffirmation = affirmData.getRandomAffirmation()
        }) {
          Text("Refresh")
            .font(.headline)
            .padding()
        }
        Spacer()
      }
    }
    .onAppear {
      // Load an initial random affirmation
      randomAffirmation = affirmData.getRandomAffirmation()
    }
  }
}

struct AffirmView_Previews: PreviewProvider {
    static var previews: some View {
        AffirmView()
    }
}