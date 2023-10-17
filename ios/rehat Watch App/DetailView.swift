//
//  DetailView.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 15/9/2023.
//

import SwiftUI

#warning ("TODO: end component if AppState is panic AND (when user scrolls past chosen technique's end slide OR user wants to choose another technique)")
struct DetailView: View {
  @EnvironmentObject var appState: AppState
  @EnvironmentObject var workoutManager: WorkoutManager
  var therapy: Therapy
  
  var body: some View {
    VStack {
      TabView {
        ForEach(therapy.slides, id: \.self.title) { slide in
          ScrollView{
            VStack {
              Text(slide.title)
                .font(.title3)
//                .foregroundStyle(.orange)
                .padding()
                .fontWeight(.bold)
              
              Spacer()
              
              
              Text(slide.subTitle)
                .font(.caption2)
                .padding()
                .foregroundColor(Color.white.opacity(0.5))
              
            }
          }
        }
      }
      .onAppear {
        if appState.isPanic {
          workoutManager.methodsUsed.append(therapy.name)
        }
      }
      .containerBackground(.green.gradient, for: .navigation)
      
      //      .tint(.teal)
      //      .containerBackground(.teal.gradient, for: .tabView)
      .navigationTitle(therapy.name)
      .tabViewStyle(.verticalPage)
      
    }
    //    .background(
    //      LinearGradient(
    //                    gradient: Gradient(colors: [.blue, .green]),
    //                    startPoint: .top,
    //                    endPoint: .bottom
    //      )
    //      .ignoresSafeArea(edges: .all)
    //    )
  }
}
