import { Button } from "@fluentui/react-components";
import { BookInformation24Regular } from "@fluentui/react-icons";

import { useTranslation } from "react-i18next";
import styles from "./Wiki_Information.module.css";

interface Wiki_InformationProps {
    className?: string; // Allow className as an optional prop
    onClick?: () => void; // Allow onClick as an optional prop
    disabled?: boolean; // Allow disabled as an optional prop
}

export const Wiki_Information: React.FC<Wiki_InformationProps> = ({ className }) => {
    const handleClick = () => {
        window.location.href = "https://confluence.sanlam.co.za/display/RAA/Retail+Affluent+%3A+Actuarial%3A+Advanced+Analytics+Home";
    };

    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button
                className={styles.commonButton} // Apply the common button class here
                icon={<BookInformation24Regular />}
                onClick={handleClick}
                appearance="primary"
            >
                How to Use it?
            </Button>
        </div>
    );
};
