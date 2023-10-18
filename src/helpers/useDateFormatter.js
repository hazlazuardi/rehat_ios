import { useState, useEffect } from 'react';

function useFormattedDate(timestamp) {
    const [formattedDate, setFormattedDate] = useState({ dayString: '', timeString: '' });

    useEffect(() => {
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

        const dayString = date.toLocaleDateString('en-US', dateOptions);
        const timeString = date.toLocaleTimeString('en-US', timeOptions);

        setFormattedDate({ dayString, timeString });
    }, [timestamp]);

    return formattedDate;
}

export default useFormattedDate;
