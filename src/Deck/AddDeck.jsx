import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function AddDeck() {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deck = {
      ...formData,
    };

    try {
      const addedDeck = await createDeck(deck);
      navigate(`/decks/${addedDeck.id}`);
    } catch (error) {
      console.log("Cant' create new deck", error);
    }
  };

  return (
    <React.Fragment>
      <h1>Create Deck</h1>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>

      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Deck Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder="Deck Description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button
          className="btn btn-secondary mr-2"
          type="button"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default AddDeck;
