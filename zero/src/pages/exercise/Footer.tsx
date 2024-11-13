import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import ArrowBack from '@mui/icons-material/ArrowBackIosNew';

export interface FooterProps {
    score: number;
}

export function Footer(props: FooterProps) {
    const navigate = useNavigate();
    return <div>
        <div style={{float: "left"}}>
            <Button onClick={() => navigate("/")}>
                <ArrowBack />
            </Button>
        </div>
        <div style={{float: "right", marginRight: "10px"}}>
            <span>{props.score}</span>
        </div>
    </div>;
}
