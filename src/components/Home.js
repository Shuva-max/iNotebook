import React from 'react';
import Form from './Form';
import Notes from './Notes';

export default function Home() {

  return (
    <div>
      <h2>Add a Note</h2>

      <Form username="E-mail" password="password" />

      <Notes/>
    </div>
  )
}
