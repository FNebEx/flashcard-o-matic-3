import React from 'react';

import { Link } from "react-router-dom";

function Deck({ name, cards, description, id, deleteDeck }) {
  return (
    <div className="card mt-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{name}</h5>
          <span className="text-muted">{cards && cards.length} cards</span>
        </div>
        <p className="card-text">{description}</p>

        {/* Links */}
        <div className="d-flex">
          <div className="">
            <Link className="btn btn-secondary mr-2" to={`/decks/${id}`}>
              View
            </Link>
            <Link className="btn btn-primary mr-2" to={`/decks/${id}/study`}>
              Study
            </Link>
          </div>
          <button className="btn btn-danger" onClick={() => deleteDeck(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deck;
