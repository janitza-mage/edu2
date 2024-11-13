import {useNavigate} from "react-router-dom";
import {WithFooter} from "../../components/Footer/WithFooter";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import styles from "./GeneratorListPage.module.scss";
import {generators} from "../../database/database";

export function GeneratorListPage() {
    const navigate = useNavigate();
    return <WithFooter footer={<></>}>
        <List className={styles.GeneratorList}>
            {generators.map(generator => <ListItem key={generator.id} disablePadding className={styles.GeneratorListEntry}>
                <ListItemButton onClick={() => navigate("/" + generator.id)}>
                    <ListItemText primary={generator.name}/>
                </ListItemButton>
            </ListItem>)}
        </List>
    </WithFooter>;
}
