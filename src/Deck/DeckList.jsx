import React from 'react';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";
import Deck from "./Deck";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const data = await listDecks(abortController.signal);
        setDecks(data);
      } catch (error) {
        console.log("Cant load decks", error);
      }
    }

    loadData();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleDelete = async (id) => {
    const abortController = new AbortController();

    try {
      if (window.confirm("Are you sure?")) {
        await deleteDeck(id, abortController.signal);
        setDecks(decks.filter((deck) => deck.id !== id));
      }
    } catch (error) {
      console.log("Cannot delete deck", error);
    }
  };

  return (
    <React.Fragment>
      <Link className="btn btn-success" to={`/decks/new`}>
        Create Deck
      </Link>
      {decks.length === 0 ? (
        <div className="mt-3">
          <h2>No decks. Create a deck.</h2>
        </div>
      ) : (
        decks.map((deck) => (
          <Deck
            key={deck.id}
            name={deck.name}
            description={deck.description}
            id={deck.id}
            cards={deck.cards}
            deleteDeck={handleDelete}
          />
        ))
      )}
    </React.Fragment>
  );
}

export default DeckList;
