import React, { createContext, useContext, useReducer, useState } from "react";
import PropTypes from 'prop-types';
import { storage } from "../../App";
import { formatDate } from "../helpers/useDateFormatter";

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

	return (
		<ThemeContext.Provider value={{}}>
			<EmergencyContactsContext.Provider value={{ emergencyContacts, dispatchEmergencyContacts }}>
				<JournalContext.Provider value={{ journal, dispatchJournal, journalingConfig, setJournalingConfig }}>
					{children}
				</JournalContext.Provider>
			</EmergencyContactsContext.Provider>
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

function contactReducer(state, action) {
    switch (action.type) {
		case 'getAllEmergencyContacts': {
            const strEmergencyContacts = storage.getString('emergencyContacts');
            if (strEmergencyContacts) {
                const emergencyContacts = JSON.parse(strEmergencyContacts);
                return emergencyContacts;
            }
            return state; // return the current state if there is no data in storage
        }
        case 'saveEmergencyContacts': {
            const strEmergencyContacts = JSON.stringify(state);
            storage.set('emergencyContacts', strEmergencyContacts);
            console.log('saved emergencyContacts', strEmergencyContacts);
            return state; // return the current state as there is no change in state
        }
        case 'removeContact': {
            const updatedContacts = state.filter(contact => contact.recordID !== action.payload.recordID);
            return updatedContacts; // return the updated state
        }
        case 'addContact': {
            const updatedContacts = [...state, action.payload];
            return updatedContacts; // return the updated state
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
}

const initialEmergencyContactConfig = []

export default StoreProvider;
