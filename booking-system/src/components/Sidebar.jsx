import { Bolt, CircleHelp, ChevronFirst, ChevronLast } from "lucide-react"
import { createContext, useState, useContext } from "react"

const SidebarContext = createContext();


export default function Sidebar ({children}) {
    const [expanded, setExpanded] = useState(true)

    return(
            <aside className="h-screen sticky top-0">
                <nav className="h-full flex flex-col bg-white dark:bg-negro-claro border-r dark:border-gray-700 shadow-sm">
                    <div className={`px-5 py-10 flex items-center border-b dark:border-gray-700 ${expanded ? "justify-between" : "justify-start"}`}>
                        <h1 className={`text-2xl text-center text-negro-claro dark:text-gray-200 font-bold overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}>Rivera Inn</h1>
                        <button onClick={() => setExpanded((curr) => !curr)} className="bg-gray-100 py-1 px-0.5 rounded-md">
                            {expanded ? <ChevronFirst/>  : <ChevronLast/>}
                        </button>
                    </div>
                    
                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 pl-3 pt-10 mr-4">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t dark:border-gray-700 flex flex-col px-3">
                    <SidebarContext.Provider value={{ expanded }}>
                        <SidebarItem icon={<CircleHelp size={20}/>} text="Empresa" />
                    </SidebarContext.Provider>
                    </div>
                </nav>

            </aside>
    )
}

export function SidebarItem({icon, text, active, onClick, children}){
    const {expanded} = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
        if(onClick){
            onClick()
        }
    }
    return(
        <>
            <li className={`list-none relative flex items-center text-base px-3 font-medium cursor-pointer
            transition-colors group ${active ? "bg-indigo-100 dark:bg-gray-600 text-negro-claro dark:text-gray-200 " : 
            "hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white"}`} 
            >
                {icon}
                <span className={`overflow-hidden transition-all py-3 ${expanded ? "w-40 ml-3" : "w-0"}`} onClick={handleClick}>{text}</span>
                {!expanded && (
                    <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm 
                    invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                        {text}
                    </div>
                )}
            </li>
            {isOpen && <div><ul className="dark:bg-gray-500 ">{children}</ul></div>}
        </>
    )
}