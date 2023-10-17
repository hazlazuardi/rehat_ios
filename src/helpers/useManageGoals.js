import React from 'react'
import PropTypes from 'prop-types'
import { useGoals, useGoalsConfig } from '../context/Context';
import { trigger } from 'react-native-haptic-feedback';

function useManageGoals() {
    const { goals, dispatchGoals } = useGoals();
    const { dispatchGoalsConfig } = useGoalsConfig()


    function addGoal(goal) {
        // console.log('goal', goal)
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
        trigger('impactHeavy')
    }

    function clearAllGoalConfigs() {
        dispatchGoalsConfig({ type: 'clearGoalsConfig' })
        trigger('impactHeavy')
    }

    return {
        goals,
        addGoal,
        removeGoal,
        toggleGoalCompletion,
        clearAllGoals,
        clearAllGoalConfigs
    };
}

useManageGoals.propTypes = {}

export default useManageGoals
