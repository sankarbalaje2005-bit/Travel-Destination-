const continentBackgrounds = {
  Asia: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
  Europe:
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80",
  Africa:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
  "North America":
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=80",
  "South America":
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1000&q=80",
  Oceania:
    "https://images.unsplash.com/photo-1507699622108-4be3abc7b8a6?auto=format&fit=crop&w=1000&q=80",
  Antarctica:
    "https://images.unsplash.com/photo-1551415923-a2297c7fda79?auto=format&fit=crop&w=1000&q=80",
};

const featuredImages = {
  1: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85",
  2: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85",
  3: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=85",
  4: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=1000&q=85",
};

function DestinationCard({ destination, isShortlisted, onToggleShortlist }) {
  const continentClass = destination.continent
    .toLowerCase()
    .replace(/\s+/g, "-");

  const image =
    featuredImages[destination.id] ||
    continentBackgrounds[destination.continent] ||
    continentBackgrounds.Oceania;

  return (
    <article
      className={`destination-card continent-${continentClass}`}
      style={{ "--card-image": `url("${image}")` }}
    >
      <div className="card-photo" aria-hidden="true" />
      <div className="card-shade" aria-hidden="true" />

      <div className="card-topline">
        <div className="destination-emoji" aria-hidden="true">
          {destination.emoji || "🌍"}
        </div>

        <button
          className={`heart-button ${isShortlisted ? "is-saved" : ""}`}
          type="button"
          onClick={() => onToggleShortlist(destination.id)}
          aria-label={
            isShortlisted
              ? `Remove ${destination.country} from shortlist`
              : `Add ${destination.country} to shortlist`
          }
          aria-pressed={isShortlisted}
        >
          {isShortlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="destination-content">
        <p className="continent">
          <span className="continent-dot" />
          {destination.continent}
        </p>

        <h2>
          {destination.city}
          <span className="title-comma">,</span>{" "}
          <span className="country-name">{destination.country}</span>
        </h2>

        <p className="destination-description">{destination.description}</p>

        <button
          className={`shortlist-button ${isShortlisted ? "shortlisted" : ""}`}
          type="button"
          onClick={() => onToggleShortlist(destination.id)}
        >
          <span>
            {isShortlisted ? "Saved to shortlist" : "Add to shortlist"}
          </span>
          <span className="button-arrow" aria-hidden="true">
            {isShortlisted ? "✓" : "↗"}
          </span>
        </button>
      </div>
    </article>
  );
}

export default DestinationCard;
