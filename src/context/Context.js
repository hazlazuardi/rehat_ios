import React, { createContext, useContext, useReducer, useState } from "react";
import PropTypes from 'prop-types';
import { storage } from "../../App";

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
	 * @type {[object, function]}
	 * @property {object} journal - The current state of the journal.
	 * @property {function} dispatchJournal - A function to dispatch actions to modify the journal state.
	 */
	const [journal, dispatchJournal] = useReducer(journalReducer, initialJournal);

	const [journalingConfig, setJournalingConfig] = useState(initialJournalingConfig);

	return (
		<ThemeContext.Provider value={{}}>
			<JournalContext.Provider value={{ journal, dispatchJournal, journalingConfig, setJournalingConfig }}>
				{children}
			</JournalContext.Provider>
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
			const newJournalData = { ...state };

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
	withWho: '',
	where: '',
	thoughts: '',
	dateAdded: '',
};

const initialJournalingConfig = {
	journalThoughts: {
		people: [
			'Mom', 'Dad', 'Brother', 'Friends', 'Partner', 'Teacher', 'Boss'
		],
		locations: [
			'School', 'Home', 'Restaurant', 'Work', 'Park', 'Transport', 'Shop'
		]
	}
}

export default StoreProvider;
