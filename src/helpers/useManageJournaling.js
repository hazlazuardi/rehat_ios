import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useJournal } from '../context/Context';
import { trigger } from 'react-native-haptic-feedback';
import { useCurrentJournal } from '../context/CurrentJournalProvider';
import { useJournaling, useJournalingConfig } from '../context/JournalingProvider';

function useManageJournaling() {

    const {
        journals,
        dispatchJournals,
        journalingConfig,
        dispatchJournalingConfig,
    } = useJournaling()

    const {
        currentJournal,
        setJournal,
        initialJournal
    } = useCurrentJournal()



    function setCurrentJournal(field, value) {
        setJournal(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    function saveCurrentJournal(currentJournal) {
        dispatchJournals({ type: 'saveJournal', payload: { ...currentJournal } });
        setJournal({ ...initialJournal })
        trigger('impactHeavy')
    }


    function getAllJournals() {
        dispatchJournals({ type: 'getAllJournals' });
    }

    function eraseAllJournals() {
        dispatchJournals({ type: 'eraseAllJournals' })
        trigger('impactHeavy')
    }

    function addJournalingConfig(newConfig, type) {
        // console.log('addConfig')
        dispatchJournalingConfig({
            type: 'updateJournalingConfig',
            payload: { newConfig, type }
        });
    }

    function clearAllJournalingConfigs() {
        dispatchJournalingConfig({ type: 'clearJournalingConfig' })
        trigger('impactHeavy')
    }


    return {
        currentJournal,
        journals,
        journalingConfig,
        setCurrentJournal,
        saveCurrentJournal,
        addJournalingConfig,
        getAllJournals,
        eraseAllJournals,
        clearAllJournalingConfigs,
    };
}

useManageJournaling.propTypes = {}

export default useManageJournaling
