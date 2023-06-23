export default function Table(props) {
  return (
    <div
      className="table--container"
      onClick={props.handleSelectFilm}
      id={props.id}
      data-select={props.id}
      style={props.style}
    >
      <p onClick={props.handleClickTitle} data-select={props.id}>
        {props.title}
      </p>
      {props.duration ? (
        <p data-select={props.id}>{props.duration} (perc)</p>
      ) : (
        <p>Nem elérhető</p>
      )}
      <p data-select={props.id}>{props.release}</p>
      <p
        className={
          props.rating <= 3
            ? "red"
            : props.rating >= 4 && props.rating <= 7
            ? "black"
            : "green"
        }
        onClick={props.handleClickRating}
        style={props.style}
      >
        {props.rating ? props.rating : " -"}
      </p>
      <button
        data-delete={props.id}
        onClick={props.handleLineDelete}
        style={props.style}
      >
        Törlés
      </button>
    </div>
  );
}
