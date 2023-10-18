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
    //    VStack {
    TabView {
      ForEach(therapy.slides, id: \.title) { slide in
        //          ScrollView {
        VStack (alignment: HorizontalAlignment.center, spacing: 0){
          Text(slide.title)
            .font(.title3)
            .padding()
            .fontWeight(.bold)
            .fixedSize(horizontal: false, vertical: true)
          
          if let subSlide = slide.subTitle {
//            Spacer()
            
            Text(subSlide)
              .font(.caption2)
              .padding()
              .foregroundColor(Color.white.opacity(0.5))
          }
          
          if let imageName = slide.image, !imageName.isEmpty {
            Image(imageName)
              .resizable() // Make sure the image is resizable
              .aspectRatio(contentMode: .fit) // Retain the aspect ratio
            //                  .aspectRatio(contentMode: .fill)
            //                  .padding(.top, -20)
            //                  .offset(y: -25)
            //                  .padding(.bottom, 50)
              .frame(maxWidth: 100 , maxHeight: 100)
            
            Spacer()
          }
        }
        //          }
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
    .containerBackground(.green.gradient, for: .navigation)
    .navigationTitle(therapy.name)
    .tabViewStyle(.verticalPage)
    //    }
  }
}
