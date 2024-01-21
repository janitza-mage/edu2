import {useLocation, useNavigate} from "react-router-dom";
import {DumbTabFooter} from "../../components/Footer/DumbTabFooter";
import MenuBook from '@mui/icons-material/MenuBook';
import Bolt from '@mui/icons-material/Bolt';
import Check from '@mui/icons-material/Check';

const pathnames = ["/courses", "/courses/active", "/courses/finished"];
const elements = [
    {icon: <MenuBook/>, label: "Courses"},
    {icon: <Bolt/>, label: "Active"},
    {icon: <Check/>, label: "Finished"},
];

export function Footer() {
    const activeTab = pathnames.indexOf(useLocation().pathname);
    const navigate = useNavigate();
    const setActiveTab = (tab: number) => {
        if (tab >= 0 && tab < pathnames.length) {
            navigate(pathnames[tab]);
        }
    };
    return <DumbTabFooter activeTab={activeTab} setActiveTab={setActiveTab} elements={elements}/>;
}
