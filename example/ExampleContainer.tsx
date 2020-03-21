import * as React from 'react';
import { Draggable as BaseDraggable, Droppable as BaseDroppable, DropLine } from "../src/index";
import { DroppableProps } from "../src/Droppable/interface";
import { DraggableProps } from "../src/Draggable/interface";

export default class ExampleContainer extends React.Component {
    handleOnDragEnd(data: any) {
        console.log('>>> handleOnDragEnd.data', data);
    }
    render() {
        const Droppable = (props: DroppableProps) => {
            return <BaseDroppable {...props} onDragEnd={this.handleOnDragEnd}>{props.children}</BaseDroppable>
        }
        const Draggable = (props: DraggableProps) => {
            return <BaseDraggable {...props} onDragEnd={this.handleOnDragEnd}>{props.children}</BaseDraggable>
        }
        return (
            <>
            <DropLine/>
            <Droppable droppableId={"drop01"}>
                {({ handler }) => (
                    <div {...handler} 
                    style={{ 
                        height: `100vh`,
                        backgroundColor: handler.idDraggingOver ? "#9436a5" : "lightyellow",
                        display: 'flex',
                        flexDirection: 'column'
                        }}>
                        {handler.id}

                        {["drag01", "drag02", "drag03", "drag04", "drag05", "drag06"].map((draggableId: string, index: number) => {
                            return (
                                <Draggable draggableId={draggableId} key={draggableId} index={index}>
                                    {({ handler }) => (
                                        <span {...handler} style={{ padding: 10, backgroundColor: "white" }}>
                                            {handler.id}
                                        </span>
                                    )}
                                </Draggable>
                            )
                        })}

                        <Draggable draggableId={"drag06"}>
                            {({ handler }) => (
                                <div {...handler}>
                                    <Droppable droppableId={"drop02"}>
                                        {({ handler }) => (
                                            <div {...handler}
                                                style={{
                                                    backgroundColor: handler.idDraggingOver ? "#9436a5" : "#ed93fd",
                                                    margin: 10,
                                                    minHeight: 60,
                                                    border: `1px solid grey`,
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                {handler.id}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            )}
                        </Draggable>

                        <Draggable draggableId={"drag07"}>
                            {({ handler }) => (
                                <div {...handler}>
                                    <Droppable droppableId={"drop03"}>
                                        {({ handler }) => (
                                            <div {...handler}
                                                style={{
                                                    backgroundColor: handler.idDraggingOver ? "#9436a5" : "#ed93fd",
                                                    margin: 10,
                                                    minHeight: 60,
                                                    border: `1px solid grey`,
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                {handler.id}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            )}
                        </Draggable>
                    </div>
                )}
            </Droppable>
            </>
        )
    }
}