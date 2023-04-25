import "./appHeader.scss";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink exact activeStyle={{ color: "#0d941f" }} to="/">
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink exact activeStyle={{ color: "#0d941f" }} to="/comics">
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
