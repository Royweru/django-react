import React, { useEffect, useState } from "react";
import api from "../api";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };
  const deleteNote = (id: string) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted");
        else {
          alert("Failed to delete note");
        }
      })
      .catch((error) => console.log(error));
    window.location.reload();
  };
  const createNote = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post("/api/notes/", { content, title }).then((res) => {
      setContent("");
      setTitle("");
      if (res.status === 201) alert("Note created");
      else alert("Failed to create Note");
    });
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
      </div>
      <h2>Create Notes</h2>
      <form action="" onSubmit={createNote}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="contnet">Content</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};
