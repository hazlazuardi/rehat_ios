//
//  ReadData.swift
//  rehat Watch App
//
//  Created by Kevin Kurniawan on 17/9/2023.
//

import Foundation
//import SwiftUI

//class ReadData<T: Decodable>: ObservableObject {
//    @Published var data: [T] = []
//
//    init(filename: String) {
//        loadData(filename: filename)
//    }
//
//    func loadData(filename: String) {
//        guard let url = Bundle.main.url(forResource: filename, withExtension: "json") else {
//            print("JSON file not found")
//            return
//        }
//
//        do {
//            let data = try Data(contentsOf: url)
//            let decodedData = try JSONDecoder().decode([T].self, from: data)
//            self.data = decodedData
//            print("JSON data successfully loaded.")
//        } catch {
//            print("Error decoding JSON: \(error)")
//        }
//    }
//}
