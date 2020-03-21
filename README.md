# flint-react-dnd

``` tsx
import { Draggable, Droppable, DropLine } from "@flintdev/flint-react-dnd";

render() {
    return (
        <>
            <DropLine/>
            <Draggable draggableId={"id-01"}>
                {({ handler }) => (
                    <div {...handler}>
                        <Droppable droppableId={"id-02"}>
                            {({ handler }) => (
                                <div {...handler}>
                                    {/* YOUR_CUSTOM_REACT_COMPONENT_HERE*/}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        </>
    )
}
```

