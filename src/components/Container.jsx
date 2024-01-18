// IMPORT===================================================================================================================
// import { useDroppable }                                                                         from "@dnd-kit/core";
// COMPONENTS===============================================================================================================
// import { SortableContext, verticalListSortingStrategy }                                         from "@dnd-kit/sortable";
import { Card }                                                                                 from "../components/Card";
export function Container(props) {
    
    const { id, name, items } = props;

    // const { setNodeRef } = useDroppable({id});
  
    return (
        <div className="p-1 m-1 min-w-80 max-w-80">
            <hgroup>
                <h1 className="border-black-base border-b py-1 px-2">{name}</h1>
            </hgroup>      
            <div>
                {items.map((itemCard) => (
                    <Card key={itemCard.id} item={itemCard}/>
                ))}
            </div>                                                      
            {/* <SortableContext
                id              = {id}
                items           = {items}
                strategy        = {verticalListSortingStrategy}
            >
                
            </SortableContext> */}
        </div>
    );
  }
  