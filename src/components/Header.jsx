export default function Header(props) {
  return (
    <div className="header--container">
      <div className="header">
        <h1>The ultimate movie app</h1>
        <button onClick={props.handleRefresh}>Frissítés</button>{" "}
      </div>

      <div className="form--container">
        <input
          type="search"
          placeholder="Írj be egy filmcímet"
          className="form--input"
          name="searchBar"
          value={props.value}
          onChange={props.fillInput}
        />
        <button className="form--button--search" onClick={props.handleSearch}>
          Keresés
        </button>
        <button className="form--button--clear" onClick={props.deleteSearch}>
          Keresés törlése
        </button>
      </div>
    </div>
  );
}
