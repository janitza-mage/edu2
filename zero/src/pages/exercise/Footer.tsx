import {useNavigate} from "react-router-dom";

export function Footer() {
    const navigate = useNavigate();
    return <div>
        <span onClick={() => navigate("/")}>BACK</span>
        <span>SCORE: 1234</span>
    </div>;
}
