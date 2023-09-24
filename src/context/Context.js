import React, { createContext, useContext, useReducer, useState } from "react";
import PropTypes from 'prop-types';


const ThemeContext = createContext(null);
const JournalContext = createContext(null);

function StoreProvider({ children }) {


	const [journal, dispatchJournal] = useReducer(journalReducer, initialJournal);

	return (
		<ThemeContext.Provider value={{}} >
			<JournalContext.Provider value={{ journal, dispatchJournal }}>
				{children}
			</JournalContext.Provider>
		</ThemeContext.Provider>
	);
}

StoreProvider.propTypes = {
	children: PropTypes.element
};

export function useTheme() {
	return useContext(ThemeContext);
}

export function useJournal() {
	return useContext(JournalContext);
}

function journalReducer(state, action) {
	switch (action.type) {
		case 'setJournal': {
			return {
				...state,
				...action.payload
			}
		}
		case 'saveJournal': {
			return {
				...initialJournal
			}
		}
		default: {
			throw Error(`Unkown action: ${action.type}`);
		}
	}
}

const initialJournal = {
	emotionCategory: '',
	emotions: [],
	hr: 0,
	hrv: 0,
	withWho: '',
	where: '',
	thoughts: '',
	dateAdded: '',
}

export default StoreProvider;