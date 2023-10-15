import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import PropTypes from 'prop-types';
import { storage } from "../../App";
import { formatDate } from "../helpers/useDateFormatter";
import { updateApplicationContext, watchEvents, sendMessage } from 'react-native-watch-connectivity';
import useEmergencyContacts from "../helpers/useEmergencyContacts";
import { Appearance } from "react-native";


/**
 * @type {React.Context} Context for managing theme-related data.
 */
const ThemeContext = createContext(null);

/**
 * @type {React.Context} Context for managing journal-related data.
 */
const JournalContext = createContext(null);

/**
 * @type {React.Context} Context for managing journaling configuration data.
 */
const JournalingConfigContext = createContext(null);

/**
 * @type {React.Context} Context for managing emergency contacts data.
 */
const EmergencyContactsContext = createContext(null);

/**
 * @type {React.Context} Context for managing recovery references data.
 */
const RecoveryReferencesContext = createContext(null);

const GoalsContext = createContext(null)

const GoalsConfigContext = createContext(null)


const LearnContext = createContext(null)

/**
 * Provider component that wraps the application and provides
 * context for managing theme, journal, and other related data.
 *
 * @component
 * @param {object} props - The component's properties.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The rendered StoreProvider component.
 */
function StoreProvider({ children }) {

	/**
	 * UseReducer hook to manage journal data and dispatch actions.
	 *
	 * @type {[object, Function]}
	 * @property {object} journal - The current state of the journal.
	 * @property {React.DispatchWithoutAction} dispatchJournal - A function to dispatch actions to modify the journal state.
	 */
	const [journal, dispatchJournal] = useReducer(journalReducer, initialJournal);

	const [journalingConfig, dispatchJournalingConfig] = useReducer(journalingConfigReducer, initialJournalingConfig);

	const [emergencyContacts, dispatchEmergencyContacts] = useReducer(contactReducer, initialEmergencyContactConfig)

	const [recoveryReferences, dispatchRecoveryReferences] = useReducer(recoveryReferencesReducer, initialRecoveryReferences)

	const [goals, dispatchGoals] = useReducer(goalsReducer, initialGoals)

	const [goalsConfig, dispatchGoalsConfig] = useReducer(goalsConfigReducer, initialGoalsConfig)

	const [learnedArticles, dispatchLearnedArticles] = useReducer(learnReducer, initialLearnedArticles)

	// Retrieve emergency contacts from the storage
	useEffect(() => {
		Appearance.setColorScheme('dark')
		dispatchEmergencyContacts({ type: 'getAllEmergencyContacts' });
		dispatchRecoveryReferences({ type: 'getRecoveryReferences' });
		dispatchJournalingConfig({ type: 'getJournalingConfig' });
		dispatchLearnedArticles({ type: 'getAllLearnedArticles' });
		dispatchGoals({ type: 'getAllGoals' });
		dispatchGoalsConfig({ type: 'getGoalsConfig' });
	}, []);

	// Update ApplicationContext for the Watch App
	// useEffect(() => {
	// 	console.log(emergencyContacts)
	// 	if (emergencyContacts.length !== 0) {
	// 		updateApplicationContext({ 'emergencyContacts': [...emergencyContacts] })
	// 	}
	// 	const strRecoveryReferences = storage.getString('recoveryReferences');
	// 	if (strRecoveryReferences) {
	// 		const parsedRecoveryReferences = JSON.parse(strRecoveryReferences);
	// 		updateApplicationContext({ 'recoveryReferences': [...parsedRecoveryReferences] })
	// 	}
	// 	console.log('updateContext')
	// }, [emergencyContacts.length, recoveryReferences.length])

	return (
		<ThemeContext.Provider value={{}}>
			<RecoveryReferencesContext.Provider value={{ recoveryReferences, dispatchRecoveryReferences }}>
				<EmergencyContactsContext.Provider value={{ emergencyContacts, dispatchEmergencyContacts }}>
					<JournalContext.Provider value={{ journal, dispatchJournal }}>
						<JournalingConfigContext.Provider value={{ journalingConfig, dispatchJournalingConfig }}>
							<GoalsContext.Provider value={{ goals, dispatchGoals }}>
								<GoalsConfigContext.Provider value={{ goalsConfig, dispatchGoalsConfig }}>
									<LearnContext.Provider value={{ learnedArticles, dispatchLearnedArticles }}>
										{children}
									</LearnContext.Provider>
								</GoalsConfigContext.Provider>
							</GoalsContext.Provider>
						</JournalingConfigContext.Provider>
					</JournalContext.Provider>
				</EmergencyContactsContext.Provider>
			</RecoveryReferencesContext.Provider>
		</ThemeContext.Provider>
	);
}

