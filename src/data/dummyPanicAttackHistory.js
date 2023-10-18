import { getMonday } from "../helpers/helpers";

export const initData = Array.from({ length: 1 * 7 }, (_, index) => ({
    date: new Date(2023, 9, 17 + index).toISOString(),
    value: Math.floor(Math.random() * 10)
}));

export function generateDummyPA() {
    return Array.from({ length: 12 * 7 }, (_, index) => ({
        date: new Date(2023, 9, 1 + index).toISOString(),
        value: Math.floor(Math.random() * 10)
    }));
}

export function generateNewEntry() {
    return {
        date: Date.now(),
        value: Math.floor(Math.random())
    }
}


// data from watch:
// const newEntry = {
//     date: Date.now(),
//     value: Math.floor(Math.random())
// }

// add it to the list of entries

// also, sum it with today's total panic attack
// use dateOfMonday of that week as the id so that it's easier to add new entry

export function calculateWeekNumber(date) {
    const tempDate = new Date(date.valueOf());
    const dayNumber = (tempDate.getDay() + 6) % 7;
    tempDate.setDate(tempDate.getDate() - dayNumber + 3);
    const firstThursday = tempDate.valueOf();
    tempDate.setMonth(0, 1);
    if (tempDate.getDay() !== 4) {
        tempDate.setMonth(0, 1 + ((4 - tempDate.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tempDate) / 604800000);  // 604800000 = 7 * 24 * 60 * 60 * 1000
}

export function calculateDayNumber(date) {
    return (new Date(date).getDay() + 6) % 7;  // Monday = 0, Tuesday = 1, ..., Sunday = 6
}


// const structureEpoch = {
//     "345600": {
//         "345600": {
//             date: "0",
//             value: 5
//         },
//         "432000": {
//             date: "432000",
//             value: 0
//         },
//         "518400": {
//             date: "518400",
//             value: 3
//         }
//         .
//         .
//         .

//     }
//     .
//     .
//     .
//     .
// }



export function generateDummyDataForPreviousWeeks(numWeeks) {
    // Get the current date and time
    const today = new Date();

    // Calculate the epoch timestamp for the start date, which is `numWeeks` weeks before today
    const startEpoch = today.getTime() - (numWeeks * 7 * 24 * 3600 * 1000);

    // Initialize an empty object to hold the dummy data
    const dummyData = {};

    // Loop through each day from the start date to today
    for (let epoch = startEpoch; epoch <= today.getTime(); epoch += 24 * 3600 * 1000) {
        // Calculate the week number and day number for the current epoch
        const currentDayEpoch = Math.floor(epoch / (24 * 3600 * 1000)) * 24 * 3600 * 1000;  // Round down to the nearest day

        // Get the epoch for the start of the current week
        const weekStartEpoch = getMonday(currentDayEpoch).getTime();

        // Ensure the week and day objects exist in the dummy data
        if (!dummyData[weekStartEpoch]) dummyData[weekStartEpoch] = {};
        if (!dummyData[weekStartEpoch][currentDayEpoch]) dummyData[weekStartEpoch][currentDayEpoch] = { date: currentDayEpoch, value: 0 };

        // Generate a random value for the current day
        // dummyData[weekStartEpoch][currentDayEpoch].value = Math.floor(Math.random() * 10);
        dummyData[weekStartEpoch][currentDayEpoch].value = 0
    }

    return dummyData;
}

// Usage:
const numWeeks = 4;  // for example, to generate dummy data for the previous 4 weeks
const dummyData = generateDummyDataForPreviousWeeks(numWeeks);

const result = {
    "1697378400000": {
        "1697378400000": {
            "date": "1697378400000",
            "value": 5
        },
        "1697464800000":
        {
            "date": "1697464800000",
            "value": 7
        }
    }
}

1694613600000

1694613600000


export function initializeCurrentWeek(data) {
    const today = new Date();
    const standardTimestamp = Math.floor(today.getTime() / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
    const dayOfWeek = today.getDay();
    const adjustment = (dayOfWeek + 6) % 7;
    const weekStartTimestamp = standardTimestamp - adjustment * 24 * 3600 * 1000;

    const newData = { ...data };

    if (!newData[weekStartTimestamp]) {
        newData[weekStartTimestamp] = {};
        for (let i = 0; i < 7; i++) {
            const dayTimestamp = weekStartTimestamp + i * 24 * 3600 * 1000;
            newData[weekStartTimestamp][dayTimestamp] = { date: dayTimestamp, value: 0 };
        }
    }

    return newData;
}
