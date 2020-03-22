import * as React from 'react';

import Droppable from "./Droppable";
import Draggable from "./Draggable";

class DropLine extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div style={{
                display: "none",
                backgroundColor: `#9436a5`,
                width: `100%`,
                height: 5
            }} id="container-bar" />
        )
    }
}

export {Draggable, Droppable, DropLine};

