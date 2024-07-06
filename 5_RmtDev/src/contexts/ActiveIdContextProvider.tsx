import {createContext, PropsWithChildren} from "react";
import {useActiveId} from "../lib/hooks.ts";


type ActiveIdContextType = {
    activeId: number | null;
}
export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

export default function ActiveIdContextProvider({children}: PropsWithChildren) {
    const activeId = useActiveId();

    return <ActiveIdContext.Provider value={{activeId}}>

        {children}
    </ActiveIdContext.Provider>
}

