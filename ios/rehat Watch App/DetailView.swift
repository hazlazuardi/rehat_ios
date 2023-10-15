//
//  DetailView.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 15/9/2023.
//

import SwiftUI

struct DetailView: View {
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
