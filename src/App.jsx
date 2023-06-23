import "./App.css";
import movies from "./movies.json";
import Header from "./components/Header";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { useState, useEffect } from "react";

function App() {
  const [moviesArray, setMoviesArray] = useState(movies);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [modalState, setModalState] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const getMovieDetail = (e) => {
    if (e.target.dataset.select) {
      setSelectedMovie(selectMovieLine(e.target.dataset.select));

      setModalState(true);
      setIsActive(true);
    }
  };

  function selectMovieLine(filmId) {
    return moviesArray.filter((movie) => {
      return movie.Id == filmId;
    })[0];
  }

  function deleteLine(e) {
    setModalState(false);
    if (e.target.dataset.delete) {
      setSelectedMovie(selectMovieLine(e.target.dataset.delete));
      console.log(selectedMovie);
    }
    setMoviesArray(
      moviesArray.filter((item) => item.Title !== selectedMovie.Title)
    );
  }

  function sortByTitle(arr, propertyName, order = "ascending") {
    const sortedArr = [...arr].sort((a, b) => {
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      return 0;
    });

    if (order === "descending") {
      return sortedArr.reverse();
    }

    return sortedArr;
  }

  function handleHeaderTitleClick() {
    setMoviesArray(sortByTitle(moviesArray, "Title"));
  }

  function handleHeaderRatingClick() {
    setMoviesArray(sortByTitle(moviesArray, "IMDB_Rating", "descending"));
  }

  function refresh() {
    setMoviesArray(movies);
  }
  function getInputValue(event) {
    setSearchValue(event.target.value);
    console.log(searchValue);
  }

  function search() {
    const searchedMovieArray = moviesArray.filter((film) => {
      if (
        film.Title &&
        film.Title.toString()
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      ) {
        return film;
      }
    });
    setMoviesArray(searchedMovieArray);
    console.log(moviesArray);
  }

  function deleteSearch() {
    setSearchValue("");
    setMoviesArray(movies);
  }

  function getModalHtml() {
    setModalState(true);
  }
  function closeModal() {
    setModalState(false);
    setIsActive(false);
  }

  function stepForward() {
    setSelectedMovie(() =>
      moviesArray.filter((movie) => movie.Id === selectedMovie.Id + 1)
    );
  }
  function stepBackward() {}

  const tableStyle = {
    fontWeight: "500",
  };
  const moviesComponent = moviesArray.map((film) => {
    return (
      <Table
        key={film.Id}
        title={film.Title}
        duration={film.Running_Time_min}
        release={film.Release_Date}
        rating={film.IMDB_Rating}
        id={film.Id}
        handleSelectFilm={getMovieDetail}
        handleLineDelete={deleteLine}
        style={tableStyle}
        isActive={isActive}
      />
    );
  });

  const lineStyle = {
    color: "#fff",
    textTransform: "uppercase",
    backgroundColor: "#F24405",
    fontFamily: "Francois One",
  };

  return (
    <div className="App">
      <Header
        handleRefresh={refresh}
        fillInput={getInputValue}
        value={searchValue}
        handleSearch={search}
        deleteSearch={deleteSearch}
      />

      <div className="modal--wrapper">
        <Modal
          key="key"
          title={selectedMovie.Title}
          director={selectedMovie.Director}
          distributor={selectedMovie.Distributor}
          productionBudget={selectedMovie.Production_Budget}
          gross={selectedMovie.Worldwide_Gross}
          isModalOn={modalState}
          handleModalClose={closeModal}
          handleBackward={stepBackward}
          handleForward={stepForward}
        />
      </div>
      <Table
        style={lineStyle}
        title="Cím &#8681;"
        duration="Hossz"
        release="Megjelenés dátuma"
        rating="Értékelés   &#8679;"
        delete="Törlés"
        handleClickTitle={handleHeaderTitleClick}
        handleClickRating={handleHeaderRatingClick}
      />
      {moviesComponent}
    </div>
  );
}

export default App;
