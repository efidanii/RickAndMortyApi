import "./charInfo.scss";

import { Component } from "react";
import { RickMortyService } from "../../services/RickMorthyService";
import { Spinner } from "../spinner/Spinner";
import { Error } from "../errorMessage/ErrorMessage";
import { Skeleton } from "../skeleton/Skeleton";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  rickMortyService = new RickMortyService();
  componentDidMount() {
    this.updateChar();
  }
  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCarLoading();
    this.rickMortyService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  onCarLoading = () => {
    this.setState({ loading: true });
  };
  onError = () => {
    this.setState({ loading: false, error: true });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }
  render() {
    const { char, loading, error } = this.state;

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
  }
}
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
