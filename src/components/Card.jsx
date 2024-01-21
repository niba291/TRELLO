// IMPORT===================================================================================================================
// import { useSortable }                                                                          from "@dnd-kit/sortable";
// import { CSS }                                                                                  from "@dnd-kit/utilities";
// COMPONENTS===============================================================================================================
export function Card({item}) {
    return (
        <article className={`px-2 py-1 my-1 rounded border-gray-base border bg-white`}>
            {/* <input type="text" value={item.name} onInput={() => {}}/> */}
            <h1>{item.id}</h1>
        </article>
    );
}