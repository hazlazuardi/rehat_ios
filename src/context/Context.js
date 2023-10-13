import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import PropTypes from 'prop-types';
import { storage } from "../../App";
import { formatDate } from "../helpers/useDateFormatter";
import { updateApplicationContext, watchEvents, sendMessage } from 'react-native-watch-connectivity';
import useEmergencyContacts from "../helpers/useEmergencyContacts";


/**
 * Context for managing theme-related data.
 *
 * @type {React.Context}
 */
const ThemeContext = createContext(null);

/**
 * Context for managing journal-related data.
 *
 * @type {React.Context}
 */
const JournalContext = createContext(null);

const EmergencyContactsContext = createContext(null)

const RecoveryReferencesContext = createContext(null)

/**
 * A provider component that wraps the application and provides
 * context for managing theme and journal data.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The rendered StoreProvider component.
 */
function StoreProvider({ children }) {

	/**
	 * UseReducer hook to manage journal data and dispatch actions.
	 *
	 * @type {[object, Function]}
	 * @property {object} journal - The current state of the journal.
	 * @property {React.DispatchWithoutAction} dispatchJournal - A function to dispatch actions to modify the journal state.
	 */
	const [journal, dispatchJournal] = useReducer(journalReducer, initialJournal);

	const [journalingConfig, setJournalingConfig] = useState(initialJournalingConfig);

	const [emergencyContacts, dispatchEmergencyContacts] = useReducer(contactReducer, initialEmergencyContactConfig)

	const [recoveryReferences, dispatchRecoveryReferences] = useReducer(recoveryReferencesReducer, initialRecoveryReferences)


	// Retrieve emergency contacts from the storage
	useEffect(() => {
		dispatchEmergencyContacts({ type: 'getAllEmergencyContacts' })
		dispatchRecoveryReferences({ type: 'getRecoveryReferences' })
	}, [])

	// Update ApplicationContext for the Watch App
	// useEffect(() => {
	// 	console.log(emergencyContacts)
	// 	if (emergencyContacts.length !== 0) {
	// 		updateApplicationContext({ 'emergencyContacts': [...emergencyContacts] })
	// 	}
	// 	const strRecoveryReferences = storage.getString('recoveryReferences');
	// 	if (strRecoveryReferences) {
	// 		const parsedRecoveryReferences = JSON.parse(strRecoveryReferences);
	// 		updateApplicationContext({ 'recoveryReferences': [...parsedRecoveryReferences] })
	// 	}
	// 	console.log('updateContext')
	// }, [emergencyContacts.length, recoveryReferences.length])

	return (
		<ThemeContext.Provider value={{}}>
			<RecoveryReferencesContext.Provider value={{ recoveryReferences, dispatchRecoveryReferences }}>
				<EmergencyContactsContext.Provider value={{ emergencyContacts, dispatchEmergencyContacts }}>
					<JournalContext.Provider value={{ journal, dispatchJournal, journalingConfig, setJournalingConfig }}>
						{children}
					</JournalContext.Provider>
				</EmergencyContactsContext.Provider>
			</RecoveryReferencesContext.Provider>
		</ThemeContext.Provider>
	);
}

StoreProvider.propTypes = {
	children: PropTypes.node
};

/**
 * Custom hook for accessing theme-related data from the context.
 *
 * @returns {object} Theme-related data from the context.
 */
export function useTheme() {
	return useContext(ThemeContext);
}

/**
 * Custom hook for accessing journal-related data and dispatching actions.
 *
 * @returns {object} Journal-related data and dispatch function from the context.
 */
export function useJournal() {
	return useContext(JournalContext);
}

export function useEmergencyContact() {
	return useContext(EmergencyContactsContext);
}

export function useRecoveryReferences() {
	return useContext(RecoveryReferencesContext)
}

/**
 * Reducer function for managing journal-related actions.
 *
 * @param {object} state - The current state of the journal.
 * @param {object} action - The action to perform on the journal state.
 * @returns {object} The updated journal state.
 */
