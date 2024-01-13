// IMPORT===================================================================================================================
import { useSortable }                                                                          from "@dnd-kit/sortable";
import { CSS }                                                                                  from "@dnd-kit/utilities";
// COMPONENTS===============================================================================================================
export function Card({item}) {

    const {
        attributes, 
        listeners, 
        setNodeRef, 
        transform,
        transition
    }               = useSortable({
        id          : item.id,
    });

    const style     = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <article ref={setNodeRef} className="px-2 py-1 my-1 rounded border-gray-base border" style={style} {...listeners} {...attributes}>
            {item.name}
        </article>
    );
}