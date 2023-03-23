import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import "./style/style.scss";
import { MarvelService } from "./services/MarvelService";

const marvelService = new MarvelService();

marvelService
  .getCharacter(1011016)
  .then((res) => console.log(res.data.results));

marvelService.getAllCharacters().then((res) =>
  res.data.results.forEach((element) => {
    console.log(element);
  })
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
