import "./charList.scss";
import { useState, useEffect, useRef } from "react";
import { RickMortyService } from "../../services/RickMorthyService";
import { Spinner } from "../spinner/Spinner";

const CharList = (props) => {
  const [charArr, setCharArr] = useState([]),
    [currentPage, setCurrentPage] = useState(1),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false),
    rickMortyService = new RickMortyService(),
    startPage = 1;

  useEffect(() => {
    updateChar();
  }, []);

  const updateChar = () => {
    rickMortyService.getAllCharacters().then((res) => {
      setCharArr(res);
      setLoading(false);
    });
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const getNewCharacters = () => {
    startPage++;
    setCurrentPage(startPage);
    rickMortyService.getAllCharacters(currentPage).then((res) => {
      onCharLoading(true);
      setCharArr(res);
      setLoading(false);
    });
  };

  const updateItems = (arr) => {
    const items = arr.map((item) => {
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  const items = updateItems(charArr);
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;
  return (
    <div className="char__list">
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        onClick={() => {
          getNewCharacters();
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
