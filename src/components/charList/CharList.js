import "./charList.scss";
import { Component } from "react";
import { RickMortyService } from "../../services/RickMorthyService";
import { Spinner } from "../spinner/Spinner";

class CharList extends Component {
  state = {
    charArr: [],
    loading: true,
    error: false,
  };
  componentDidMount() {
    this.updateChar();
  }

  rickMortyService = new RickMortyService();
  updateChar = () => {
    this.rickMortyService
      .getAllCharacters()
      .then((res) => this.setState({ charArr: res, loading: false }));
  };
  updateItems(arr) {
    const items = arr.map((item) => {
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }
  render() {
    const { charArr, loading, error } = this.state;
    const items = this.updateItems(charArr);
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {spinner}
        {content}
      </div>
    );
  }
}

export default CharList;
