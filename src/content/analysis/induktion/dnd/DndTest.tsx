import {DndContext, useDroppable, useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";

function Draggable(props: any) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggable',
    });
    const style = { transform: CSS.Translate.toString(transform) };

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}

function Droppable(props: any) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

export function DndTest() {
    return <>
        <DndContext>
            <Draggable>draggable</Draggable>
            <Droppable>droppable</Droppable>
        </DndContext>
    </>;
}