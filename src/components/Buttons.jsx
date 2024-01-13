export function Button(props) {
    return (
        <button 
            className="bg-black-base text-white hover:opacity-75 px-3 py-[0.3rem] rounded flex flex-wrap mb-5 md:mb-0 w-16 md:w-auto justify-center"
            {...props}
        >
            {props.children}
        </button>
    )
}