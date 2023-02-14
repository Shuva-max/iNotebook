import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
    const noteItem = [
        {
            "_id": "63e7e50292d2d48532a0dc373",
            "user": "63e6827d3f6338f00fb47a13",
            "title": "my title updateed",
            "description": "GOOD MORNING is 2updated",
            "tag": "general",
            "date": "2023-02-11T18:57:06.886Z",
            "__v": 0
          },
          {
            "_id": "63e7e51f9s22d48532a0dc377",
            "user": "63e6827d3f6338f00fb47a13",
            "title": "good",
            "description": "Hello World!!",
            "tag": "yt",
            "date": "2023-02-11T18:57:35.556Z",
            "__v": 0
          },
        {
            "_id": "63e7e52092d2d48532a0dc379",
            "user": "63e6827d3f6338f00fb47a13",
            "title": "good",
            "description": "Hello World!!",
            "tag": "yt",
            "date": "2023-02-11T18:57:36.682Z",
            "__v": 0
          },
          {
            "_id": "63ef7e521922d48532a0dc37b",
            "user": "63e6827d3f6338f00fb47a13",
            "title": "good",
            "description": "Hello World!!",
            "tag": "yt",
            "date": "2023-02-11T18:57:37.631Z",
            "__v": 0
          },
          {
            "_id": "63e7e5421922dd48532a0dc37b",
            "user": "63e6827d3f6338f00fb47a13",
            "title": "good",
            "description": "Hello World!!",
            "tag": "yt",
            "date": "2023-02-11T18:57:37.631Z",
            "__v": 0
          },
          {
            "_id": "63e7e5dwn21922d48532a0dc37b",
            "user": "63e6827d3f6338f00fb47a13",
            "title": "good",
            "description": "Hello World!!",
            "tag": "yt",
            "date": "2023-02-11T18:57:37.631Z",
            "__v": 0
          },
          {
            "_id": "63e7e52192s2d48532a0dc37b",
            "user": "63e6827d3f6338f00fb47a13",
            "title": "good",
            "description": "Hello World!!",
            "tag": "yt",
            "date": "2023-02-11T18:57:37.631Z",
            "__v": 0
          }
        ]

    const [notes, setNotes] = useState(noteItem);
    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;