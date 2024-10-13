import { Button } from "@fluentui/react-components";
import { ArrowExit20Regular } from "@fluentui/react-icons";

import { useTranslation } from "react-i18next";
import styles from "./Exit_Session.module.css";

interface Exit_SessionProps {
    className?: string; // Allow className as an optional prop
    onClick?: () => void; // Allow onClick as an optional prop
    disabled?: boolean; // Allow disabled as an optional prop
}

export const Exit_Session: React.FC<Exit_SessionProps> = ({ className }) => {
    const handleClick = () => {
        window.location.href = "https://intranet.sanlam.co.za";
    };

    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button
                className={styles.commonButton} // Apply the common button class here
                icon={<ArrowExit20Regular />}
                onClick={handleClick}
                appearance="primary"
            >
                Exit
            </Button>
        </div>
    );
};
