import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import Form from "./Form";

const NewCardPage =() => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ front: "", back: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (error) {
        console.log("Cannot load deck.", error);
      }
    }

    loadData();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const card = {
        ...formData,
        deckId: deck.id,
      };
      await createCard(deckId, card);
      setFormData({ front: "", back: "" });
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.log("Cannot create card", error);
    }
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h1>{deck.name}: Add Card</h1>

      {/* Card form component goes here. */}
      <Form
        deckid={deckId}
        card={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}

export default NewCardPage;
