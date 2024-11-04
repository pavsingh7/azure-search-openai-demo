import React, { useState, useEffect } from "react";
import styles from "./Typewriter.module.css";

interface TypewriterTextProps {
    sequence: string[];
    speed: number;
    className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ sequence, speed, className }) => {
    const [text, setText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentIndex >= sequence.length) {
            setIsComplete(true);
            return;
        }

        if (isComplete) {
            return;
        }

        const target = sequence[currentIndex];

        if (typeof target === "number") {
            const timeout = setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
            }, target);

            return () => clearTimeout(timeout);
        }

        if (text === target) {
            const timeout = setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
            }, 1000);

            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setText(target.slice(0, text.length + 1));
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, currentIndex, sequence, speed, isComplete]);

    return <span className={`${styles.typewriter} ${className || ""} ${isComplete ? styles.complete : ""}`}>{text}</span>;
};
