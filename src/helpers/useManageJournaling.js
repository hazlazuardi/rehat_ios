import React from 'react'
import PropTypes from 'prop-types'
import { useJournalingConfig } from '../context/Context';

function useManageJournaling() {
    const { journalingConfig, dispatchJournalingConfig } = useJournalingConfig();

    function addGoal(goalText) {
        dispatchJournalingConfig({ type: 'addGoal', payload: { id: Date.now(), text: goalText, isCompleted: false } });
    }

    function removeGoal(goalId) {
        dispatchJournalingConfig({ type: 'removeGoal', payload: { id: goalId } });
    }

    function toggleGoalCompletion(goalId) {
        dispatchJournalingConfig({ type: 'toggleGoalCompletion', payload: { id: goalId } });
    }

    function clearAllGoals() {
        dispatchJournalingConfig({ type: 'clearAllGoals' });
    }

    return { goals, addGoal, removeGoal, toggleGoalCompletion, clearAllGoals };
}

useManageJournaling.propTypes = {}

export default useManageJournaling
