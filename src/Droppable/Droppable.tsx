import * as React from 'react';
import { FLINT_REACT_DND_DROPLINE, FLINT_REACT_DRAGGING_ID } from '../constant';

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
            newBar.style.backgroundColor = `#61DBFB`;
            newBar.style.height = `5px`;
            newBar.setAttribute("id", FLINT_REACT_DND_DROPLINE);
            e.target.appendChild(newBar)
        } else {
            isValid.style.padding = "";
        }
    }

    checkValid(dragId: string, dropId: string) {
        let curNode = document.getElementById(dropId)
        while(curNode?.parentNode) {
            if (curNode?.getAttribute("id") === dragId) {
                return false;
            }
            curNode = curNode?.parentNode as any; 
        }
        return true;
    }

    handleOnDragEnter(e: any) {
        if (e.target.getAttribute("id") === FLINT_REACT_DND_DROPLINE) {
            return;
        }
        if (this.checkValid(localStorage.getItem(FLINT_REACT_DRAGGING_ID) as string, e.target.getAttribute("id")) === false) {
            this.setState({ isDraggingOver: false })
        } else {
            const isValid = this.checkValid(localStorage.getItem(FLINT_REACT_DRAGGING_ID) as string, FLINT_REACT_DND_DROPLINE);
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
        if (e.target.getAttribute("id") === FLINT_REACT_DND_DROPLINE) {
            return;
        }
        try {
            this.checkContainerBar(e);
            const children = Array.from(e.target?.children ?? []) as any[];
            const isLastChildInlineBlock = children.length > 1 && children.slice(-2)[0]?.style.display === "inline-block";
            e.target.appendChild(document.getElementById(FLINT_REACT_DND_DROPLINE));
            const isValid = this.checkValid(localStorage.getItem(FLINT_REACT_DRAGGING_ID) as string, FLINT_REACT_DND_DROPLINE);
            const dragHeight = document.getElementById(localStorage.getItem(FLINT_REACT_DRAGGING_ID) || "")?.clientHeight ?? 10;
            document.getElementById(FLINT_REACT_DND_DROPLINE)!.style.display = isValid ? (isLastChildInlineBlock ? "inline" : "block") : "none";
            document.getElementById(FLINT_REACT_DND_DROPLINE)!.style.padding = isValid ? (isLastChildInlineBlock ? `${dragHeight/3}px 3px` : "") : "";
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