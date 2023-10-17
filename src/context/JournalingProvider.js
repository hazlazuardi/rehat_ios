import React, { useReducer, createContext, useCallback, useContext, useState, useEffect } from 'react';
import { storage } from '../../App';


const JournalingContext = createContext(null)


// Provider Component
function JournalingProvider({ children }) {

    // Save and Set Journals
    const [journals, dispatchJournals] = useReducer(journalReducer, [])
    const [journalingConfig, dispatchJournalingConfig] = useReducer(journalingConfigReducer, initialJournalingConfig);

    const value = {
        journals,
        dispatchJournals,
        journalingConfig,
        dispatchJournalingConfig,
    }

    useEffect(() => {
        dispatchJournals({ type: 'getAllJournals' })
    }, [])


    return (
        <JournalingContext.Provider value={{ ...value }}>
            {children}
        </JournalingContext.Provider>
    );
};

export default JournalingProvider


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
        ],
        activities: [
            'Coding', 'Studying', 'Commuting', 'Chilling'
        ]
    }
}

// Journaling Config Reducer
function journalingConfigReducer(state, action) {
    switch (action.type) {
        case 'getJournalingConfig': {
            const strJournalConfig = storage.getString('journalingConfig');
            if (strJournalConfig) {
                const journalingConfig = JSON.parse(strJournalConfig);
                return journalingConfig;
            }
            // console.log('afterGetRed', state)
            return { ...state };  // return the current state if there is no data in storage
        }
        case 'updateJournalingConfig': {
            const updatedConfig = { ...state.journalThoughts };
            updatedConfig[action.payload.type] = [...updatedConfig[action.payload.type], action.payload.newConfig];

            // console.log('updatedConfig', updatedConfig)

            // Save journalingConfig to storage
            const newJournalingConfig = { ...state, ...action.payload };
            const strJournalingConfig = JSON.stringify(newJournalingConfig);
            storage.set('journalingConfig', strJournalingConfig);
            return { ...state, journalThoughts: updatedConfig };
        }
        case 'clearJournalingConfig': {
            // Clear journalingConfig from storage
            storage.delete('journalingConfig');
            // Return the initial state or some other default configuration
            return { ...initialJournalingConfig };
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
}


// Reducer to manage all journals from and to storage
function journalReducer(state, action) {
    switch (action.type) {
        case 'getAllJournals': {

            // Get from storage
            const strJournals = storage.getString('journals');

            // If any
            if (strJournals) {
                // Parse
                const journals = JSON.parse(strJournals);
                // console.log('from storage', journals);
                // Put in the state
                return [...journals]
            }
            // else empty
            return [...state]
        }
        case 'saveJournal': {
            const strJournals = storage.getString('journals');

            const newJournalData = {
                ...action.payload,
                id: state.dateAdded
            };

            let journals = [];

            if (strJournals) {
                journals = JSON.parse(strJournals);
                // console.log('from storage', journals);
            }

            journals.push(newJournalData);

            const newJournals = JSON.stringify(journals);
            storage.set('journals', newJournals);
            // console.log('saved journals', newJournals);

            return [...state, newJournalData];
        }
        case 'eraseAllJournals': {
            storage.delete('journals');
            return [];
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
}


// to make it accessible by others
export function useJournaling() {
    return useContext(JournalingContext);
}

