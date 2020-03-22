import * as React from 'react';

export interface Props {
    children: (props: any) => React.ReactElement,
    isDroppable?: boolean,
    droppableId: string,
    onDragEnd?: Function,
    index?: number,
    type?: string
};

export interface State {
    isDraggingOver?: boolean
};

export default class Droppable extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            isDraggingOver: false
        }
    }

    handleOnDragEnter(e: any) {
        this.setState({ isDraggingOver: true })
        e.preventDefault();
    }

    handleOnDragLeave(e: any) {
        this.setState({ isDraggingOver: false })
        e.preventDefault();
    }

    handleOnDragOver(e: any) {
        e.preventDefault();
        try {
            e.target.appendChild(document.getElementById("container-bar"));
            document.getElementById("container-bar")!.style.display = "block";
        } catch(error) {
            
        }
    }

    render() {
        const { children, droppableId, index, type } = this.props;
        const { isDraggingOver } = this.state;
        const isDroppable = this.props.isDroppable !== false;

        const actions = {
            onDragEnter: (e: Event) => this.handleOnDragEnter(e),
            onDragLeave: (e: Event) => this.handleOnDragLeave(e),
            onDragOver: (e: Event) => this.handleOnDragOver(e)
        }
        const handler = {
            ...isDroppable ? actions : {},
            id: droppableId,
            index,
            type
        }
        const status = {
            isDraggingOver
        }
        return (
            <>
                {!!children && children({ handler, status })}
            </>
        )
    }
}