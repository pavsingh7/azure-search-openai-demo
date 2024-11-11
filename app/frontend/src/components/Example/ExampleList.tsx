import { useEffect, useState } from "react";
import { Example } from "./Example";
import { DEFAULT_EXAMPLES, GPT4V_EXAMPLES } from "../../i18n/examples.js";

import styles from "./Example.module.css";

// const DEFAULT_EXAMPLES: string[] = [
//     "What is Sanlam's IT Strategy?",
//     "How was Retail Affluent's performance in 2023?",
//     "What savings products does Sanlam sell?"
// ];

// const GPT4V_EXAMPLES: string[] = [
//     "Compare the impact of interest rates and GDP in financial markets.",
//     "What is the expected trend for the S&P 500 index over the next five years? Compare it to the past S&P 500 performance",
//     "Can you identify any correlation between oil prices and stock market trends?"
// ];

const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

interface Props {
    onExampleClicked: (value: string) => void;
    useGPT4V?: boolean;
}

export const ExampleList = ({ onExampleClicked, useGPT4V }: Props) => {
    const [currentExamples, setCurrentExamples] = useState<string[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const loadExamples = () => {
            setIsTransitioning(true);

            // Wait for fade out animation
            setTimeout(() => {
                const examples = useGPT4V ? GPT4V_EXAMPLES : DEFAULT_EXAMPLES;
                setCurrentExamples(shuffleArray(examples).slice(0, 3));
                setIsTransitioning(false);
            }, 500); // Match this with CSS transition duration
        };

        loadExamples();
        const intervalId = setInterval(loadExamples, 7000); // Replaced workerSetInterval

        return () => clearInterval(intervalId); // Replaced workerClearInterval
    }, [useGPT4V]);

    return (
        <ul className={styles.examplesNavList}>
            {currentExamples.map((question, i) => (
                <li key={`${question}-${i}`} className={`${styles.exampleItem} ${isTransitioning ? styles.transitioning : ""}`}>
                    <Example text={question} value={question} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
