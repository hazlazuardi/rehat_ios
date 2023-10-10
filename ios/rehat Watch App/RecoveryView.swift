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
//      print("JSON data successfully loaded.")
    } catch let error {
      print("Error loading JSON data: \(error)")
    }
  }
}

struct RecoveryView: View {
  @ObservedObject var recoveryDatas = ReadDataTherapy()
  @ObservedObject var rnConnector = RNConnector()
  @State private var isPresented: Bool = true
  
  var body: some View {
    NavigationSplitView {
      List {
        ForEach(rnConnector.recoveryReferences, id: \.id) { reference in
          if reference.label == "Self-Affirmation" {
            NavigationLink(destination: AffirmView()) {
              Text(reference.label)
            }
          } else if reference.label == "Guided Breathing" {
            NavigationLink(destination: BreathView()) {
              Text(reference.label)
            }
          }
          else if let therapy = recoveryDatas.therapies.first(where: { $0.name == reference.label }) {
            NavigationLink(destination: DetailView(therapy: therapy)) {
              Text(therapy.name)
                .font(.title3)
                .fontWeight(.regular)
                .foregroundColor(Color.primary)
            }
            .navigationDestination(isPresented: $isPresented, destination: {BreathView()})
          }
        }
      }
      .navigationTitle("Recovery")
      
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
