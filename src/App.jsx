import { useState } from "react";
import DestinationCard from "./components/DestinationCard";
import destinations from "./data/destinations";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [shortlistedIds, setShortlistedIds] = useState([]);

  const continents = [
    "All",
    ...new Set(destinations.map((destination) => destination.continent)),
  ];

  const filteredDestinations = destinations.filter((destination) => {
    const searchableText = [
      destination.city,
      destination.country,
      destination.continent,
    ]
      .join(" ")
      .toLowerCase();

    return (
      searchableText.includes(searchTerm.toLowerCase()) &&
      (selectedContinent === "All" ||
        destination.continent === selectedContinent)
    );
  });

  const shortlistedDestinations = destinations.filter((destination) =>
    shortlistedIds.includes(destination.id),
  );

  function handleToggleShortlist(id) {
    setShortlistedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  function resetFilters() {
    setSearchTerm("");
    setSelectedContinent("All");
  }

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">✈ Plan your next adventure</p>
        <h1>
          Travel Destination <span>Shortlist</span>
        </h1>
        <p className="hero-copy">
          Explore destinations around the world and create your personal
          shortlist.
        </p>
        <p className="shortlist-count">♥ {shortlistedIds.length} shortlisted</p>
        <p className="hero-note">Collect moments, not things.</p>
      </header>

      <div className="filter-controls">
        <label className="search-wrap">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>
          <span className="sr-only">Search destinations</span>
          <input
            className="search-input"
            type="search"
            placeholder="Search a country, capital, or continent..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search"
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <label className="select-wrap">
          <span className="sr-only">Filter by continent</span>
          <select
            className="continent-select"
            value={selectedContinent}
            onChange={(event) => setSelectedContinent(event.target.value)}
          >
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent === "All" ? "🌐 All continents" : continent}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="results-count">
        Showing {filteredDestinations.length} destinations
      </p>

      {filteredDestinations.length > 0 ? (
        <section className="destination-grid" aria-label="Destinations">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isShortlisted={shortlistedIds.includes(destination.id)}
              onToggleShortlist={handleToggleShortlist}
            />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">🧭</span>
          <p className="empty-title">No destinations found</p>
          <p className="empty-message">
            Try another search or reset your filters.
          </p>
          <button className="reset-search" type="button" onClick={resetFilters}>
            Show all destinations
          </button>
        </div>
      )}

      <section className="shortlist-section">
        <div className="shortlist-heading">
          <div>
            <p className="eyebrow">Your saved places</p>
            <h2>
              ♡ My <span>Shortlist</span>
            </h2>
          </div>
          <span className="shortlist-total">
            {shortlistedDestinations.length}{" "}
            {shortlistedDestinations.length === 1 ? "place" : "places"}
          </span>
        </div>

        {shortlistedDestinations.length > 0 ? (
          <div className="destination-grid">
            {shortlistedDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isShortlisted={true}
                onToggleShortlist={handleToggleShortlist}
              />
            ))}
          </div>
        ) : (
          <div className="empty-shortlist">
            <span className="empty-icon">✦</span>
            <div>
              <p className="empty-title">Your next adventure starts here</p>
              <p className="empty-message">
                Tap the heart on any destination you love, and it will be
                waiting here.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
