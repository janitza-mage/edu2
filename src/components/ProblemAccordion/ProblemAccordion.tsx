import * as React from 'react';
import {ReactNode} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface ProblemAccordionSectionProps {
    title: ReactNode;
    children: ReactNode;
    defaultExpanded?: boolean;
}

export function ProblemAccordionSection(props: ProblemAccordionSectionProps) {
    return <Accordion defaultExpanded={!!props.defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}><b>{props.title}</b></AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>;
}

export interface ProblemAccordionProps {
    children: ReactNode; 
}

export function ProblemAccordion(props: ProblemAccordionProps) {
    // currently a no-op because MUI's Accordion doesn't need a wrapping element
    return <>{props.children}</>;
}
