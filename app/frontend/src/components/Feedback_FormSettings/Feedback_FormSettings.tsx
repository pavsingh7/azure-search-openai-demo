import { Button } from "@fluentui/react-components";
import { PersonFeedback24Regular } from "@fluentui/react-icons";

import { useTranslation } from "react-i18next";
import styles from "./Feedback_FormSettings.module.css";

interface FeedbackFormSettingsProps {
    className?: string; // Allow className as an optional prop
    onClick?: () => void; // onClick is a required prop
    disabled?: boolean; // Allow disabled as an optional prop
}

export const Feedback_FormSettings: React.FC<FeedbackFormSettingsProps> = ({ className }) => {
    const handleClick = () => {
        window.open(
            "https://forms.office.com/Pages/ResponsePage.aspx?id=19RToMlUWE2YnQ_gIHViNPhrmOAUpbZMkDB2PhcgvPJUN0dRS1lTT0s4TU1QODJPWjJEV1ZLTkNNVi4u",
            "_blank"
        );
    };

    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button
                className={styles.commonButton} // Apply the common button class here
                icon={<PersonFeedback24Regular />}
                onClick={handleClick}
                appearance="primary"
            >
                Give Feedback
            </Button>
        </div>
    );
};
