import * as React from 'react';
import { DATA_TRANSFER_KEY } from 'src/constant';

export interface Props {
    children: (props: any) => React.ReactElement,
    isDraggable?: boolean,
    draggableId: string,
    onDragEnd?: Function,
    index?: number
};

export default class Draggable extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
        this.handleOnDragLeave = this.handleOnDragLeave.bind(this);
        this.handleOnDragOver = this.handleOnDragOver.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
    }

    handleOnDragStart(e: any) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData(DATA_TRANSFER_KEY, e.target.getAttribute("id"));
        return true;
    }

    handleOnDragEnter(e: any) {
        // console.log('>>> ', document.getElementById("container-bar"))
        e.stopPropagation();
        e.target.parentNode.insertBefore(document.getElementById("container-bar"), e.target);
        document.getElementById("container-bar")!.style.display = "unset";
    }
    
    handleOnDragLeave(e: any) {
        e.stopPropagation();
        // return false;
    }

    handleOnDragOver(e: any) {
        // const {index} = this.props;
        // console.log('>>> handleOnDragOver', index)
        // e.stopPropagation();
        // return true;
    }
    
    handleOnDrop(e: any) {
        e.stopPropagation();
        const {index} = this.props;
        this.setState({ idDraggingOver: false })
        document.getElementById("container-bar")!.style.display = "none";

        const {onDragEnd} = this.props;
        if (onDragEnd) {
            onDragEnd({
                index: index,
                draggableId: e.dataTransfer.getData(DATA_TRANSFER_KEY),
                droppableId: e.target.getAttribute("id")
            })
        } else {
            console.log('>>> missing onDragEnd()')
        }
    }

    render() {
        const { children, draggableId } = this.props;
        const isDraggable = this.props.isDraggable !== false;
        const actions = {
            onDragStart: this.handleOnDragStart
        }
        const handler = {
            ...isDraggable ? actions : {},
            draggable: isDraggable,
            id: draggableId,
            onDragEnter: this.handleOnDragEnter,
            onDragLeave: this.handleOnDragLeave,
            onDragOver: this.handleOnDragOver,
            onDrop: this.handleOnDrop
        }
        return (
            <>
                {!!children && children({ handler })}
            </>
        )
    }
}