import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function DeckEditPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
        setFormData({ name: data.name, description: data.description });
      } catch (error) {
        console.log("Cannot load deck", error);
      }
    }

    loadData();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleInputChange = (event) => {
    const { target } = event;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedDeck = {
      ...formData,
      id: deckId,
    };

    try {
      const editedDeck = await updateDeck(updatedDeck);
      navigate(`/decks/${editedDeck.id}`);
    } catch (error) {
      console.log("Cannot update deck.", error);
    }
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <h1>Edit Deck</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            defaultValue={deck.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            defaultValue={deck.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <Link className="btn btn-secondary mr-2" to={"/"}>
          Cancel
        </Link>
        <button className="btn btn-primary">Submit</button>
      </form>
    </React.Fragment>
  );
}

export default DeckEditPage;
