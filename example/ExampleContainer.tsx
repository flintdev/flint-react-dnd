import * as React from 'react';
import { Draggable, Droppable } from "../src/index";
import { initData } from "./initData";

export default class ExampleContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            initChildren: initData
        };
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    }

    handleOnDragEnd(data: any) {
        const {source, destination, draggableId, type, isValid} = data;
        console.log('>>> handleOnDragEnd', new Date().getTime(), data);
        console.log('>>> handleOnDragEnd.isValid', isValid);
        console.log('>>> handleOnDragEnd.source', source);
        console.log('>>> handleOnDragEnd.destination', destination);
        console.log('>>> handleOnDragEnd.draggableId', draggableId);
        console.log('>>> handleOnDragEnd.type', type);
        
        /* UPDATE_YOUR_DATA_HERE*/
        this.setState({initChildren: [...initData]})
    }

    render() {
        const {initChildren} = this.state;
        const renderChildren = (children: any[]) => {
            return children.map((child, index) => {
                const { type, children, id } = child;
                if (type === "Grid") {
                    return (
                        <Draggable key={id} draggableId={`${id}-drag`} type={type} index={index} onDragEnd={this.handleOnDragEnd}>
                            {({ handler }) => (
                                <div {...handler}>
                                    <Droppable key={id} droppableId={`${id}-drop`} type={type} onDragEnd={this.handleOnDragEnd}>
                                        {({ handler, status }) => (
                                            <div {...handler}
                                                style={{
                                                    backgroundColor: status.isDraggingOver ? "lightgrey" : "#ed93fd",
                                                    margin: 20,
                                                    padding: 20,
                                                    minHeight: 60,
                                                    border: `1px solid grey`
                                                    // display: "flex",
                                                    // flexDirection: "column"
                                                }}
                                            >
                                                {handler.id}
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
                        <Draggable draggableId={id} key={id} index={index} type={type} onDragEnd={this.handleOnDragEnd}>
                            {({ handler }) => (
                                <div {...handler} style={{ padding: 80, backgroundColor: "white", display: "inline-block", boxShadow: `inset 0px 0px 0px 5px red`}}>
                                    <button>{handler.id}</button>
                                </div>
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
                        </div>
                    )}
                </Droppable>
            </>
        )
    }
}