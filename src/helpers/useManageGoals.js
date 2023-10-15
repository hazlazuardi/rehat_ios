import React from 'react'
import PropTypes from 'prop-types'
import { useGoals } from '../context/Context';

function useManageGoals() {
    const { goals, dispatchGoals } = useGoals();

    function addGoal(goalText) {
        dispatchGoals({ type: 'addGoal', payload: { id: Date.now(), text: goalText, isCompleted: false } });
    }

    function removeGoal(goalId) {
        dispatchGoals({ type: 'removeGoal', payload: { id: goalId } });
    }

    function toggleGoalCompletion(goalId) {
        dispatchGoals({ type: 'toggleGoalCompletion', payload: { id: goalId } });
    }

    function clearAllGoals() {
        dispatchGoals({ type: 'clearAllGoals' });
    }

    return { goals, addGoal, removeGoal, toggleGoalCompletion, clearAllGoals };
}

useManageGoals.propTypes = {}

export default useManageGoals
