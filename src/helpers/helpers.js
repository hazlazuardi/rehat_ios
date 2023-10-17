export function convertToCamelCase(inputString) {
    return inputString
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
}

export function getContrastColor(hexColor) {
    // Convert hex color to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose white or black text color based on luminance
    return luminance > 0.5 ? 'black' : 'white';
}

export function formatDate(timestamp) {
    const date = new Date(timestamp);

    const dateOptions = {
        day: '2-digit',      // Two-digit day (e.g., 01)
        weekday: 'long',     // Full day name (e.g., Monday)
        month: 'long',      // Full month name (e.g., September)
        year: 'numeric',    // Full year (e.g., 2023)
    };

    const timeOptions = {
        hour: '2-digit',    // Two-digit hour (e.g., 08)
        minute: '2-digit',  // Two-digit minute (e.g., 55)
        hour12: true        // Use 12-hour clock format (e.g., am/pm)
    }

    const dateNumOptions = {
        day: '2-digit'
    }

    const dateString = date.toLocaleDateString('en-US', dateOptions);
    const timeString = date.toLocaleTimeString('en-US', timeOptions);
    const dateNumString = date.toLocaleTimeString('en-US', dateNumOptions);

    return { dateString, timeString, dateNumString };
}

export function toAssetCase(text) {
    return text.toLowerCase().replace(' ', '_')
}


export function calculateInitialScrollOffset(groupedData, weekIntervalWidth) {
    const today = new Date();
    const totalWeeks = groupedData.length;
    for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
        const weekData = groupedData[weekIndex];
        for (let dayIndex = 0; dayIndex < weekData.length; dayIndex++) {
            const dayDate = new Date(weekData[dayIndex].date);
            if (
                dayDate.getFullYear() === today.getFullYear() &&
                dayDate.getMonth() === today.getMonth() &&
                dayDate.getDate() === today.getDate()
            ) {
                return weekIndex * weekIntervalWidth;
            }
        }
    }
    return 0; // Default to 0 if today is not found in the data
}

export function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1);  // adjust when day is Sunday
    return new Date(d.setDate(diff));
}

export function getMondayOfCurrentWeek() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0); // reset time to midnight
    return monday;
}


export function groupDataByWeek(data) {
    const weeksData = {};

    data.forEach(entry => {
        const date = new Date(entry.dateAdded);
        const weekStart = getMonday(date).getTime();  // Assuming getMonday gets the start of the week

        if (!weeksData[weekStart]) {
            weeksData[weekStart] = [];
        }

        weeksData[weekStart].push(entry);
    });

    return Object.values(weeksData);  // Convert object to array of week arrays
}

// Helper function to get the start of the week for a given timestamp
export const getWeekStart = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDay();
    const weekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
    return weekStart.getTime();
};

export function getTopThree(items) {
    // Sort the items by count in descending order and get the top three
    return Object.entries(items)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 3)
        .map(([item]) => item);
}

export function analyzeEmotionTriggers(weekData) {
    const emotionAnalysis = {};

    weekData.forEach((entry) => {
        const { emotionCategory, where, withWho, whatActivity } = entry;

        // Initialize the category analysis object if necessary
        if (!emotionAnalysis[emotionCategory]) {
            emotionAnalysis[emotionCategory] = {
                count: 0,  // Initialize count for each emotionCategory
                where: {},
                withWho: {},
                whatActivity: {},
            };
        }

        // Increment the count for the emotionCategory
        emotionAnalysis[emotionCategory].count += 1;

        // Increment the count for each category
        emotionAnalysis[emotionCategory].where[where] = (emotionAnalysis[emotionCategory].where[where] || 0) + 1;
        emotionAnalysis[emotionCategory].withWho[withWho] = (emotionAnalysis[emotionCategory].withWho[withWho] || 0) + 1;
        emotionAnalysis[emotionCategory].whatActivity[whatActivity] = (emotionAnalysis[emotionCategory].whatActivity[whatActivity] || 0) + 1;
    });

    // Function to calculate top 3 most common values in an object
    const getTopThree = (obj) => {
        return Object.entries(obj)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(item => item[0]);
    };

    // Get the top three for each category
    for (const emotionCategory in emotionAnalysis) {
        emotionAnalysis[emotionCategory].where = getTopThree(emotionAnalysis[emotionCategory].where);
        emotionAnalysis[emotionCategory].withWho = getTopThree(emotionAnalysis[emotionCategory].withWho);
        emotionAnalysis[emotionCategory].whatActivity = getTopThree(emotionAnalysis[emotionCategory].whatActivity);
    }

    return emotionAnalysis;
}
