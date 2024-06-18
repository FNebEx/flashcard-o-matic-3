import React from 'react';
import { useNavigate } from "react-router-dom";

const Form = ({ deckid, card, canEdit, handleSubmit, handleInputChange }) => {

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="card-front">Front</label>
        <textarea
          name="front"
          className="form-control"
          placeholder="Front Side of the Card"
          value={card && card.front}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="card-back">Back</label>
        <textarea
          name="back"
          className="form-control"
          placeholder="Back Side of the Card"
          value={card && card.back}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => navigate(`/decks/${deckid}`)}
      >
        {!canEdit ? "Done" : "Cancel"}
      </button>
      <button className="btn btn-primary ml-2" type="submit">
        {!canEdit ? "Save" : "Submit"}
      </button>
    </form>
  );
}

export default Form;
