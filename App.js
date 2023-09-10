import React, { useEffect } from 'react';
import StoreProvider from './src/context/Context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './src/components/BottomTabBar';
import AppleHealthKit from 'react-native-health';
import { NativeEventEmitter, NativeModules } from 'react-native';



function App() {


	AppleHealthKit.isAvailable((err, available) => {
		if (err) {
			console.log('error initializing Healthkit: ', err);
			return;
		}
		console.log(available);
	});

	let options = {
		unit: 'bpm', // optional; default 'bpm'
		startDate: new Date(2023, 7, 20).toISOString(), // required
		endDate: new Date().toISOString(), // optional; default now
		ascending: false, // optional; default false
		limit: 10, // optional; default no limit
	};

	function getHR() {
		return AppleHealthKit.getHeartRateSamples(
			options,
			(err, results) => {
				if (err) {
					console.log('error HR', err);
					return;
				}
				console.log(results);
			},
		);
	}

	getHR();


	new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
		'healthKit:HeartRate:new',
		async () => {
			console.log('--> observer triggered');
			getHR();
		},
	);
	// /* Permission options */
	// const permissions = {
	// 	permissions: {
	// 		read: [AppleHealthKit.Constants.Permissions.HeartRate],
	// 		write: [AppleHealthKit.Constants.Permissions.Steps],
	// 	},
	// };

	// AppleHealthKit.initHealthKit(permissions, (error) => {
	// 	/* Called after we receive a response from the system */

	// 	if (error) {
	// 		console.log('[ERROR] Cannot grant permissions!');
	// 	}

	// 	/* Can now read or write to HealthKit */

	// 	const options = {
	// 		startDate: new Date(2023, 9, 8).toISOString(),
	// 	};

	// 	AppleHealthKit.getHeartRateSamples(options, (callbackError, results) => {
	// 		/* Samples are now collected from HealthKit */
	// 		console.log('result', results);
	// 	});
	// });


	// useEffect(() => {
	// 	new NativeAppEventEmitter(NativeModules.AppleHealthKit).addListener(
	// 		'healthKit:HeartRate:new',
	// 		async () => {
	// 			console.log('--> observer triggered');
	// 		}
	// 	);
	// });

	return (
		<StoreProvider>
			<NavigationContainer>
				<BottomTabBar />
			</NavigationContainer>
		</StoreProvider>
	);
}

export default App;