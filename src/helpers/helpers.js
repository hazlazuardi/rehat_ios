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

// export function groupAndSumDataByWeekAndDay(data) {
//     const groupedData = {};
//     data.forEach(dataPoint => {
//         const date = new Date(dataPoint.date);
//         const weekNumber = Math.floor(date.getDate() / 7);
//         const dayNumber = date.getDay();

//         if (!groupedData[weekNumber]) {
//             groupedData[weekNumber] = {};
//         }

//         if (!groupedData[weekNumber][dayNumber]) {
//             groupedData[weekNumber][dayNumber] = { value: 0 };
//         }

//         groupedData[weekNumber][dayNumber].value += dataPoint.value;
//     });
//     return groupedData;
// }

// Helper function to sum values by day


export function sumValuesByDay(data) {
    const summedData = {};
    data.forEach(dataPoint => {
        const date = new Date(dataPoint.date);
        const dateString = date.toISOString().split('T')[0];  // Get YYYY-MM-DD string
        if (!summedData[dateString]) {
            summedData[dateString] = { date: dateString, value: 0 };
        }
        summedData[dateString].value += dataPoint.value;
    });
    return Object.values(summedData).sort((a, b) => new Date(a.date) - new Date(b.date));  // Sort by date
}

// Helper function to group days by week
export function groupDaysByWeek(summedData) {
    const weeks = [];
    let currentWeek = [];
    const firstDate = new Date(summedData[0].date);
    let currentDate = new Date(firstDate);
    currentDate.setDate(currentDate.getDate() - firstDate.getDay() + 1);  // Find the previous or current Monday

    summedData.forEach(dataPoint => {
        const dataDate = new Date(dataPoint.date);
        while (currentDate < dataDate) {
            currentWeek.push({ date: currentDate.toISOString().split('T')[0], value: null });  // Fill in missing days
            currentDate.setDate(currentDate.getDate() + 1);
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }
        currentWeek.push(dataPoint);
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    while (currentWeek.length < 7) {  // Fill in missing days at the end
        currentWeek.push({ date: currentDate.toISOString().split('T')[0], value: null });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(currentWeek);

    return weeks;
}
