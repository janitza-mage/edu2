import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {TabFooterElement} from "./TabFooterElement";
import styles from "./TabFooter.module.scss";

export interface DumbTabFooterProps {
    activeTab: number;
    setActiveTab: (tab: number) => void;
    elements: TabFooterElement[];
}

export function DumbTabFooter({activeTab, setActiveTab, elements}: DumbTabFooterProps) {
    return <div className={styles.TabFooter}>
        <BottomNavigation showLabels value={activeTab} onChange={(_event, newValue) => {
            setActiveTab(newValue)
        }}>
            {elements.map((element, index) => <BottomNavigationAction key={index} label={element.label}
                                                                      icon={element.icon}/>)}
        </BottomNavigation>
    </div>;
}
