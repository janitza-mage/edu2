import Bolt from '@mui/icons-material/Bolt';
import Check from '@mui/icons-material/Check';
import {Icon} from "@mui/material";

export interface UnitCompletionStatusIconProps {
    unitIndex: number;
    completedUnits: number;
}

export function UnitCompletionStatusIcon({unitIndex, completedUnits}: UnitCompletionStatusIconProps) {
    if (unitIndex < completedUnits) {
        return <Check/>;
    } else if (unitIndex === completedUnits) {
        return <Bolt/>;
    } else {
        return <Icon/>;
    }
}
