import {useLocation, useNavigate} from "react-router-dom";
import {DumbTabFooter} from "../../components/Footer/DumbTabFooter";
import Info from '@mui/icons-material/Info';
import MenuBook from '@mui/icons-material/MenuBook';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import Bolt from '@mui/icons-material/Bolt';

const suffixes = ["BACK", "/info", "/units", "/units/current"];
const elements = [
    {icon: <MenuBook/>, label: "Courses"},
    {icon: <Info/>, label: "Course Info"},
    {icon: <FormatListBulleted/>, label: "Units"},
    {icon: <Bolt/>, label: "Active"},
];

export function Footer() {
    const navigate = useNavigate();
    const match = /^(\/courses\/[^/]+)(\/.*)$/.exec(useLocation().pathname);
    let activeTab = match ? suffixes.indexOf(match[2]) : -1;
    const setActiveTab = (tab: number) => {
        if (tab === 0) {
            navigate("/courses");
        } else if (match && tab >= 1 && tab < suffixes.length) {
            navigate(match[1] + suffixes[tab]);
        }
    };
    return <DumbTabFooter activeTab={activeTab} setActiveTab={setActiveTab} elements={elements}/>;
}
