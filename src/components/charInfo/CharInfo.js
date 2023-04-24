import "./charInfo.scss";

import { Component, useEffect, useState } from "react";
import { RickMortyService } from "../../services/RickMorthyService";
import { Spinner } from "../spinner/Spinner";
import { Error } from "../errorMessage/ErrorMessage";
import { Skeleton } from "../skeleton/Skeleton";

const CharInfo = (props) => {
  const [char, setChar] = useState(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(false),
    rickMortyService = new RickMortyService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    if (!props.charId) {
      return;
    }
    onCharLoading();
    rickMortyService
      .getCharacter(props.charId)
      .then(onCharLoaded)
      .catch(onError);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };
  const onCharLoading = () => {
    setLoading(true);
  };
  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const errorMessage = error ? <Error /> : null,
    spinner = loading ? <Spinner /> : null,
    content = !(loading || error || !char) ? <View char={char} /> : null,
    skeleton = char || loading || error ? null : <Skeleton />;

  return (
    <div className="char__info">
      {errorMessage}
      {spinner}
      {content}
      {skeleton}
    </div>
  );
};
const View = ({ char }) => {
  const { name, species, thumbnail, status, origin, episode } = char;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" />
        <div>
          <div className="char__info-name">{name}</div>
        </div>
      </div>
      <div className="char__descr">
        <h2>{species}</h2>
      </div>
      <div className="char__descr">
        <p>
          Status: <strong>{status}</strong>
        </p>
        <p>
          From: <strong>{origin}</strong>
        </p>
      </div>
      <div className="char__comics">Episodes: {episode.length}</div>
      <ul className="char__comics-list">
        {episode.map((item, i) => {
          return (
            <li className="char__comics-item">
              Episode №
              {item.replace("https://rickandmortyapi.com/api/episode/", "")}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default CharInfo;
