# flint-react-dnd

``` tsx
import { Draggable, Droppable } from "@flintdev/flint-react-dnd";

render() {
    return (
        <>
            <Draggable draggableId={"id-01"}>
                {({ handler }) => (
                    <div {...handler}>
                        {/* YOUR_CUSTOM_REACT_COMPONENT_HERE*/}
                    </div>
                )}
            </Draggable>
            <Droppable droppableId={"id-02"}>
                {({ handler }) => (
                    <div {...handler}>
                        {/* YOUR_CUSTOM_REACT_COMPONENT_HERE*/}
                    </div>
                )}
            </Droppable>
        </>
    )
}
```

