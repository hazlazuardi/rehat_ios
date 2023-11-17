import React, { useReducer, createContext, useCallback, useContext, useState, useEffect } from 'react';
import { storage } from '../../App';


const ThoughtsContext = createContext(null)


// Provider Component
function ThoughtsProvider({ children }) {

    // Save and Set Journals
    const [thoughts, dispatchThoughts] = useReducer(thoughtsReducer, [])
    const [journalingConfig, dispatchJournalingConfig] = useReducer(journalingConfigReducer, initialJournalingConfig);

    const value = {
        thoughts,
        dispatchThoughts,
        journalingConfig,
        dispatchJournalingConfig,
    }

    useEffect(() => {
        dispatchThoughts({ type: 'getAllThoughts' })
        // dispatchJournalingConfig({ type: 'getJournalingConfig' })
    }, [])


    return (
        <ThoughtsContext.Provider value={{ ...value }}>
            {children}
        </ThoughtsContext.Provider>
    );
};

export default ThoughtsProvider


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

            // Save journalingConfig to storage
            const newJournalingConfig = { ...state, journalThoughts: updatedConfig };  // Adjusted this line
            const strJournalingConfig = JSON.stringify(newJournalingConfig);
            console.log('toSetConfig', newJournalingConfig)
            storage.set('journalingConfig', strJournalingConfig);
            return newJournalingConfig;  // Adjusted this line to return the updated state
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
function thoughtsReducer(state, action) {
    switch (action.type) {
        case 'getAllThoughts': {

            // Get from storage
            const strJournals = storage.getString('cognitiveData');

            // If any
            if (strJournals) {
                // Parse
                const journals = JSON.parse(strJournals);
                console.log('from storage', journals);
                // Put in the state
                return [...journals]
            }
            // else empty
            return [...state]
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
}


// to make it accessible by others
export function useReframing() {
    return useContext(ThoughtsContext);
}

