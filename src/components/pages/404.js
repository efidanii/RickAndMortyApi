import { Error } from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
      }}
    >
      <Error />
      <Link to="/">
        {" "}
        <button className="button button__main button__long">
          <div className="inner">Back to main page</div>
        </button>
      </Link>
    </div>
  );
};

export default Page404;
