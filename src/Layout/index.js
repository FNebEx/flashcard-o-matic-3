import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Deck/DeckList";
import AddDeck from "../Deck/AddDeck";
import DeckDetailsPage from "../Deck/DeckDetailsPage";
import DeckEditPage from "../Deck/DeckEditPage";
import DeckStudyPage from "../Deck/DeckStudyPage";
import NewCardPage from "../Card/NewCardPage";
import EditCardPage from "../Card/EditCardPage";
import { Routes, Route } from "react-router-dom";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route path="/" element={<DeckList />} />
          <Route path="/decks/new" element={<AddDeck />} />
          <Route path="/decks/:deckId" element={<DeckDetailsPage />} />
          <Route path="/decks/:deckId/edit" element={<DeckEditPage />} />
          <Route path="/decks/:deckId/study" element={<DeckStudyPage />} />
          <Route path="/decks/:deckId/cards/new" element={<NewCardPage />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<EditCardPage />}
          />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default Layout;
