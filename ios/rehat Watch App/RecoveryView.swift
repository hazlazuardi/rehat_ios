import SwiftUI

struct Therapy: Identifiable, Decodable {
  var id: UUID?
  var name: String
  var slides: [Slide]
  var icon: String
  var color: String
  
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
  @ObservedObject var rnConnector: RNConnector
  @State private var isPresented: Bool = true
  
  var body: some View {
    NavigationSplitView {
      List {
        ForEach(rnConnector.recoveryReferences, id: \.id) { reference in
          if reference.label == "Self-Affirmation" {
            NavigationLink(destination: AffirmView()) {
              VStack(alignment: .leading) {
                Image(systemName: "face.smiling.inverse")
                  .foregroundColor(.teal)
                  .frame(width: 40, height: 40)
                  .scaleEffect(1.5)
                Text(reference.label)
                  .padding(.bottom, 10)
                  .font(.title3)
              }
            }
          } else if reference.label == "Guided Breathing" {
            NavigationLink(destination: BreathView()) {
              VStack(alignment: .leading) {
                Image(systemName: "lungs.fill")
                  .foregroundColor(.blue)
                  .frame(width: 40, height: 40)
                  .scaleEffect(1.5)
                Text(reference.label)
                  .padding(.bottom, 10)
                  .font(.title3)
              }
            }
          }
//          else if let therapy = recoveryDatas.therapies.first(where: { $0.name == reference.label }) {
//            NavigationLink(destination: DetailView(therapy: therapy)) {
//              Text(therapy.name)
//                .font(.title3)
//                .fontWeight(.regular)
//                .foregroundColor(Color.primary)
//            }
//          }
          else if reference.label == "Grounding Technique" {
            Section {
              ForEach(recoveryDatas.therapies, id: \.id) { therapy in
                NavigationLink(destination: DetailView(therapy: therapy)) {
                  VStack(alignment: .leading) {
                    Image(systemName: therapy.icon)
                      .foregroundColor(colorFromString(therapy.color))
                      .frame(width: 40, height: 40)
                      .scaleEffect(1.5)
                    Text(therapy.name)
                      .padding(.bottom, 10)
                      .font(.title3)
                  }
                }
              }
            } header : {
              Text("Grounding Technique")
            }
          }
        }
        .navigationDestination(isPresented: $isPresented, destination: {BreathView()})
      }
      .navigationTitle("Recovery")
      
    } detail: {
      
      BreathView()
      
    }
//    .containerBackground(.orange.gradient, for: .navigation)
  }
}

func colorFromString(_ name: String) -> Color {
    switch name {
    case "green":
        return Color.green
    case "blue":
        return Color.blue
    default:
        return Color.black
    }
}

#Preview {
  let rnConnector = RNConnector() // Create an instance of RNConnector
  return RecoveryView(rnConnector: rnConnector) // Pass it to RecoveryView
}
