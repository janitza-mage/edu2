import {CourseCompletionStatus} from "../../logic/state/StateStore";
import Bolt from '@mui/icons-material/Bolt';
import Check from '@mui/icons-material/Check';
import {Icon} from "@mui/material";

export interface CourseCompletionStatusIconProps {
    status: CourseCompletionStatus;
}

export function CourseCompletionStatusIcon({status}: CourseCompletionStatusIconProps) {
    switch (status) {
        case "active":
            return <Bolt/>;
        case "completed":
            return <Check/>;
        default:
            return <Icon/>;
    }
}
