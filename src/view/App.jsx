// IMPORT===================================================================================================================
import { useState }                                                                             from "react";
// import { sortableKeyboardCoordinates, arrayMove }                                               from "@dnd-kit/sortable";
import { JSONPath }                                                                             from "jsonpath-plus";
// COMPONENTS===============================================================================================================
// import { 
//     DndContext, 
//     closestCorners, 
//     PointerSensor, 
//     useSensor, 
//     useSensors, 
//     KeyboardSensor, 
//     DragOverlay
// }                                                                                               from "@dnd-kit/core";
import { Container }                                                                            from "../components/Container";
import { Card }                                                                                 from "../components/Card";

function App() {

    const [active, setActive]       = useState();
    const [data, setData]           = useState([
        {
            id                      : 1,
            name                    : "name 1",
            items                   : [
                {id: 1, name: "test 1"},
                {id: 2, name: "test 2"},
                {id: 3, name: "test 3"},
            ]
        },
        {
            id                      : 2,
            name                    : "name 2",
            items                   : [
                {id: 4, name: "test"},
                {id: 5, name: "test 2"},
                {id: 6, name: "test 3"},
            ]
        }
    ]);

    // const handleDragStart           = (event) => {
    //     const jsonpath              = JSONPath({
    //         path                    : `$..items[?(@.id==${event.active.id})]`,
    //         json                    : data
    //     });

    //     if(jsonpath === undefined){
    //         return;
    //     }

    //     setActive(jsonpath[0]);
    // }

    // const handleDragEnd             = () => {
    //     setActive(null);
    // };

    // const handleDragOver            = (event) => {
    //     const jsonPathActive        = JSONPath({
    //         path                    : `$..items[?(@.id==${event.active.id})]`,
    //         json                    : data,
    //         resultType              : "pointer"
    //     })[0].split("/");
    //     const jsonPathOver          = JSONPath({
    //         path                    : `$..items[?(@.id==${event.over.id})]`,
    //         json                    : data,
    //         resultType              : "pointer"
    //     })[0].split("/");
    //     const idContainerActive     = parseInt(jsonPathActive[1]);
    //     const idContainerOver       = parseInt(jsonPathOver[1]);
    //     const idItemActive          = parseInt(jsonPathActive[jsonPathActive.length - 1]);
    //     const idItemOver            = parseInt(jsonPathOver[jsonPathOver.length - 1]);

    //     if(idContainerActive === idContainerOver){
    //         data[idContainerActive].items = arrayMove(data[idContainerActive].items, idItemActive, idItemOver);
    //     }else{
    //         data[idContainerOver].items.push(data[idContainerActive].items[idItemActive]);
    //         data[idContainerActive].items.splice(idItemActive, 1);
    //         // data[idContainerOver].items = arrayMove(data[idContainerOver].items, data[idContainerOver].items.length - 1, idItemOver);
    //     }

    //     setData(data);
    // }

    // const sensors = useSensors(
    //     useSensor(PointerSensor),
    //     useSensor(KeyboardSensor, {
    //       coordinateGetter: sortableKeyboardCoordinates
    //     })
    // );

    return (
        // <DndContext 
        //     collisionDetection      = {closestCorners}
        //     onDragStart             = {handleDragStart}
        //     onDragEnd               = {handleDragEnd}
        //     onDragOver              = {handleDragOver}
        //     sensors                 = {sensors}         
        // >
            
        // </DndContext>
        <main className="container flex flex-wrap">                
            {data.map((item, index) => {
                return (                            
                    <Container key={index} id={item.id} name={item.name} items={item.items}></Container>
                );
            })}
            {/* <DragOverlay>{active && <Card item={active}/>}</DragOverlay> */}
        </main>
    )
}

export default App;
