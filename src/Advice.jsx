import { useState, useEffect } from 'react'

const Advice = ({ isDarkMode }) => {
    const [adviceText, setAdviceText] = useState("Loading...")
    
    // Rich tones for Dark Mode
    const darkColors = [
        '#261a38', // Deep purple
        '#1a3038', // Deep teal
        '#381a2e', // Deep magenta
        '#1a2038', // Deep indigo
        '#2d381a'  // Deep olive
    ];

    // Soft parchment tones for Light Mode (we can keep these ready)
    const lightColors = [
        '#f2eee3', 
        '#f4e7e4', 
        '#e4ecef', 
        '#e5ede6', 
        '#f5efe0'  
    ];

    const pickColor = (dark) => {
        const palette = dark ? darkColors : lightColors;
        const randomIndex = Math.floor(Math.random() * palette.length);
        return palette[randomIndex];
    };

    const [cardBg, setCardBg] = useState(() => pickColor(isDarkMode))
    const [animKey, setAnimKey] = useState(0)

    const getMyData = async () => {
        // Pick a new background color and trigger the peel animation
        setCardBg(pickColor(isDarkMode));
        setAnimKey(prev => prev + 1);

        try {
            const response = await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`);
            const data = await response.json();
            setAdviceText(data.slip.advice);
        } catch (error) {
            console.error("Something went wrong:", error);
            setAdviceText("Could not load advice. Click again!");
        }
    };

    // Load initial advice on startup
    useEffect(() => {
        getMyData();
    }, []);

    // Instantly update color when theme toggles
    useEffect(() => {
        setCardBg(pickColor(isDarkMode));
        setAnimKey(prev => prev + 1);
    }, [isDarkMode]);

    return (
        <div 
            key={animKey} 
            className="advice-card" 
            style={{ backgroundColor: cardBg }}
        >
            <p className="advice-text">"{adviceText}"</p>
            <button className="advice-button" onClick={getMyData}>
                Get New Advice
            </button>
        </div>
    );
}

export default Advice