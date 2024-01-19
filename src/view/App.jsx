// IMPORT===================================================================================================================
import { useState }                                                                             from "react";
// import { JSONPath }                                                                             from "jsonpath-plus";
// COMPONENTS===============================================================================================================
import { DragDropContext }                                                                      from "react-beautiful-dnd";
import { Container }                                                                            from "../components/Container";
import { JSONPath } from "jsonpath-plus";

function App() {

    const [data, setData]           = useState([
        {
            id                      : "A",
            name                    : "name 1",
            items                   : [
                {id: 1, name: "test 1"},
                {id: 2, name: "test 2"},
                {id: 3, name: "test 3"},
            ]
        },
        {
            id                      : "B",
            name                    : "name 2",
            items                   : [
                {id: 4, name: "test"},
                {id: 5, name: "test 2"},
                {id: 6, name: "test 3"},
            ]
        }
    ]);

    // const handleDragEnd             = (result) => {
    //     const { 
    //         source, 
    //         destination 
    //     }                           = result;
    //     const pathSource            = JSONPath({
    //         json                    : data,
    //         path                    : `$.[?(@.id=='${source.droppableId}')].items[${source.index}]`,
    //         resultType              : "pointer"
    //     })[0].split("/");
    //     const pathDestination       = JSONPath({
    //         json                    : data,
    //         path                    : `$.[?(@.id=='${destination.droppableId}')].items[${destination.index}]`,
    //         resultType              : "pointer"
    //     })[0].split("/");

    //     pathSource.shift();
    //     pathDestination.shift();

    //     const itemsSource           = JSONPath({
    //         json                    : data,
    //         path                    : `$.[${pathSource.slice(0, pathSource.length - 1).join("][")}]`,
    //     })[0];
    //     const itemsDestination      = JSONPath({
    //         json                    : data,
    //         path                    : `$.[${pathDestination.slice(0, pathSource.length - 1).join("][")}]`,
    //     })[0];
    //     const element               = JSONPath({
    //         json                    : data,
    //         path                    : `$.[${pathSource.join("][")}]`,
    //     })[0];
        
    //     if(pathSource[0] === pathDestination[0]){
    //         let auxData             = itemsSource.filter((item, index) => index !== source.index);
    //         data[pathSource[0]].items = [
    //             ...auxData.slice(0, destination.index),
    //             element,
    //             ...auxData.slice(destination.index)
    //         ];
    //     }else{
    //         let auxData             = itemsSource.filter((item, index) => index !== source.index);
    //         data[pathSource[0]].items = auxData;
    //         data[pathDestination[0]].items = [
    //             ...itemsDestination.slice(0, destination.index),
    //             element,
    //             ...itemsDestination.slice(destination.index)
    //         ];
    //     }

    //     setData(data);

    // };

    const handleDragEnd             = (result) => {
        // const { draggableId, source, destination } = val;

        // const [sourceGroup] = data.filter(
        //     column => column.groupName === source.droppableId
        // );

        // const [destinationGroup] = destination ? data.filter(column => column.groupName === destination.droppableId) : { ...sourceGroup };


        // const [movingTask] = sourceGroup.items.filter(t => t.id === draggableId);

        // const newSourceGroupTasks = sourceGroup.items.splice(source.index, 1);
        // const newDestinationGroupTasks = destinationGroup.tasks.splice(
        //     destination.index,
        //     0,
        //     movingTask
        // );

        // const newTaskList = data.map(column => {
        //     if (column.groupName === source.groupName) {
        //         return {
        //         groupName: column.groupName,
        //         tasks: newSourceGroupTasks
        //         };
        //     }
        //     if (column.groupName === destination.groupName) {
        //         return {
        //         groupName: column.groupName,
        //         tasks: newDestinationGroupTasks
        //         };
        //     }
        //     return column;
        // });

        console.log(newTaskList);

        // setData(newTaskList);
    };

    return (
        <main className="container flex flex-wrap">
            <DragDropContext onDragEnd={handleDragEnd}>
                {data.map((item, index) => {
                    return (                          
                        <Container key={index} id={item.id} name={item.name} items={item.items}></Container>
                    );
                })}
            </DragDropContext>
        </main>
    )
}

export default App;
