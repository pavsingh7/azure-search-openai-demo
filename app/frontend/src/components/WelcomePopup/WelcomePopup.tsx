import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Welcome.module.css";

export const WelcomePopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const welcomeText = `
## Overview: Capabilities and Context
This is a preview release version that gives you the ability to leverage to GPT4o's capabilities for your daily tasks in a private capacity.

## Feedback and Issues
This release is in beta version, and we are working iteratively on improving the solution. If you see any discrepancies or issues, please provide feedback using button on the landing page.

## Upcoming Features: Release 3
Coming soon, is the ability to upload documents privately (and localised to your username), model evaluation and integrated vectorisation (streamlined and automated knowledge base uploads).
    `;

    const dialogContentProps = {
        type: DialogType.normal,
        title: "Welcome to ActuarialGPT",
        subText: "",
        titleProps: {
            className: styles.dialogTitle
        }
    };

    return (
        <Dialog hidden={!isOpen} onDismiss={() => setIsOpen(false)} dialogContentProps={dialogContentProps} styles={{ main: styles.dialogRoot }}>
            <div className={styles.dialogText}>
                <ReactMarkdown>{welcomeText}</ReactMarkdown>
            </div>
            <DialogFooter>
                <DefaultButton onClick={() => setIsOpen(false)} text="Get Started" className={styles.button} />
            </DialogFooter>
        </Dialog>
    );
};
