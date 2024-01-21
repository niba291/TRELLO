// IMPORT===================================================================================================================
// import { useDroppable }                                                                         from "@dnd-kit/core";
// COMPONENTS===============================================================================================================
// import { SortableContext, verticalListSortingStrategy }                                         from "@dnd-kit/sortable";
import { Card }                                                                                 from "../components/Card";
import { Button }                                                                               from "../components/Buttons";
import { Droppable, Draggable }                                                                 from "react-beautiful-dnd";

export function Container(props) {
    
    const { id, name, items, handleAddElement } = props;
  
    return (
        <Droppable droppableId={`${id}`} type="group">
            {(provided) => {
                return (
                    <div className="p-2 m-2 min-w-80 max-w-80 shadow-md rounded flex flex-wrap self-start" {...provided.droppableProps} ref={provided.innerRef}>
                        <hgroup className="flex border-black-base border-b py-1 px-2 mb-3 w-full">
                            <h1 className="w-[90%]">{name}</h1>
                            <button className="w-[10%]">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                                    <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth={1.5}
                                    d="M20 7H4m16 5H4m16 5H4"
                                    />
                                </svg>
                            </button>
                        </hgroup>      
                        <div className="w-full">
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
                        <div className="pt-2 w-full self-end">
                            <Button onClick={handleAddElement}>
                                Add element
                            </Button>
                        </div>
                    </div>
                );
            }}
        </Droppable>
    );
  }
  