# Rehat

### DECO3801 Project #037: Self-Mental Awareness via Biofeedback

## Team Avanox
- Jerome Emmanuel - 47287824
- Wishnu Hazmi Lazuardi - 4728274
- Naufal Rafi Athallah Ramadhan - 47358546
- Kevin Muhammad Afiza Kurniawan - 47347755
- Avatar Putra Pertama Azka - 47286238
- Yolanda Sirait - 47325221

## Project Structure
```
.                           # project root
├── ios/                    # main location for Swift files
│   ├── rehat Watch App/    # main Apple Watch app files
│   ├── rehat Watch Widget/ # watch complication files
│   └── rehat_ios/          # TODO: what this do
└── src/                    # main location for React Native files
    ├── assets/             # TODO: what this all do
    ├── components/         #
    ├── context/            #
    ├── data/               #
    ├── helpers/            #
    └── screens/            #
```

## How to run the app
Here's a step by step to run the app.
1. Open XCode
2. Go to Open and open the folder rehat_ios/ios
3. Open terminal at rehat_ios, then run npm install
4. Then in terminal navigate to rehat_ios/ios (cd ios)
5. Then run the command pod install
6. Back to XCode, press the play button on the top left or press Cmd + R
7. (Optional) If you're planning to build the watch app as well go to Product -> Scheme -> Rehat Watch App

To run the app on your phone and or your watch, there are a certain things that are needed to be setup.
1. In Xcode, navigate to rehat_ios
2. Open the Signing and Capabilities tab
3. Change the Team to your Apple Developer Team for all targets
4. Change the bundle identifier for all targets
5. Go to Product -> Destination -> Manage Run Destination
6. Connect your phone and watch until it is shown and ready in the run destination
7. Back to XCode, press the play button on the top left or press Cmd + R
8. (Fix) If the build failed with the error "This app cannot be installed because its integrity could not be verified.", go to XCode Settings -> Your Apple ID -> Download Manual Profile, then run again

## Acknowledgements
Panic Attack HR & HRV Dataset and ML Model:
- Jonathan Rubin, Rui Abreu, Shane Ahern, Hoda Eldardiry, and Daniel G. Bobrow. Time, Frequency & Complexity Analysis for Recognizing Panic States from Physiologic Time-Series. *In Proceedings of the 10th EAI International Conference on Pervasive Computing Technologies for Healthcare*, PervasiveHealth, 2016.
- Rubin, Jonathan, et al. "Towards a mobile and wearable system for predicting panic attacks." *Proceedings of the 2015 ACM International Joint Conference on Pervasive and Ubiquitous Computing*. 2015.
