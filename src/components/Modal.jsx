export default function Modal(props) {
  let dollarSign = "$";

  return (
    <div
      className="modal--container"
      style={props.isModalOn ? { display: "block" } : { display: "none" }}
    >
      <div className="modal--details--container">
        <div className="modal--header">
          <button
            className="btn--prev"
            data-backward={props.id}
            onClick={props.handleBackward}
          >
            &#x2B9C;
          </button>
          <h2>{props.title}</h2>
          <button
            className="btn--next"
            data-forward={props.id}
            onClick={props.handleForward}
          >
            &#x2B9E;
          </button>
        </div>

        <div className="modal--details--wrapper">
          <p>Rendező: {props.director ? props.director : "Nem elérhető"}</p>
          <p>
            Forgalmazó: {props.distributor ? props.distributor : "Nem elérhető"}
          </p>
          <p>
            Költségvetés:{" "}
            {props.productionBudget
              ? props.productionBudget.toLocaleString(true) + dollarSign
              : "Nem elérhető"}
          </p>
          <p>
            Összbevétel:
            {props.Worldwide_Gross
              ? props.Worldwide_Gross.toLocaleString(true) + dollarSign
              : "Nem elérhető"}
          </p>
        </div>

        <button type="button" onClick={props.handleModalClose}>
          {" "}
          &#x2715;{" "}
        </button>
      </div>
    </div>
  );
}
