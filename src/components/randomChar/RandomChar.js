import "./randomChar.scss";

import ufo from "../../resources/img/ufo.png";
import { Component } from "react";
import { RickMortyService } from "../../services/RickMorthyService";
import { Spinner } from "../spinner/Spinner";
import { Error } from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }
  state = {
    char: {},
    loading: true,
    error: false,
  };

  rickMortyService = new RickMortyService();

  onChaLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  onError = () => {
    this.setState({ loading: false, error: true });
  };
  updateChar = () => {
    const id = Math.floor(Math.random() * (826 - 1 + 1)) + 1;
    this.rickMortyService
      .getCharacter(id)
      .then(this.onChaLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;
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
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={ufo} alt="ufo" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}
const View = ({ char }) => {
  const { name, species, thumbnail, homepage, wiki, episode, origin } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{species}</p>
        <p className="randomchar__descr">From: {origin}</p>
        <p className="randomchar__episode">Episodes: {episode}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
