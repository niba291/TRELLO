// IMPORT===================================================================================================================
import { useState }                                                                             from "react";
// import { JSONPath }                                                                             from "jsonpath-plus";
// COMPONENTS===============================================================================================================
import { DragDropContext }                                                                      from "react-beautiful-dnd";
import { Container }                                                                            from "../components/Container";

function App() {

    const [data, setData]           = useState([
        {
            id                      : "A",
            name                    : "name 1",
            items                   : [
                {
                    id              : "1", 
                    description     : "test 1",
                    labels          : ["test", "test2"],
                    members         : ["niba"] 
                },
                {id: "2", description: "test 2"},
                {id: "3", description: "test 3"},
            ]
        },
        {
            id                      : "B",
            name                    : "name 2",
            items                   : [
                {id: "4", description: "test"},
                {id: "5", description: "test 2"},
                {id: "6", description: "test 3"},
            ]
        }
    ]);

    const handleDragEnd             = (result) => {
        const { 
            source, 
            destination 
        }                           = result;

        const newData               = [...data];
        const [sourceGroup]         = newData.filter(item => item.id === source.droppableId);
        const [destinationGroup]    = destination ? data.filter(item => item.id === destination.droppableId) : { ...sourceGroup };
        const moving                = sourceGroup.items[source.index];
        sourceGroup.items.splice(source.index, 1);
        destinationGroup.items.splice(destination.index, 0, moving);
        setData(newData);
    };

    return (
        <main className="container flex flex-wrap p-1">
            <DragDropContext onDragEnd={handleDragEnd}>
                {data.map((item, index) => {
                    return (                          
                        <Container key={index} id={item.id} name={item.name} items={item.items} handleAddElement={()=> {
                            const newData               = [...data];
                            const [element]             = newData.filter(element => element.id === item.id);
                            console.log(item.id);
                            element.items.push({
                                id              : "1", 
                                description     : "test 1",
                                labels          : ["test"],
                                members         : ["niba"] 
                            });
                            setData(newData);
                        }}></Container>
                    );
                })}
            </DragDropContext>
        </main>
    )
}

export default App;
