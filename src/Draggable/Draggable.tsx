import * as React from 'react';
import { FLINT_REACT_DND_DROPLINE } from '../constant';

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
        this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
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
        let curNode = document.getElementById(dropId)
        while(curNode?.parentNode) {
            if (curNode?.getAttribute("id") === dragId) {
                return false;
            }
            curNode = curNode?.parentNode as any; 
        }
        return true;
    }


    handleOnDragStart(e: any) {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = "move";
        e.target.style.opacity = 0.5;
        localStorage.setItem('fromId', e.target.getAttribute("id"));
        e.dataTransfer.setDragImage(e.target, 0, 0);
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
        if (e.target.getAttribute("draggable") === "true") {
            this.checkContainerBar(e);
            e.target.parentNode.insertBefore(document.getElementById(FLINT_REACT_DND_DROPLINE), e.target);
            const isValid = this.checkValid(localStorage.getItem('fromId') as string, FLINT_REACT_DND_DROPLINE);
            document.getElementById(FLINT_REACT_DND_DROPLINE)!.style.display = isValid ? "block" : "none";
        }
    }

    handleOnDragLeave(e: any) {
        e.stopPropagation();
    }

    handleOnDragOver(e: any) {
        e.stopPropagation();
    }

    handleOnDragEnd(e: any) {
        const { onDragEnd } = this.props;
        const { id, index, type, parentId } = this.state
        const dragTarget = document.getElementById(id);
        if (dragTarget && dragTarget.style) {
            dragTarget.style.opacity = "1";
        }
        const destination = document.getElementById(FLINT_REACT_DND_DROPLINE)?.parentNode as any;
        const getDestinationIndex = (children: any[]) => {
            let containerSelft = false;
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as any;
                const childID = child.getAttribute("id");
                if (childID === id) {
                    containerSelft = true;
                } else if (childID === FLINT_REACT_DND_DROPLINE) {
                    return i - (containerSelft ? 1 : 0);
                }
            }
            return -1;
        }

        if (onDragEnd) {
            onDragEnd({
                draggableId: id,
                type: type,
                isValid: this.checkValid(id, destination.getAttribute("id")),   
                source: {
                    droppableId: parentId,
                    index: parseInt(index)
                },
                destination: {
                    droppableId: destination.getAttribute("id"),
                    index: getDestinationIndex(Array.from(destination.children))
                }
            })
        } else {
            console.warn('message from @flintdev/flint-react-dnd:\n Please add your onDragEnd()')
        }
        e.stopPropagation();
        document.getElementById(FLINT_REACT_DND_DROPLINE)!.style.display = "none";
        localStorage.removeItem('fromId');
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