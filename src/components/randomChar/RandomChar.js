import "./randomChar.scss";

import ufo from "../../resources/img/ufo.png";
import { useEffect, useState } from "react";
import { useRickMortyService } from "../../services/RickMorthyService";
import { Spinner } from "../spinner/Spinner";
import { Error } from "../errorMessage/ErrorMessage";

const RandomChar = () => {
  const [char, setChar] = useState({}),
    { loading, error, getCharacter } = useRickMortyService();

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 60000);
    console.log("render");
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (826 - 1 + 1)) + 1;
    getCharacter(id).then(onCharLoaded);
  };

  const errorMessage = error ? <Error /> : null,
    spinner = loading ? <Spinner /> : null,
    content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={ufo} alt="ufo" className="randomchar__decoration" />
      </div>
    </div>
  );
};
const View = ({ char }) => {
  const { name, species, thumbnail, episode, origin } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{species}</p>
        <p className="randomchar__descr">From: {origin}</p>
      </div>
    </div>
  );
};
export default RandomChar;
