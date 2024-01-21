// IMPORT===================================================================================================================
// import { useDroppable }                                                                         from "@dnd-kit/core";
// COMPONENTS===============================================================================================================
// import { SortableContext, verticalListSortingStrategy }                                         from "@dnd-kit/sortable";
import { Card }                                                                                 from "../components/Card";
import { Droppable, Draggable }                                                                 from "react-beautiful-dnd";

export function Container(props) {
    
    const { id, name, items } = props;
  
    return (
        <Droppable droppableId={`${id}`} type="group">
            {(provided) => {
                return (
                    <div className="p-1 m-1 min-w-80 max-w-80" {...provided.droppableProps} ref={provided.innerRef}>
                        <hgroup>
                            <h1 className="border-black-base border-b py-1 px-2">{name}</h1>
                        </hgroup>      
                        <div>
                            {items.map((itemCard, index) => {
                                return (
                                    <Draggable draggableId={`${itemCard.id}`} index={index} key={`${index}-${id}-${itemCard.id}}`}>
                                        {(provided) => (
                                            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                <Card id={`${id}${itemCard.id}`} item={itemCard}/>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    </div>
                );
            }}
        </Droppable>
    );
  }
  