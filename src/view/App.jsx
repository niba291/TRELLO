// IMPORT===================================================================================================================
import { useState }                                                                             from "react";
// COMPONENTS===============================================================================================================
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, KeyboardSensor }      from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Card }                                                                                 from "../components/Card";
// import { Button }                                                                               from "../components/Buttons";

function App() {

    const [data, setData]       = useState([
        {
            id                  : "A",
            name                : "name 1",
            items               : [
                {id: "A1", name: "test"},
                {id: "A2", name: "test 2"},
                {id: "A3", name: "test 3"},
            ]
        },
        {
            id                  : "B",
            name                : "name 2",
            items               : [
                {id: "B1", name: "test"},
                {id: "B2", name: "test 2"},
                {id: "B3", name: "test 3"},
            ]
        }
    ]);

    const handleDragEnd         = (event) => {        
        const id                = event.active.id.match(/[A-Z]+/g)[0];
        const overId            = event.over.id.match(/[A-Z]+/g)[0];
        const containerIdActive = data.findIndex(item => item.id === id);
        const containerIdOver   = data.findIndex(item => item.id === overId);
        const indexActive       = data[containerIdActive].items.findIndex(item => item.id === event.active.id);
        const indexOver         = data[containerIdOver].items.findIndex(item => item.id === event.over.id);
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <DndContext 
            collisionDetection  = {closestCenter}
            onDragEnd           = {handleDragEnd}   
            sensors             = {sensors}         
        >
            <main className="container flex flex-wrap">                
                {data.map((item, index) => {
                    return (                            
                        <div key={index} className="p-1 m-1 min-w-80 max-w-80">
                            <hgroup>
                                <h1 className="border-black-base border-b py-1 px-2">{item.name}</h1>
                            </hgroup>                                                            
                            <SortableContext
                                items           = {item.items}
                                strategy        = {verticalListSortingStrategy}
                            >
                                {item.items.map((itemCard) => (
                                    <Card key={itemCard.id} item={itemCard}/>
                                ))}
                            </SortableContext>
                        </div>
                    );
                })}
            </main>
        </DndContext>
    )
}

export default App;
