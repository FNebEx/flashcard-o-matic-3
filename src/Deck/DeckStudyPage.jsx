import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
// import { getLCP } from "web-vitals";

function DeckStudyPage() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const navigate = useNavigate();

  let currentCard = [];
  let length = 0;

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

  if (deck && deck.cards) {
    currentCard = deck.cards[index];
    length = deck.cards.length;
  }

  const handleFlip = () => {
    setFlip(true);
  };

  const handleNext = () => {
    setIndex(index >= length - 1 ? 0 : index + 1);
    if (index === length - 1) {
      if (!window.confirm("Restart the deck?")) {
        navigate("/");
      }
    }
    setFlip(false);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>

      <h1>Study: Deck Name</h1>

      {/* Flip cards */}
      {length < 3 ? (
        <React.Fragment>
          <h3>Not enough cards</h3>
          <p>
            You need at least 3 cards to study. There are {length} cards this
            deck.{" "}
          </p>
          <Link className="btn btn-success" to={`/decks/${deckId}/cards/new`}>
            Add Card
          </Link>
        </React.Fragment>
      ) : (
        <div className="card">
          <div className="card-body">
            <h4>
              Card {index + 1} of {deck && length}
            </h4>
            <p>{flip ? currentCard.back : currentCard.front}</p>
            <button
              className="btn btn-secondary mr-2"
              onClick={handleFlip}
              disabled={flip}
            >
              Flip
            </button>
            {flip && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default DeckStudyPage;
