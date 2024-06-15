import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";

function DeckDetailsPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [pageError, setPageError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
      } catch (error) {
        console.log("Card read deck", error);
        setPageError(true);
      }
    }

    loadData();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleDeckDelete = async (id) => {
    const abortController = new AbortController();

    try {
      if (window.confirm("Are you sure?")) {
        await deleteDeck(id, abortController.signal);
        navigate("/");
      }
    } catch (error) {
      console.log("Can't delete deck", error);
    }
  };
  
  const handleCardDelete = async (id) => {
    const abortController = new AbortController();
    
    try {
      if (window.confirm("Are you sure?")) {
        await deleteCard(id, abortController.signal);
        navigate("/");
      }
    } catch (error) {
      console.log("Cannot delete card.", error);
    }
  };

  if (pageError) {
    return <h1>Deck does not exist</h1>;
  }

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item active">{deck && deck.name}</li>
        </ol>
      </nav>

      <h1>{deck && deck.name}</h1>
      <p>{deck && deck.description}</p>

      {/* Links */}
      <div className="d-flex justify-content-between">
        <div>
          <Link className="btn btn-secondary mr-2" to={`/decks/${deckId}/edit`}>
            Edit
          </Link>
          <Link className="btn btn-primary mr-2" to={`/decks/${deckId}/study`}>
            Study
          </Link>
          <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
            Add Cards
          </Link>
        </div>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => handleDeckDelete(deckId)}
        >
          Delete
        </button>
      </div>

      {/* Cards */}
      {deck && deck.cards && deck.cards.length !== 0 ? (
        deck &&
        deck.cards.map((card) => (
          <div key={card.id} className="card mt-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>{card.front}</div>
                <div>{card.back}</div>
              </div>
              <div className="d-flex justify-content-end mt-2">
                <Link
                  className="btn btn-secondary mr-2"
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleCardDelete(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-3">
          <h3>Empty deck. Please add a card.</h3>
        </div>
      )}
    </React.Fragment>
  );
}

export default DeckDetailsPage;
