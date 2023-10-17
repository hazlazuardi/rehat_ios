import React from 'react'
import PropTypes from 'prop-types'
import { useJournal, useJournalingConfig } from '../context/Context';
import { trigger } from 'react-native-haptic-feedback';

function useManageJournaling() {
    const { journalingConfig, dispatchJournalingConfig } = useJournalingConfig();
    const { journal, dispatchJournal } = useJournal()


    function setCurrentJournal(field, value) {
        dispatchJournal({
            type: 'setJournal',
            payload: { [field]: value }
        });
    }

    function addJournalingConfig(newConfig, type) {
        dispatchJournalingConfig({
            type: 'updateJournalingConfig',
            payload: { newConfig, type }
        });
    }

    function eraseAllJournals() {
        dispatchJournal({ type: 'eraseAllJournals' })
        trigger('impactHeavy')
    }

    function removeJournalingConfig(goalId) {
        dispatchJournalingConfig({ type: 'removeJournal', payload: { id: goalId } });
    }

    function toggleJournalCompletion(goalId) {
        dispatchJournalingConfig({ type: 'toggleJournalCompletion', payload: { id: goalId } });
    }

    function clearAllJournalingConfigs() {
        dispatchJournalingConfig({ type: 'clearJournalingConfig' })
        trigger('impactHeavy')
    }

    return {
        setCurrentJournal,
        addJournalingConfig,
        eraseAllJournals,
        clearAllJournalingConfigs,
    };
}

useManageJournaling.propTypes = {}

export default useManageJournaling
