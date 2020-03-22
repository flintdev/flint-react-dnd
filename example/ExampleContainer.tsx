import * as React from 'react';
import { Draggable as BaseDraggable, Droppable as BaseDroppable, DropLine } from "../src/index";
import { DroppableProps } from "../src/Droppable/interface";
import { DraggableProps } from "../src/Draggable/interface";
import { initData } from "./initData";

export default class ExampleContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            initChildren: initData
        };
    }
    handleOnDragEnd(data: any) {
        const {source, destination, draggableId, type} = data;
        console.log('>>> handleOnDragEnd', new Date().getTime(), data);
        this.setState({initChildren: [...initData]})
    }

    render() {
        const {initChildren} = this.state;
        const Droppable = (props: DroppableProps) => {
            return <BaseDroppable {...props} onDragEnd={(data: any) => this.handleOnDragEnd(data)}>{props.children}</BaseDroppable>
        }
        const Draggable = (props: DraggableProps) => {
            return <BaseDraggable {...props} onDragEnd={(data: any) => this.handleOnDragEnd(data)}>{props.children}</BaseDraggable>
        }
        const renderChildren = (children: any[]) => {
            return children.map((child, index) => {
                const { type, children, id } = child;
                if (type === "Grid") {
                    return (
                        <Draggable  key={id} draggableId={`${id}-drag`} type={type} index={index}>
                            {({ handler }) => (
                                <div {...handler}>
                                    <Droppable key={id} droppableId={`${id}-drop`} type={type}>
                                        {({ handler, status }) => (
                                            <div {...handler}
                                                style={{
                                                    backgroundColor: status.isDraggingOver ? "lightgrey" : "#ed93fd",
                                                    margin: 20,
                                                    padding: 20,
                                                    minHeight: 60,
                                                    border: `1px solid grey`,
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                {renderChildren(children)}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            )}
                        </Draggable>
                    )
                } else {
                    return (
                        <Draggable draggableId={id} key={id} index={index} type={type}>
                            {({ handler }) => (
                                <span {...handler} style={{ padding: 10, backgroundColor: "white" }}>
                                    {handler.id}
                                </span>
                            )}
                        </Draggable>
                    )
                }
            })
        }

        return (
            <>
                <Droppable droppableId={"mainContainer"} type={"CONTAINER"} index={0}>
                    {({ handler }) => (
                        <div {...handler}
                            style={{
                                height: `100vh`,
                                backgroundColor: handler.isDraggingOver ? "#9436a5" : "lightyellow",
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {renderChildren(initChildren)}
                            <DropLine/>
                        </div>
                    )}
                </Droppable>
            </>
        )
    }
}