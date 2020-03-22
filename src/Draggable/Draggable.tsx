import * as React from 'react';

export interface Props {
    children: (props: any) => React.ReactElement,
    isDraggable?: boolean,
    draggableId: string,
    onDragEnd?: Function,
    index?: number,
    type?: string
};

export default class Draggable extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    handleOnDragStart(e: any) {
        e.dataTransfer.effectAllowed = "move";
        this.setState({
            id: e.target.getAttribute("id"),
            index: e.target.getAttribute("index"),
            type: e.target.getAttribute("type"),
            parentId: e.target.parentNode.getAttribute("id"),
        })
        return true;
    }

    handleOnDragEnter(e: any) {
        e.stopPropagation();
        e.target.parentNode.insertBefore(document.getElementById("container-bar"), e.target);
        document.getElementById("container-bar")!.style.display = "block";
    }
    
    handleOnDragLeave(e: any) {
        e.stopPropagation();
    }

    handleOnDragOver(e: any) {
        e.stopPropagation();
    }

    handleOnDragEnd(e: any) {
        const {onDragEnd} = this.props;
        const { id, index, type, parentId } = this.state
        const destination = document.getElementById("container-bar")?.parentNode as any;
        const getDestinationIndex = (children: any[]) => {
            let containerSelft = false;
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as any;
                const childID = child.getAttribute("id");
                if (childID === id) {
                    containerSelft = true;
                } else if (childID === "container-bar") {
                    return i - (containerSelft ? 1 : 0); 
                }
            }
            return -1;
        }
        if (onDragEnd) {
            onDragEnd({
                draggableId: id,
                type: type,
                source: {
                    droppableId: parentId,
                    index: parseInt(index)
                },
                destination: {
                    droppableId : destination.getAttribute("id"),
                    index: getDestinationIndex(Array.from(destination.children))
                }
            })
        } else {
            console.log('>>> missing onDragEnd()')
        }
        e.stopPropagation();
        document.getElementById("container-bar")!.style.display = "none";
    }

    render() {
        const { children, draggableId, index, type } = this.props;
        const isDraggable = this.props.isDraggable !== false;
        const actions = {
            onDragStart: (e: Event) => this.handleOnDragStart(e)
        }
        const handler = {
            ...isDraggable ? actions : {},
            draggable: isDraggable,
            id: draggableId,
            index,
            type,
            onDragEnter: (e: Event) => this.handleOnDragEnter(e),
            onDragLeave: (e: Event) => this.handleOnDragLeave(e),
            onDragOver: (e: Event) => this.handleOnDragOver(e),
            onDragEnd: (e: Event) => this.handleOnDragEnd(e)
        }
        return (
            <>
                {!!children && children({ handler })}
            </>
        )
    }
}