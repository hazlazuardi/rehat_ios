import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {storage} from '../../App';
import {
  updateApplicationContext,
  watchEvents,
  sendMessage,
} from 'react-native-watch-connectivity';
import {Appearance} from 'react-native';
import {MonitoringProvider} from './MonitoringProvider';
import CurrentJournalProvider from './CurrentJournalProvider';
import JournalingProvider from './JournalingProvider';

const ThemeContext = createContext(null);
// const JournalContext = createContext(null);
const EmergencyContactsContext = createContext(null);
const RecoveryReferencesContext = createContext(null);
const GoalsContext = createContext(null);
const GoalsConfigContext = createContext(null);
const LearnContext = createContext(null);

function StoreProvider({children}) {
  // const [journal, dispatchJournal] = useReducer(journalReducer, initialJournal);
  const [emergencyContacts, dispatchEmergencyContacts] = useReducer(
    contactReducer,
    initialEmergencyContactConfig,
  );
  const [recoveryReferences, dispatchRecoveryReferences] = useReducer(
    recoveryReferencesReducer,
    initialRecoveryReferences,
  );
  const [goals, dispatchGoals] = useReducer(goalsReducer, initialGoals);
  const [goalsConfig, dispatchGoalsConfig] = useReducer(
    goalsConfigReducer,
    initialGoalsConfig,
  );
  const [learnedArticles, dispatchLearnedArticles] = useReducer(
    learnReducer,
    initialLearnedArticles,
  );

  // const { currentJournal } = useManageJournaling();

  useEffect(() => {
    Appearance.setColorScheme('dark');
    dispatchEmergencyContacts({type: 'getAllEmergencyContacts'});
    dispatchRecoveryReferences({type: 'getRecoveryReferences'});
    dispatchLearnedArticles({type: 'getAllLearnedArticles'});
    dispatchGoals({type: 'getAllGoals'});
    dispatchGoalsConfig({type: 'getGoalsConfig'});
  }, []);

  return (
    <ThemeContext.Provider value={{}}>
      <MonitoringProvider>
        <JournalingProvider>
          <CurrentJournalProvider>
            <RecoveryReferencesContext.Provider
              value={{recoveryReferences, dispatchRecoveryReferences}}>
              <EmergencyContactsContext.Provider
                value={{emergencyContacts, dispatchEmergencyContacts}}>
                <GoalsContext.Provider value={{goals, dispatchGoals}}>
                  <GoalsConfigContext.Provider
                    value={{goalsConfig, dispatchGoalsConfig}}>
                    <LearnContext.Provider
                      value={{learnedArticles, dispatchLearnedArticles}}>
                      {children}
                    </LearnContext.Provider>
                  </GoalsConfigContext.Provider>
                </GoalsContext.Provider>
              </EmergencyContactsContext.Provider>
            </RecoveryReferencesContext.Provider>
          </CurrentJournalProvider>
        </JournalingProvider>
      </MonitoringProvider>
    </ThemeContext.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export function useTheme() {
  return useContext(ThemeContext);
}

// export function useJournalContext() {
// 	return useContext(JournalContext);
// }

export function useEmergencyContact() {
  return useContext(EmergencyContactsContext);
}

export function useRecoveryReferences() {
  return useContext(RecoveryReferencesContext);
}

export function useGoals() {
  return useContext(GoalsContext);
}

export function useGoalsConfig() {
  return useContext(GoalsConfigContext);
}

export function useLearn() {
  return useContext(LearnContext);
}

function recoveryReferencesReducer(state, action) {
  switch (action.type) {
    case 'getRecoveryReferences': {
      const strRecoveryReferences = storage.getString('recoveryReferences');
      if (strRecoveryReferences) {
        const recoveryReferences = JSON.parse(strRecoveryReferences);
        return recoveryReferences;
      }
      return [...state]; // return the current state if there is no data in storage
    }
    case 'sortRecoveryReferences': {
      // console.log('sorted', action.payload)
      const strRecoveryReferences = JSON.stringify(action.payload);
      storage.set('recoveryReferences', strRecoveryReferences);
      // console.log('saved', action.payload)
      updateApplicationContext({recoveryReferences: [...action.payload]});
      return [...action.payload];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

const initialRecoveryReferences = [
  {key: '1', label: 'Guided Breathing'},
  {key: '2', label: 'Self-Affirmation'},
  {key: '3', label: 'Muscle Relaxation'},
  {key: '4', label: 'Closed Eyes Visualization'},
  {key: '5', label: '5-4-3-2-1'},
  {key: '6', label: 'Emergency Call'},
];

function contactReducer(state, action) {
  switch (action.type) {
    case 'getAllEmergencyContacts': {
      const strEmergencyContacts = storage.getString('emergencyContacts');
      if (strEmergencyContacts) {
        const emergencyContacts = JSON.parse(strEmergencyContacts);
        return emergencyContacts;
      }
      return [...state]; // return the current state if there is no data in storage
    }
    case 'saveEmergencyContacts': {
      const strEmergencyContacts = JSON.stringify(state);
      storage.set('emergencyContacts', strEmergencyContacts);
      updateApplicationContext({emergencyContacts: [...state]});
      return [...state]; // return the current state as there is no change in state
    }
    case 'removeContact': {
      const updatedContacts = state.filter(
        contact => contact.recordID !== action.payload.recordID,
      );
      return [...updatedContacts]; // return the updated state
    }
    case 'addContact': {
      const updatedContacts = [...state, action.payload];
      return [...updatedContacts]; // return the updated state
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

const initialEmergencyContactConfig = [];

function goalsReducer(state, action) {
  switch (action.type) {
    case 'getAllGoals': {
      const strAllGoals = storage.getString('goals');
      if (strAllGoals) {
        const allGoals = JSON.parse(strAllGoals);
        return allGoals;
      }
      return [...state];
    }
    case 'setGoal': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'saveJournal': {
      const strGoals = storage.getString('goals');

      const newGoalsData = {
        ...state,
        id: state.dateAdded,
      };

      let goals = [];

      if (strGoals) {
        goals = JSON.parse(strGoals);
        // console.log('from storage', goals);
      }

      goals.push(newGoalsData);

      const newGoals = JSON.stringify(goals);
      storage.set('goals', newGoals);
      // console.log('saved goals', newGoals);

      return {...initialGoals};
    }
    case 'addGoal': {
      const updatedGoals = [...state, action.payload];
      storage.set('goals', JSON.stringify(updatedGoals)); // save to storage here
      return [...updatedGoals];
    }
    case 'removeGoal': {
      const updatedGoals = state.filter(goal => goal.id !== action.payload.id);
      storage.set('goals', JSON.stringify(updatedGoals)); // consider saving to storage here too
      return [...updatedGoals];
    }
    case 'toggleGoalCompletion': {
      const updatedGoals = state.map(goal =>
        goal.id === action.payload.id
          ? {...goal, isCompleted: !goal.isCompleted}
          : goal,
      );
      storage.set('goals', JSON.stringify(updatedGoals)); // consider saving to storage here too
      return [...updatedGoals];
    }
    case 'clearAllGoals': {
      storage.set('goals', JSON.stringify(initialGoals));
      return initialGoals;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

const initialGoals = [
  // Example
  // {
  // 	id: 1,
  // 	period: "8 Months",
  // 	action: "Practice Journaling",
  // 	duration: "10 Minutes",
  // 	method: "Journaling",
  // 	outcome: "Reduce panic attack frequency"
  // }
];

function goalsConfigReducer(state, action) {
  switch (action.type) {
    case 'getGoalsConfig': {
      const strGoalsConfig = storage.getString('goalsConfig');
      if (strGoalsConfig) {
        const goalsConfig = JSON.parse(strGoalsConfig);
        return goalsConfig;
      }
      return {...state}; // return the current state if there is no data in storage
    }

    case 'addGoalsConfig': {
      const updatedConfig = [
        ...state[action.payload.type],
        action.payload.value,
      ];

      console.log('upconfgol', updatedConfig);

      // Save goalsConfig to storage
      const newGoalsConfig = {...state, [action.payload.type]: updatedConfig};
      const strGoalsConfig = JSON.stringify(newGoalsConfig);
      storage.set('goalsConfig', strGoalsConfig);
      return newGoalsConfig;
    }

    case 'removeGoalsConfig': {
      const updatedConfig = [...state[action.payload.type]];
      const index = updatedConfig.indexOf(action.payload.value);
      if (index > -1) {
        updatedConfig.splice(index, 1);
      }

      // Save goalsConfig to storage
      const newGoalsConfig = {...state, [action.payload.type]: updatedConfig};
      const strGoalsConfig = JSON.stringify(newGoalsConfig);
      storage.set('goalsConfig', strGoalsConfig);
      return newGoalsConfig;
    }

    case 'clearGoalsConfig': {
      // Clear goalsConfig from storage
      storage.delete('goalsConfig');
      // Return the initial state or some other default configuration
      return {...initialGoalsConfig};
    }

    default:
      return state;
  }
}

const initialGoalsConfig = {
  periods: ['8 Months', '1 Week'],
  durations: ['10 Minutes', '2x a Day'],
  methods: [
    'Journaling',
    'Thoughts Reframing',
    'Guided Breathing',
    '5-4-3-2-1',
    'Connecting with My Body',
    'Muscle Relaxation',
  ],
};

function learnReducer(state, action) {
  switch (action.type) {
    case 'getAllLearnedArticles': {
      const strAllLearnedArticles = storage.getString('learnedArticles');
      if (strAllLearnedArticles) {
        const allLearnedArticles = JSON.parse(strAllLearnedArticles);
        return allLearnedArticles;
      }
      return [...state];
    }
    case 'addLearnedArticle': {
      const updatedLearnedArticles = [...state, action.payload];
      storage.set('learnedArticles', JSON.stringify(updatedLearnedArticles)); // save to storage here
      return [...updatedLearnedArticles];
    }
    case 'clearAllLearnedArticles': {
      storage.set('learnedArticles', JSON.stringify(initialLearnedArticles));
      return initialLearnedArticles;
    }
    case 'addNewCategoryAndArticle': {
      console.log('action.payloads', action.payload);

      const existingCategoryIndex = state.findIndex(
        cat => cat.catId === action.payload.catId,
      );

      if (existingCategoryIndex !== -1) {
        // Category exists
        const existingContent = state[existingCategoryIndex].content.find(
          contentItem => contentItem.id === action.payload.content[0].id,
        );

        console.log(
          'Existing content in the category:',
          state[existingCategoryIndex].content,
        );
        console.log('Searched content ID:', action.payload.content[0].id);
        console.log('Result of find:', existingContent);

        if (!existingContent) {
          // Content with the given id doesn't exist, so add it
          console.log('Adding new content to existing category');
          state[existingCategoryIndex].content.push(...action.payload.content); // Flattening the content array
          storage.set('learnedArticles', JSON.stringify(state));
          return [...state];
        } else {
          console.log('Content with given id already exists in category');
        }
      } else {
        // Category doesn't exist, so add the new category and content
        console.log('Adding new category and content');
        const newCategory = {
          catId: action.payload.catId,
          content: [...action.payload.content], // Flattening the content array
        };
        const updatedState = [...state, newCategory];
        storage.set('learnedArticles', JSON.stringify(updatedState));
        return updatedState;
      }

      // Default return
      console.log('Returning state without any changes');
      return state;
    }

    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

const initialLearnedArticles = [
  // Example
  // {
  //     "id": "1",
  //     "title": "The Importance of Self Well-Being",
  //     "desc": "Exploring the significance and benefits of prioritizing self well-being.",
  //     "content": {
  //       "sections": [
  //         {
  //           "header": "Understanding Self Well-Being",
  //           "text": "Self well-being encompasses the holistic health of an individual, which includes physical, emotional, psychological, and social dimensions. Prioritizing self well-being ensures that individuals are functioning at their best capacity, both mentally and physically.",
  //           "imageUrl": "https://yourwebsite.com/path/to/image1.jpg"
  //         },
  //         {
  //           "header": "Mental and Emotional Benefits",
  //           "text": "Cultivating mental and emotional well-being can lead to improved mood, reduced feelings of anxiety and stress, and heightened resilience against challenges. Activities such as meditation, journaling, and therapy can support these aspects of well-being.",
  //           "imageUrl": "https://yourwebsite.com/path/to/image2.jpg"
  //         },
  //         {
  //           "header": "Physical and Social Aspects",
  //           "text": "Physical well-being is nurtured through regular exercise, a balanced diet, and adequate rest. Social well-being involves building strong relationships and fostering positive interactions with others. Both play crucial roles in an individual's overall sense of health and satisfaction.",
  //           "imageUrl": "https://yourwebsite.com/path/to/image3.jpg",
  //           "end":true
  //         }
  //       ]
  //     }
  //   },
];

export default StoreProvider;
