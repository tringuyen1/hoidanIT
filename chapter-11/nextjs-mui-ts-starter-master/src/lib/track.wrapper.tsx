"use client"

import { createContext, useContext, useState } from "react";

const initValue = {
     _id: "",
     title: "",
     description: "",
     category: "",
     imgUrl: "",
     trackUrl: "",
     countLike: 0,
     countPlay: 0,
     uploader: {
          _id: "",
          email: "",
          name: "",
          role: "",
          type: "",
     },
     isDeleted: false,
     createAt: "",
     updateAt: "",
     isPlaying: false
}

export const TrackContext = createContext({})

export const TrackContextProvider = ({ children }: { children: React.ReactNode; }) => {
     const [currentTrack, setCurrentTrack] = useState(initValue)

     const tempValue = {
          currentTrack,
          setCurrentTrack
     }



     return (
          <>
               <TrackContext.Provider value={tempValue} >
                    {children}
               </TrackContext.Provider >
          </>
     )
}

export const useTrackContext = () => useContext(TrackContext);

