// IMPORT===================================================================================================================
// import { useSortable }                                                                          from "@dnd-kit/sortable";
// import { CSS }                                                                                  from "@dnd-kit/utilities";
// COMPONENTS===============================================================================================================
import { Droppable }                                                                            from "react-beautiful-dnd";
export function Card({id, item}) {
    return (
        <Droppable droppableId={id}>
            {(provided) => {
                return(
                    <article className={`px-2 py-1 my-1 rounded border-gray-base border bg-white`} {...provided.droppableProps} ref={provided.innerRef}>
                        {/* <input type="text" value={item.name} onInput={() => {}}/> */}
                        <h1>{item.name}</h1>
                    </article>
                );
            }}
        </Droppable>
    );
}