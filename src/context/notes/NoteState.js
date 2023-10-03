import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
  const host = "http://localhost:5000";
    const noteItem = []

    const [notes, setNotes] = useState(noteItem);
        
        //Get all notes
        const getNotes = async()=>{
          //API call
          //fetch api call
          // Default options are marked with *
          const response = await fetch(`${host}/api/notes/getnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTg3ZGEyMzg5NGJjNjk4MmNmZTE2NSIsImlhdCI6MTY5NjEwMzg0Mn0.7Foj__Q7q3V01IGM5gJU003vBV28GROvvuTtEuESYz8"
            }
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          const json = await response.json();
          console.log(json);
          setNotes(json);  
        }
        //ADD a note
        const addNote = async(n)=>{
          //API call
          //fetch api call
          // Default options are marked with *
          const response = await fetch(`${host}/api/notes/createnotes`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTg3ZGEyMzg5NGJjNjk4MmNmZTE2NSIsImlhdCI6MTY5NjEwMzg0Mn0.7Foj__Q7q3V01IGM5gJU003vBV28GROvvuTtEuESYz8"
            },
            body: JSON.stringify({title:n.title, description:n.description, tag:n.tag}), // body data type must match "Content-Type" header
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          console.log("Adding a new note")
          const note = await response.json();
          
          setNotes(notes.concat(note))  
        }
        //Delete a note
        const deleteNote = async (id)=>{
          //TODO API call
          console.log("Deleting note" , id)
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTg3ZGEyMzg5NGJjNjk4MmNmZTE2NSIsImlhdCI6MTY5NjEwMzg0Mn0.7Foj__Q7q3V01IGM5gJU003vBV28GROvvuTtEuESYz8"
            }
          });
          const json = await response.json();
          console.log(json)
          const newNote = notes.filter((note)=>{return note._id !== id});
          setNotes(newNote);
        }
        //Edit a note
        const editNote = async(id, title, description, tag)=>{
          console.log("note is editing..")
          //API call
          //fetch api call
          // Default options are marked with *
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTg3ZGEyMzg5NGJjNjk4MmNmZTE2NSIsImlhdCI6MTY5NjEwMzg0Mn0.7Foj__Q7q3V01IGM5gJU003vBV28GROvvuTtEuESYz8"
            },
            body: JSON.stringify({title: title, description: description, tag: tag}), // body data type must match "Content-Type" header
          });
          // return response.json(); // parses JSON response into native JavaScript objects
          const json = await response.json();
          console.log(json)

          //logic to implement edit operation in clint
          const eNote = await JSON.parse(JSON.stringify(notes));
          for (let index = 0; index < eNote.length; index++) {
            const element = eNote[index];
            if(element._id === id){
              eNote[index].title = title;
              eNote[index].description = description;
              eNote[index].tag = tag;
              break;
            }
          }
          console.log(eNote)
          setNotes(eNote)
        
        }

    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;