StoreProvider.propTypes = {
	children: PropTypes.node
};

/**
 * Custom hook for accessing theme-related data from the context.
 *
 * @returns {object} Theme-related data from the context.
 */
export function useTheme() {
	return useContext(ThemeContext);
}

/**
 * Custom hook for accessing journal-related data and dispatching actions.
 *
 * @returns {object} Journal-related data and dispatch function from the context.
 */
export function useJournal() {
	return useContext(JournalContext);
}

/**
 * Custom hook for accessing journaling configuration data and dispatching actions.
 *
 * @returns {object} Journaling configuration data and dispatch function from the context.
 */
export function useJournalingConfig() {
	return useContext(JournalingConfigContext);
}

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


/**
 * Reducer function for managing journal-related actions.
 *
 * @param {object} state - The current state of the journal.
 * @param {object} action - The action to perform on the journal state.
 * @returns {object} The updated journal state.
 */
function journalReducer(state, action) {
	switch (action.type) {
		case 'getAllJournals': {
			const strJournals = storage.getString('journals');

			if (strJournals) {
				const journals = JSON.parse(strJournals);
				console.log('from storage', journals);
				// return { ...journals }
			}

			return { ...initialJournal }
		}
		case 'setJournal': {
			return {
				...state,
				...action.payload
			}
		}
		case 'saveJournal': {
			const strJournals = storage.getString('journals');

			const newJournalData = {
				...state,
				id: state.dateAdded
			};

			let journals = [];

			if (strJournals) {
				journals = JSON.parse(strJournals);
				console.log('from storage', journals);
			}

			journals.push(newJournalData);

			const newJournals = JSON.stringify(journals);
			storage.set('journals', newJournals);
			console.log('saved journals', newJournals);

			return { ...initialJournal };
		}
		case 'eraseAllJournals': {
			storage.delete('journals');
			return { ...initialJournal };
		}
		default: {
			throw Error(`Unknown action: ${action.type}`);
		}
	}
}

/**
 * The initial state for journal data.
 *
 * @type {object}
 */
const initialJournal = {
	emotionCategory: '',
	emotions: [],
	hr: 0,
	hrv: 0,
	photo: {},
	withWho: '',
	where: '',
	whatActivity: '',
	thoughts: '',
	dateAdded: '',
};

/**
 * Reducer function for managing journalingConfig-related actions.
 *
 * @param {object} state - The current state of the journalingConfig.
 * @param {object} action - The action to perform on the journalingConfig state.
 * @returns {object} The updated journalingConfig state.
 */
function journalingConfigReducer(state, action) {
	switch (action.type) {
		case 'getJournalingConfig': {
			const strJournalConfig = storage.getString('journalingConfig');
			if (strJournalConfig) {
				const journalingConfig = JSON.parse(strJournalConfig);
				return journalingConfig;
			}
			return { ...state };  // return the current state if there is no data in storage
		}
		case 'updateJournalingConfig': {
			const updatedConfig = { ...state.journalThoughts };
			updatedConfig[action.payload.type] = [...updatedConfig[action.payload.type], action.payload.newConfig];

			// Save journalingConfig to storage
			const newJournalingConfig = { ...state, ...action.payload };
			const strJournalingConfig = JSON.stringify(newJournalingConfig);
			storage.set('journalingConfig', strJournalingConfig);
			return { ...state, journalThoughts: updatedConfig };
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


/**
 * Initial state for journaling configuration data.
 *
 * @type {object}
 */
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
			console.log('sorted', action.payload)
			const strRecoveryReferences = JSON.stringify(action.payload);
			storage.set('recoveryReferences', strRecoveryReferences);
			console.log('saved', action.payload)
			updateApplicationContext({ 'recoveryReferences': [...action.payload] })
			return [
				...action.payload
			]
		}
		default: {
			throw Error(`Unknown action: ${action.type}`);
		}
	}
}


