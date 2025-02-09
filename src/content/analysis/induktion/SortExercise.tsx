import {StepInstanceProps} from "../../../unit/step/createSteppedUnit";
import {CSSProperties, ReactNode} from "react";
import {ImmediateFeedbackChoiceExerciseVariant} from "../../../unit/choice/ImmediateFeedbackChoiceExercise";
import React, {useState} from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates, useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export interface SortExerciseProps extends StepInstanceProps {
    items: ReactNode[];
}

export function SortExercise(props: SortExerciseProps) {
    const [items, setItems] = useState([1, 2, 3]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map(id => <SortableItem key={id} id={id} />)}
            </SortableContext>
        </DndContext>
    );

    function handleDragEnd(event: any) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}










export function SortableItem(props: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            foo {/* ... */}
        </div>
    );
}




// --------------------------------------------------------------------------------------------------------------------
































// --------------------------------------------------------------------------------------------------------------------
// item
// --------------------------------------------------------------------------------------------------------------------
/*
interface ItemProps {
    children: ReactNode;
}

function Item(props: ItemProps) {
    const base: CSSProperties = {
        userSelect: "none",
        padding: "0.5em",
    };

    const colors: CSSProperties =
        !props.selected
            ? {border: "2px solid #aaa"}
            : props.correct
                ? {border: "2px solid #0c0", backgroundColor: "#8f8"}
                : {border: "2px solid #c00", backgroundColor: "#f88"};

    switch (props.variant) {

        case "inline": {
            const style = {
                ...base,
                ...colors,
                display: "inline-block",
                marginLeft: "0.6em",
            };
            return <div style={style} onClick={props.onClick}>{props.label}</div>;
        }

        case "default":
        default: {
            const style = {
                ...base,
                ...colors,
                marginBottom: "0.6em",
            };
            return <div style={style} onClick={props.onClick}>{props.label}</div>;
        }

    }
}
*/