function journalReducer(state, action) {
	switch (action.type) {
		case 'getAllJournals': {
			const strJournals = storage.getString('journals');

			if (strJournals) {
				const journals = JSON.parse(strJournals);
				console.log('from storage', journals);
				// return { ...journals }
			}

			return { ...initialJournal }
		}
		case 'setJournal': {
			return {
				...state,
				...action.payload
			}
		}
		case 'saveJournal': {
			const strJournals = storage.getString('journals');

			const newJournalData = {
				...state,
				id: state.dateAdded
			};

			let journals = [];

			if (strJournals) {
				journals = JSON.parse(strJournals);
				console.log('from storage', journals);
			}

			journals.push(newJournalData);

			const newJournals = JSON.stringify(journals);
			storage.set('journals', newJournals);
			console.log('saved journals', newJournals);

			return { ...initialJournal };
		}
		case 'eraseJournals': {
			storage.delete('journals');
			return { ...initialJournal };
		}
		default: {
			throw Error(`Unknown action: ${action.type}`);
		}
	}
}

/**
 * The initial state for journal data.
 *
 * @type {object}
 */
const initialJournal = {
	emotionCategory: '',
	emotions: [],
	hr: 0,
	hrv: 0,
	photo: {},
	withWho: '',
	where: '',
	thoughts: '',
	dateAdded: '',
};

const initialJournalingConfig = {
	journalEmotions: {
		unpleasant: [
			"Angry",
			"Anxious",
			"Confused",
			"Depressed",
			"Disgusted",
			"Frustrated",
			"Guilty",
			"Irritated",
			"Lonely",
			"Sad",
		],
		slightlyUnpleasant: [
			"Bored",
			"Distracted",
			"Indifferent",
			"Nervous",
			"Tired",
		],
		neutral: [
			"Calm",
			"Content",
			"Relaxed",
			"Satisfied",
			"Serene",
			"Tranquil",
		],
		pleasant: [
			"Amused",
			"Excited",
			"Happy",
			"Joyful",
			"Optimistic",
			"Proud",
		],
		veryPleasant: [
			"Blissful", "Ecstatic", "Euphoric"
		]
	},
	journalThoughts: {
		people: [
			'Mom', 'Dad', 'Brother', 'Friends', 'Partner', 'Teacher', 'Boss'
		],
		locations: [
			'School', 'Home', 'Restaurant', 'Work', 'Park', 'Transport', 'Shop'
		]
	}
}

function recoveryReferencesReducer(state, action) {
	switch (action.type) {
		case 'getRecoveryReferences': {
			const strRecoveryReferences = storage.getString('recoveryReferences');
			if (strRecoveryReferences) {
				const recoveryReferences = JSON.parse(strRecoveryReferences);
				return recoveryReferences;
			}
			return [...state]; // return the current state if there is no data in storage
		}
		case 'sortRecoveryReferences': {
			console.log('sorted', action.payload)
			const strRecoveryReferences = JSON.stringify(action.payload);
			storage.set('recoveryReferences', strRecoveryReferences);
			console.log('saved', action.payload)
			updateApplicationContext({ 'recoveryReferences': [...action.payload] })
			return [
				...action.payload
			]
		}
		default: {
			throw Error(`Unknown action: ${action.type}`);
		}
	}
}


const initialRecoveryReferences = [
	{ key: '1', label: 'Guided Breathing' },
	{ key: '2', label: 'Grounding Technique' },
	{ key: '3', label: 'Self-Affirmation' },
	{ key: '4', label: 'Emergency Call' },
]

function contactReducer(state, action) {
	switch (action.type) {
		case 'getAllEmergencyContacts': {
			const strEmergencyContacts = storage.getString('emergencyContacts');
			if (strEmergencyContacts) {
				const emergencyContacts = JSON.parse(strEmergencyContacts);
				return emergencyContacts;
			}
			return [...state]; // return the current state if there is no data in storage
		}
		case 'saveEmergencyContacts': {
			const strEmergencyContacts = JSON.stringify(state);
			storage.set('emergencyContacts', strEmergencyContacts);
			updateApplicationContext({ 'emergencyContacts': [...state] })
			return [...state]; // return the current state as there is no change in state
		}
		case 'removeContact': {
			const updatedContacts = state.filter(contact => contact.recordID !== action.payload.recordID);
			return [...updatedContacts]; // return the updated state
		}
		case 'addContact': {
			const updatedContacts = [...state, action.payload];
			return [...updatedContacts]; // return the updated state
		}
		default: {
			throw Error(`Unknown action: ${action.type}`);
		}
	}
}

const initialEmergencyContactConfig = []

export default StoreProvider;
