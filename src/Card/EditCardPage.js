import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import Form from "./Form";

const EditCardPage = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        const cardData = await readCard(cardId, abortController.signal);

        setDeck(deckData);
        setCard(cardData);
      } catch (error) {
        console.log("Cannot load card or deck", error);
      }
    }

    loadData();

    return () => {
      abortController.abort();
    };
  }, [deckId, cardId]);

  const handleInputChange = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await updateCard(card, abortController.signal);
      navigate(`/decks/${deckId}`)
    } catch (error) {
      console.log("Cannot update card", error);
    }
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <h1>Edit Card</h1>

      <Form
        canEdit
        deckid={deckId}
        card={card}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}

export default EditCardPage;
