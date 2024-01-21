// IMPORT===================================================================================================================
// import { useSortable }                                                                          from "@dnd-kit/sortable";
// import { CSS }                                                                                  from "@dnd-kit/utilities";
// COMPONENTS===============================================================================================================
export function Card({item}) {
    return (
        <article className={`px-2 py-1 my-1 rounded border-black-base border bg-white`}>            
            <p className="w-[90%] py-1">{item.description}</p>
            <section>
                {item.labels && item.labels.map((label, key) => (
                    <div className="inline-flex items-center justify-center rounded-full px-2 text-sm bg-slate-400 text-white mr-1" key={key}>
                        {label}
                    </div>
                ))}
            </section>
        </article>
    );
}