const initialRecoveryReferences = [
	{ key: '1', label: 'Guided Breathing' },
	{ key: '2', label: 'Grounding Technique' },
	{ key: '3', label: 'Self-Affirmation' },
	{ key: '4', label: 'Emergency Call' },
]

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
			updateApplicationContext({ 'emergencyContacts': [...state] })
			return [...state]; // return the current state as there is no change in state
		}
		case 'removeContact': {
			const updatedContacts = state.filter(contact => contact.recordID !== action.payload.recordID);
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

const initialEmergencyContactConfig = []


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
				...action.payload
			}
		}
		case 'saveJournal': {
			const strGoals = storage.getString('goals');

			const newGoalsData = {
				...state,
				id: state.dateAdded
			};

			let goals = [];

			if (strGoals) {
				goals = JSON.parse(strGoals);
				console.log('from storage', goals);
			}

			goals.push(newGoalsData);

			const newGoals = JSON.stringify(goals);
			storage.set('goals', newGoals);
			console.log('saved goals', newGoals);

			return { ...initialGoals };
		}
		case 'addGoal': {
			const updatedGoals = [
				...state,
				action.payload
			]
			storage.set('goals', JSON.stringify(updatedGoals));  // save to storage here
			return [...updatedGoals];
		}
		case 'removeGoal': {
			const updatedGoals = state.filter(goal => goal.id !== action.payload.id);
			storage.set('goals', JSON.stringify(updatedGoals));  // consider saving to storage here too
			return [...updatedGoals];
		}
		case 'toggleGoalCompletion': {
			const updatedGoals = state.map(goal =>
				goal.id === action.payload.id ? { ...goal, isCompleted: !goal.isCompleted } : goal
			);
			storage.set('goals', JSON.stringify(updatedGoals));  // consider saving to storage here too
			return [...updatedGoals];
		}
		case 'clearAllGoals': {
			storage.set('goals', JSON.stringify(initialGoals))
			return initialGoals;
		}
		default: {
			throw Error(`Unknown action: ${action.type}`);
		}
	}
}

const initialGoals = [
	// Example
	// { id: 1, text: "Learn React Native", isCompleted: false }
	{
		id: 1,
		period: "8 Months",
		action: "Practice Journaling",
		duration: "10 Minutes",
		method: "Journaling",
		outcome: "Reduce panic attack frequency"
	}
];



function goalsConfigReducer(state, action) {
	switch (action.type) {

		case 'getGoalsConfig': {
			const strGoalsConfig = storage.getString('goalsConfig');
			if (strGoalsConfig) {
				const goalsConfig = JSON.parse(strGoalsConfig);
				return goalsConfig;
			}
			return { ...state };  // return the current state if there is no data in storage
		}

		case 'addGoalsConfig': {
			const updatedConfig = [...state[action.payload.type], action.payload.value];

			// Save goalsConfig to storage
			const newGoalsConfig = { ...state, [action.payload.type]: updatedConfig };
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
			const newGoalsConfig = { ...state, [action.payload.type]: updatedConfig };
			const strGoalsConfig = JSON.stringify(newGoalsConfig);
			storage.set('goalsConfig', strGoalsConfig);
			return newGoalsConfig;
		}

		case 'clearGoalsConfig': {
			// Clear goalsConfig from storage
			storage.delete('goalsConfig');
			// Return the initial state or some other default configuration
			return { ...initialGoalsConfig };
		}

		default:
			return state;
	}
}



const initialGoalsConfig = {
	periods: [
		"8 Months",
		"1 Week"
	],
	durations: [
		"10 Minutes",
		"2x a Day",

	],
	methods: [
		"Journaling",
		"Thoughts Reframing",
		"Guided Breathing",
		"5-4-3-2-1",
		"Connecting with My Body",
		"Muscle Relaxation",
	],
}


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
			const updatedLearnedArticles = [
				...state,
				action.payload
			]
			storage.set('learnedArticles', JSON.stringify(updatedLearnedArticles));  // save to storage here
			return [...updatedLearnedArticles];
		}
		case 'clearAllLearnedArticles': {
			storage.set('learnedArticles', JSON.stringify(initialLearnedArticles))
			return initialLearnedArticles;
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
