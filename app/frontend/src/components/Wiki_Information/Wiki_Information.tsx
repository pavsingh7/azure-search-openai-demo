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
        window.open(
            "https://sanlam-my.sharepoint.com/:f:/g/personal/pavan_singh_sanlam_co_za/EmsJr-7A-zFOiv_KRDAYRt0Btv60YVcwY1XHoL--jd6o4w?e=iUTPSS",
            "_blank"
        );
    };

    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button
                className={styles.commonButton} // Apply the common button class here
                icon={<BookInformation24Regular />}
                onClick={handleClick}
                appearance="primary"
            >
                Help & Documentation
            </Button>
        </div>
    );
};
