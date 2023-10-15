import React from 'react'
import PropTypes from 'prop-types'
import { useGoals } from '../context/Context';

function useManageGoals() {
    const { goals, dispatchGoals } = useGoals();

    function addGoal(goal) {
        console.log('goal', goal)
        dispatchGoals({
            type: 'addGoal',
            payload: {
                id: Date.now(),
                isCompleted: false,
                ...goal
            }
        });
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
