import React, { createContext, useContext, useState, useEffect } from 'react';

const LearningTimeContext = createContext();

export const useLearningTime = () => {
    const context = useContext(LearningTimeContext);
    if (!context) {
        throw new Error('useLearningTime must be used within a LearningTimeProvider');
    }
    return context;
};

export const LearningTimeProvider = ({ children }) => {
    // Helper to get today's date string
    const getTodayDate = () => new Date().toDateString();

    // Initialize from localStorage or default to 0
    const [learningTime, setLearningTime] = useState(() => {
        const savedTime = localStorage.getItem("user_learning_time_v2");
        const savedDate = localStorage.getItem("user_learning_date");
        const today = getTodayDate();

        if (savedDate === today && savedTime) {
            return parseInt(savedTime);
        }
        return 0;
    });

    const [isActive, setIsActive] = useState(true);
    const [lastActivity, setLastActivity] = useState(Date.now());

    // Activity events to track
    const activityEvents = [
        'mousedown', 'mousemove', 'keydown',
        'scroll', 'touchstart'
    ];

    // Handle user activity
    useEffect(() => {
        const handleActivity = () => {
            setLastActivity(Date.now());
            if (!isActive) setIsActive(true);
        };

        // Throttle the event listeners slightly to avoid performance hit
        // But for simplicity in this context, direct attachment is fine for now
        // or we can use a small timeout. Let's keep it direct but lightweight.
        activityEvents.forEach(event => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            activityEvents.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [isActive]);

    // Timer Interval
    useEffect(() => {
        const IDLE_TIMEOUT = 30000; // 30 seconds idle timeout
        let lastTick = Date.now();

        const timer = setInterval(() => {
            const now = Date.now();
            const delta = now - lastTick;
            lastTick = now;

            // Check for Day Reset
            const today = getTodayDate();
            const lastSavedDate = localStorage.getItem("user_learning_date");

            if (lastSavedDate !== today) {
                // It's a new day (or first run if missing)! Reset everything.
                setLearningTime(0);
                localStorage.setItem("user_learning_time_v2", 0);
                localStorage.setItem("user_learning_date", today);
                return; // Skip this tick
            }

            const isPageVisible = document.visibilityState === 'visible';
            const isOnline = navigator.onLine;
            const isNotIdle = now - lastActivity < IDLE_TIMEOUT;

            if (isPageVisible && isOnline && isNotIdle) {
                setIsActive(true);
                setLearningTime(prev => {
                    const newTime = prev + delta;
                    // Only save to localStorage roughly once per second (when the integer second changes)
                    // or if the difference is significant to avoid spamming IO
                    if (Math.floor(newTime / 1000) > Math.floor(prev / 1000)) {
                        localStorage.setItem("user_learning_time_v2", newTime);
                        localStorage.setItem("user_learning_date", today);
                    }
                    return newTime;
                });
            } else {
                setIsActive(false);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [lastActivity]);

    const value = {
        learningTime,
        isActive,
        formatLearningTime: (ms) => {
            const hours = Math.floor(ms / (1000 * 60 * 60));
            const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((ms % (1000 * 60)) / 1000);
            return `${hours}h ${minutes}m ${seconds}s`;
        }
    };

    return (
        <LearningTimeContext.Provider value={value}>
            {children}
        </LearningTimeContext.Provider>
    );
};
