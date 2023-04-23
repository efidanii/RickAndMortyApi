import "./charList.scss";
import { Component } from "react";
import { RickMortyService } from "../../services/RickMorthyService";
import { Spinner } from "../spinner/Spinner";

class CharList extends Component {
  state = {
    charArr: [],
    currentPage: 1,
    loading: true,
    error: false,
  };
  componentDidMount() {
    this.updateChar();
  }
  startPage = 1;
  rickMortyService = new RickMortyService();
  updateChar = () => {
    this.rickMortyService.getAllCharacters().then((res) => {
      // console.log(res);
      this.setState({ charArr: res, loading: false });
    });
  };
  onCarLoading = () => {
    this.setState({ loading: true });
  };
  getNewCharacters = () => {
    this.startPage++;
    this.setState({ currentPage: this.startPage });
    this.rickMortyService
      .getAllCharacters(this.state.currentPage)
      .then((res) => {
        this.onCarLoading = () => {
          this.setState({ loading: true });
        };
        this.setState({ charArr: res, loading: false });
      });
  };
  onRequest = (offset) => {
    this.rickMortyService.getAllCharacters(offset);
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
        <button
          className="button button__main button__long"
          onClick={() => {
            this.getNewCharacters();
          }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
