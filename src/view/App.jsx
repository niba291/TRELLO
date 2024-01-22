// IMPORT===================================================================================================================
import { useState, useRef }                                                                     from "react";
// import { JSONPath }                                                                             from "jsonpath-plus";
// COMPONENTS===============================================================================================================
import { DragDropContext, Droppable, Draggable }                                                from "react-beautiful-dnd";
import { Button }                                                                               from "../components/Buttons";
import { Container }                                                                            from "../components/Container";

function App() {

    const dialog                    = useRef();
    const [element, setElement]     = useState({
        id                          : "",
        name                        : "",
        description                 : ""
    });
    const [idCont, setIdCont]       = useState("");
    // const [labels, setLabels]       = useState([
    //     "New project",
    //     "Done",
    //     ""
    // ]);
    const [data, setData]           = useState([
        {
            id                      : "A",
            name                    : "name 1",
            items                   : [
                {
                    id              : "1", 
                    name            : "test 1",
                    // labels          : ["test", "test2"],
                    // members         : ["niba"] 
                },
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
        },
        {
            id                      : "C",
            name                    : "name 3",
            items                   : [
                {id: 7, name: "test"},
            ]
        }
    ]);

    const handleDragEnd             = (result) => {
        const { 
            source, 
            destination,
            type
        }                           = result;
        const newData               = [...data];
        
        if(type === "group"){
            const [sourceGroup]     = newData.filter(item => item.id === source.droppableId);
            const [destinationGroup]= destination ? data.filter(item => item.id === destination.droppableId) : { ...sourceGroup };
            const moving            = sourceGroup.items[source.index];
            sourceGroup.items.splice(source.index, 1);
            destinationGroup.items.splice(destination.index, 0, moving);
        }
        if(type === "container"){
            const moving            = newData[source.index];
            newData.splice(source.index, 1);
            newData.splice(destination.index, 0, moving);
        }

        setData(newData);
    };

    return (
        <main className="container flex flex-wrap p-1">
            <DragDropContext onDragEnd={handleDragEnd}>
                {data.map((item, index) => {
                    return (  
                        <Droppable droppableId={`container-${item.id}`} type="container" key={`${item.id}-container-${index}`}>
                            {(provided) => (
                                <article {...provided.droppableProps} ref={provided.innerRef}>
                                    <Draggable draggableId={`${index}-container-${item.id}`} index={index} key={`${index}-container-${item.id}`}>
                                        {(provided) => (
                                            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                <Container key={index} id={item.id} name={item.name} items={item.items} handleAddElement={()=> {                                                    
                                                    setIdCont(item.id);
                                                    setElement({
                                                        id              : new Date().valueOf(), 
                                                        name            : "Name",
                                                        description     : ""
                                                    });
                                                    dialog.current.showModal();
                                                }}></Container>
                                            </div>
                                        )}
                                    </Draggable>
                                </article>
                            )}
                        </Droppable>                        
                    );
                })}
            </DragDropContext>
            <dialog className="p-2 rounded shadow-lg z-10 border min-w-[40%] min-h-[95%]" ref={dialog}>
                <div className="p-2 flex flex-wrap justify-between">
                    <input 
                        className="font-bold text-lg text-black-base border-b border-black-base outline-none w-[95%]" 
                        value={element.name} 
                        onInput={(e) => {
                            const aux           = {...element};
                            aux.name            = e.target.value;
                            setElement(aux);
                        }}
                    />
                    <button className="hover:opacity-80 w-[4%]" onClick={() => {dialog.current.close();}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                            <path fill="#222" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
                {/* {element.labels &&
                    <div className="p-2">
                        <div className="flex flex-wrap">
                            {element.labels.map((label, key) => (
                                <div className="inline-flex items-center justify-center rounded-full px-2 text-sm bg-slate-400 text-white mr-1" key={key}>
                                    {label}
                                </div>
                            ))}
                        </div>
                        <Button className="!py-0" onClick={() => {
                            const aux   = {...element};
                            aux.labels  = [];
                            setElement(aux);
                        }}>
                            +
                        </Button>
                    </div>
                } */}
                <div className="p-2">
                    <h1 className="font-bold">Description</h1>
                    <textarea 
                        cols="30" 
                        rows="10" 
                        className="w-full border p-2 rounded my-1 border-black-base" 
                        placeholder="Add a more details" 
                        onInput={(e) => {
                            const aux           = {...element};
                            aux.description = e.target.valuel
                            setElement(aux);
                        }}
                        value={element.description}
                    >
                    </textarea>
                </div>
                <div className="px-2">
                    <Button className="!w-full !my-1" onClick={() => {
                        const newData               = [...data];
                        const [auxElement]          = newData.filter(element => element.id === idCont);
                        auxElement.items.push(element);
                        setData(newData);
                        dialog.current.close();
                    }}>
                        Save
                    </Button>
                </div>
                {/* <div className="w-[30%] text-right px-2">
                    <button className="hover:opacity-80 w-[4%] mx-2" onClick={() => {dialog.current.close();}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                            <path fill="#222" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clipRule="evenodd"/>
                        </svg>
                    </button>
                    <div className="flex flex-col">
                        <Button className="!w-full !my-1" onClick={() => {
                            const aux   = {...element};
                            aux.labels  = [];
                            setElement(aux);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="mr-2">
                                <path fill="white" fillRule="evenodd" d="M2.123 12.816c.287 1.003 1.06 1.775 2.605 3.32l1.83 1.83C9.248 20.657 10.592 22 12.262 22c1.671 0 3.015-1.344 5.704-4.033 2.69-2.69 4.034-4.034 4.034-5.705 0-1.67-1.344-3.015-4.033-5.704l-1.83-1.83c-1.546-1.545-2.318-2.318-3.321-2.605-1.003-.288-2.068-.042-4.197.45l-1.228.283c-1.792.413-2.688.62-3.302 1.233-.613.614-.82 1.51-1.233 3.302l-.284 1.228c-.491 2.13-.737 3.194-.45 4.197m8-5.545a2.017 2.017 0 1 1-2.852 2.852 2.017 2.017 0 0 1 2.852-2.852m8.928 4.78-6.979 6.98a.75.75 0 0 1-1.06-1.061l6.978-6.98a.75.75 0 0 1 1.061 1.061" clipRule="evenodd"/>
                            </svg>
                            Add labels
                        </Button>
                        <Button className="!w-full !my-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="mr-2">
                                <path fill="currentColor" d="M17.29 11.969a1.33 1.33 0 0 1-1.322 1.337 1.33 1.33 0 0 1-1.323-1.337 1.33 1.33 0 0 1 1.323-1.338c.73 0 1.323.599 1.323 1.338"/>
                                <path fill="currentColor" fillRule="evenodd" d="M18.132 7.408c-.849-.12-1.942-.12-3.305-.12H9.173c-1.363 0-2.456 0-3.305.12-.877.125-1.608.393-2.152 1.02-.543.628-.71 1.397-.716 2.293-.006.866.139 1.962.319 3.329l.365 2.771c.141 1.069.255 1.933.432 2.61.185.704.457 1.289.968 1.741.51.452 1.12.648 1.834.74.687.088 1.55.088 2.615.088h4.934c1.065 0 1.928 0 2.615-.088.715-.092 1.323-.288 1.834-.74.511-.452.783-1.037.968-1.741.177-.677.291-1.542.432-2.61l.365-2.771c.18-1.367.325-2.463.319-3.33-.007-.895-.172-1.664-.716-2.291-.544-.628-1.275-.896-2.152-1.021M6.052 8.732c-.726.104-1.094.292-1.34.578-.248.285-.384.678-.39 1.42-.005.762.126 1.765.315 3.195l.05.38.371-.273c.96-.702 2.376-.668 3.288.095l3.384 2.833c.32.268.871.318 1.269.084l.235-.138c1.125-.662 2.634-.592 3.672.19l1.832 1.38c.09-.496.171-1.105.273-1.876l.352-2.675c.189-1.43.32-2.433.314-3.195-.005-.742-.141-1.135-.388-1.42-.247-.286-.615-.474-1.342-.578-.745-.106-1.745-.107-3.172-.107h-5.55c-1.427 0-2.427.001-3.172.107" clipRule="evenodd"/>
                                <path fill="currentColor" d="M8.859 2h6.282c.21 0 .37 0 .51.015a2.623 2.623 0 0 1 2.159 1.672H6.19a2.623 2.623 0 0 1 2.159-1.672c.14-.015.3-.015.51-.015M6.88 4.5c-1.252 0-2.278.84-2.62 1.954a2.814 2.814 0 0 0-.021.07c.358-.12.73-.2 1.108-.253.973-.139 2.202-.139 3.629-.139h6.203c1.427 0 2.656 0 3.628.139.378.053.75.132 1.11.253a2.771 2.771 0 0 0-.021-.07C19.553 5.34 18.527 4.5 17.276 4.5z"/>
                            </svg>
                            Add Image
                        </Button>
                        <Button className="!w-full !my-1">
                            Save
                        </Button>
                    </div>
                </div> */}
            </dialog>
        </main>
    )
}

export default App;
