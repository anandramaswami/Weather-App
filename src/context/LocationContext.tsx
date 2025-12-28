import { createContext, useState } from "react";

type LocationContextType = {
    location : string,
    setLocation : (location : string) => void
}

export const LocationContext = createContext<LocationContextType>({location : "", setLocation : () => {}})

export const LocationProvider = ({children}:{children:React.ReactNode}) => {
    const [location, setLocation] = useState("")

    return(
        <LocationContext.Provider value={{location,setLocation}}>
            {children}
        </LocationContext.Provider>
    )
}