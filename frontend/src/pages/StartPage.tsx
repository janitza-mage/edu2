import {Link} from "react-router-dom";

export function StartPage() {
    return <>
        <h1>Start Page</h1>
        <div><Link to={"/courses"}>to the courses</Link></div>
    </>;
}
