import SwiftUI

enum RecoveryMethodNames: String {
  case
    breathing = "Guided Breathing",
    affirmation = "Self-Affirmation",
    muscle_relaxation = "Muscle Relaxation",
    closed_eyes = "Closed Eyes Visualization",
    five_to_one = "5-4-3-2-1",
    call = "Emergency Call"
}

struct Therapy: Identifiable, Decodable {
  var id: UUID?
  var name: String
  var slides: [Slide]
  var icon: String
  var color: String
  
  struct Slide: Decodable {
    var title: String
    var subTitle: String?
    var image: String?
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
  @EnvironmentObject var workoutManager: WorkoutManager
  @EnvironmentObject var appState: AppState
  @ObservedObject var recoveryDatas = ReadDataTherapy()
  @ObservedObject var rnConnector: RNConnector
  @State private var isPresented: Bool = false
  @State public var emergencyContactsShown: Bool = false
  
  var body: some View {
    NavigationSplitView {
      List {
        if appState.isPanic {
          // panic state ordering
          let _ = print(rnConnector.recoveryReferences)
          ForEach(rnConnector.recoveryReferences, id: \.id) { reference in
            if reference.label == RecoveryMethodNames.affirmation.rawValue {
              showAffirmRow()
            } else if reference.label == RecoveryMethodNames.breathing.rawValue {
              showBreathRow()
            } else if reference.label == RecoveryMethodNames.muscle_relaxation.rawValue {
              showGroundingTechniqueRow(methodName: reference.label)
            } else if reference.label == RecoveryMethodNames.closed_eyes.rawValue {
              showGroundingTechniqueRow(methodName: reference.label)
            } else if reference.label == RecoveryMethodNames.five_to_one.rawValue {
              showGroundingTechniqueRow(methodName: reference.label)
            } else if reference.label == RecoveryMethodNames.call.rawValue {
              showEmergencyContactsRow()
            }
          }
        } else {
          // default ordering
          showAffirmRow()
          showBreathRow()
          showGroundingTechniquesGrouped()
        }
      }
      .navigationDestination(isPresented: $isPresented, destination: {BreathView()})
      .navigationTitle("Recovery")
    } detail: {
      BreathView()
    }
  }
  
  func showAffirmRow() -> some View {
    return
      NavigationLink(destination: AffirmView()) {
        VStack(alignment: .leading) {
          Image(systemName: "face.smiling.inverse")
            .foregroundColor(.purple)
            .frame(width: 30, height: 30)
            .padding(.top, 5)
            .scaleEffect(1.5)
          Text(RecoveryMethodNames.affirmation.rawValue)
            .padding(.bottom, 10)
            .font(.title3)
        }
      }
  }
  
  func showGroundingTechniquesGrouped() -> some View {
    return
      Section {
        ForEach(recoveryDatas.therapies, id: \.id) { therapy in
          NavigationLink(destination: DetailView(therapy: therapy)) {
            VStack(alignment: .leading) {
              Image(systemName: therapy.icon)
                .foregroundColor(colorFromString(therapy.color))
                .frame(width: 30, height: 30)
                .padding(.top, 7)
                .scaleEffect(1.5)
              Text(therapy.name)
                .padding(.bottom, 10)
                .font(.title3)
            }
          }
        }
      }
  }
  
  func showGroundingTechniqueRow(methodName: String) -> some View {
    let therapy = recoveryDatas.therapies.first(where: {$0.name == methodName})!
    return
      NavigationLink(destination: DetailView(therapy: therapy)) {
        VStack(alignment: .leading) {
          Image(systemName: therapy.icon)
            .foregroundColor(colorFromString(therapy.color))
            .frame(width: 30, height: 30)
            .padding(.top, 7)
            .scaleEffect(1.5)
          Text(therapy.name)
            .padding(.bottom, 10)
            .font(.title3)
        }
      }
  }
  
  func showEmergencyContactsRow() -> some View {
    return
      NavigationLink(destination: EmergencyContactsView(rnConnector: rnConnector)) {
        VStack(alignment: .leading) {
          Image(systemName: "phone")
            .foregroundColor(.orange) // placeholder
            .frame(width: 30, height: 30)
            .padding(.top, 5)
            .scaleEffect(1.5)
          Text(RecoveryMethodNames.call.rawValue)
            .padding(.bottom, 10)
            .font(.title3)
        }
      }
  }
  
  func showBreathRow() -> some View {
    return
      NavigationLink(destination: BreathView()) {
        VStack(alignment: .leading) {
          Image(systemName: "lungs.fill")
            .foregroundColor(.blue)
            .frame(width: 30, height: 30)
            .padding(.top, 5)
            .scaleEffect(1.5)
          Text(RecoveryMethodNames.breathing.rawValue)
            .padding(.bottom, 10)
            .font(.title3)
        }
      }
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
