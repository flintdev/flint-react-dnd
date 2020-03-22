import * as React from 'react';
import { FLINT_REACT_DND_DROPLINE } from 'src/constant';

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

    checkContainerBar(e: any) {
        const isValid = document.getElementById(FLINT_REACT_DND_DROPLINE);
        if (!isValid) {
            let newBar = document.createElement("div");
            newBar.style.width = `100%`;
            newBar.style.display = `none`;
            newBar.style.backgroundColor = `#9436a5`;
            newBar.style.height = `5px`;
            newBar.setAttribute("id", FLINT_REACT_DND_DROPLINE);
            e.target.appendChild(newBar)
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
            this.checkContainerBar(e);
            e.target.appendChild(document.getElementById(FLINT_REACT_DND_DROPLINE));
            document.getElementById(FLINT_REACT_DND_DROPLINE)!.style.display = "block";
        } catch(error) {
            
        }
    }

    handleOnDrop(e: any) {
        this.setState({ isDraggingOver: false })
    }

    render() {
        const { children, droppableId, index, type } = this.props;
        const { isDraggingOver } = this.state;
        const isDroppable = this.props.isDroppable !== false;

        const actions = {
            onDragEnter: (e: Event) => this.handleOnDragEnter(e),
            onDragLeave: (e: Event) => this.handleOnDragLeave(e),
            onDragOver: (e: Event) => this.handleOnDragOver(e),
            onDrop: (e: Event) => this.handleOnDrop(e)
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