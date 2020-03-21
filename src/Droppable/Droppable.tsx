import * as React from 'react';
import { DATA_TRANSFER_KEY } from 'src/constant';

export interface Props {
    children: (props: any) => React.ReactElement,
    isDroppable?: boolean,
    droppableId: string,
    onDragEnd?: Function
};

export interface State {
    idDraggingOver?: boolean
};

export default class Droppable extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            idDraggingOver: false
        }
        this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
        this.handleOnDragLeave = this.handleOnDragLeave.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
    }

    handleOnDragEnter(e: any) {
        this.setState({ idDraggingOver: true })
        e.preventDefault();
        return true;
    }

    handleOnDragLeave(e: any) {
        this.setState({ idDraggingOver: false })
        e.preventDefault();
        return true;
    }

    handleOnDragOver(e: any) {
        e.preventDefault();
    }

    handleOnDrop(e: any) {
        this.setState({ idDraggingOver: false })
        const {onDragEnd} = this.props;
        if (onDragEnd) {
            onDragEnd({
                draggableId: e.dataTransfer.getData(DATA_TRANSFER_KEY),
                droppableId: e.target.getAttribute("id")
            })
        } else {
            console.log('>>> missing onDragEnd()')
        }
        e.stopPropagation();
        // var data = ev.dataTransfer.getData(DATA_TRANSFER_KEY);
        // if (data !== ev.target.getAttribute("id")) {
        //     ev.target.appendChild(document.getElementById(data));
        //     ev.stopPropagation();
        // }
        return true;
    }

    render() {
        const { children, droppableId } = this.props;
        const { idDraggingOver } = this.state;
        const isDroppable = this.props.isDroppable !== false;

        const actions = {
            onDragEnter: this.handleOnDragEnter,
            onDragLeave: this.handleOnDragLeave,
            onDragOver: this.handleOnDragOver,
            onDrop: this.handleOnDrop,
        }
        const handler = {
            ...isDroppable ? actions : {},
            id: droppableId,
            idDraggingOver
        }
        return (
            <>
                {!!children && children({ handler })}
            </>
        )
    }
}