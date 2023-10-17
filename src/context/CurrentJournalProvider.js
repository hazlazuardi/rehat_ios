import React, { useReducer, createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types'

const initialJournal = {
    emotionCategory: '',
    emotions: [],
    photo: {},
    withWho: '',
    where: '',
    whatActivity: '',
    thoughts: '',
    dateAdded: '',
}

const CurrentJournalContext = createContext(null)

function CurrentJournalProvider({ children }) {

    const [currentJournal, setJournal] = useState({ ...initialJournal })

    const value = {
        currentJournal,
        setJournal,
        initialJournal,
    }

    return (
        <CurrentJournalContext.Provider value={{ ...value }}>
            {children}
        </CurrentJournalContext.Provider>
    )
}

CurrentJournalProvider.propTypes = {}

export default CurrentJournalProvider

// to make it accessible by others
export function useCurrentJournal() {
    return useContext(CurrentJournalContext)
}

