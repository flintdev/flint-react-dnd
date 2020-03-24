import * as React from 'react';
import { FLINT_REACT_DND_DROPLINE } from '../constant';

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

    checkValid(dragId: string, dropId: string) {
        let curId = dropId;
        while(curId) {
            if (curId === dragId) {
                return false;
            }
            const parentNode = document.getElementById(curId)?.parentNode as any; 
            curId = parentNode.getAttribute("id")
        }
        return true;
    }

    handleOnDragEnter(e: any) {
        if (this.checkValid(localStorage.getItem('fromId') as string, e.target.getAttribute("id")) === false) {
            this.setState({ isDraggingOver: false })
        } else {
            const isValid = this.checkValid(localStorage.getItem('fromId') as string, FLINT_REACT_DND_DROPLINE);
            this.setState({ isDraggingOver: isValid })
        }
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
            const isValid = this.checkValid(localStorage.getItem('fromId') as string, FLINT_REACT_DND_DROPLINE);
            document.getElementById(FLINT_REACT_DND_DROPLINE)!.style.display = isValid ? "block" : "none";
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