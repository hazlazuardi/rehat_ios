import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useJournal } from '../context/Context';
import { trigger } from 'react-native-haptic-feedback';
import { useCurrentJournal } from '../context/CurrentJournalProvider';
import { useReframing, useJournalingConfig } from '../context/ThoughtsProvider';

function useManageThoughts() {

    const {
        thoughts,
        dispatchThoughts,
        journalingConfig,
        dispatchJournalingConfig,
    } = useReframing()

    // const {
    //     currentJournal,
    //     setJournal,
    //     initialJournal
    // } = useCurrentJournal()



    // function setCurrentJournal(field, value) {
    //     setJournal(prev => {
    //         return {
    //             ...prev,
    //             [field]: value
    //         }
    //     })
    // }

    // function saveCurrentJournal(currentJournal) {
    //     dispatchThoughts({ type: 'saveJournal', payload: { ...currentJournal } });
    //     setJournal({ ...initialJournal })
    //     trigger('impactHeavy')
    // }


    function getAllThoughts() {
        dispatchThoughts({ type: 'getAllThoughts' });
    }

    function eraseAllJournals() {
        dispatchThoughts({ type: 'eraseAllJournals' })
        trigger('impactHeavy')
    }



    return {
        thoughts,
        getAllThoughts,
        eraseAllJournals,
    };
}

useManageThoughts.propTypes = {}

export default useManageThoughts
