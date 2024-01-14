// IMPORT===================================================================================================================
import { useState }                                                                             from "react";
// COMPONENTS===============================================================================================================
import { 
    DndContext, 
    closestCorners, 
    PointerSensor, 
    useSensor, 
    useSensors, 
    KeyboardSensor, 
    DragOverlay
}                                                                                               from "@dnd-kit/core";
import { sortableKeyboardCoordinates }                                                          from "@dnd-kit/sortable";
import { Container }                                                                            from "../components/Container";
import { Card }                                                                                 from "../components/Card";

function App() {

    const [active, setActive]       = useState();
    const [data, setData]           = useState([
        {
            id                      : "A",
            name                    : "name 1",
            items                   : [
                {id: "A1", name: "test"},
                {id: "A2", name: "test 2"},
                {id: "A3", name: "test 3"},
            ]
        },
        {
            id                      : "B",
            name                    : "name 2",
            items                   : [
                {id: "B1", name: "test"},
                {id: "B2", name: "test 2"},
                {id: "B3", name: "test 3"},
            ]
        }
    ]);

    const handleDragStart           = (event) => {
        const id                    = event.active.id.match(/[A-Z]+/g)[0];
        const containerIdActive     = data.findIndex(item => item.id === id);
        const indexActive           = data[containerIdActive].items.findIndex(item => item.id === event.active.id);        
        setActive(data[containerIdActive].items[indexActive]);
    }

    const handleDragEnd             = (event) => {        
        // const id                = event.active.id.match(/[A-Z]+/g)[0];
        // const overId            = event.over.id.match(/[A-Z]+/g)[0];
        // const containerIdActive = data.findIndex(item => item.id === id);
        // const containerIdOver   = data.findIndex(item => item.id === overId);
        // const indexActive       = data[containerIdActive].items.findIndex(item => item.id === event.active.id);
        // const indexOver         = data[containerIdOver].items.findIndex(item => item.id === event.over.id);
    };

    const handleDragOver            = (event) => {
    
        const id                    = event.active.id.match(/[A-Z]+/g)[0];
        const overId                = event.over.id.match(/[A-Z]+/g)[0];
        const containerIdActive     = data.findIndex(item => item.id === id);
        const containerIdOver       = data.findIndex(item => item.id === overId);
        const indexActive           = data[containerIdActive].items.findIndex(item => item.id === event.active.id);
        const indexOver             = data[containerIdOver].items.findIndex(item => item.id === event.over.id);

        // setData((prev) => {
        //     console.log(prev);
        //     return prev;
        // });

    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <DndContext 
            collisionDetection      = {closestCorners}
            onDragStart             = {handleDragStart}
            onDragEnd               = {handleDragEnd}
            onDragOver              = {handleDragOver}
            sensors                 = {sensors}         
        >
            <main className="container flex flex-wrap">                
                {data.map((item, index) => {
                    return (                            
                        <Container key={index} id={item.id} name={item.name} items={item.items}></Container>
                    );
                })}
                <DragOverlay>{active && <Card item={active}/>}</DragOverlay>
            </main>
        </DndContext>
    )
}

export default App;
