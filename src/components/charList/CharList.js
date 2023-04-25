import "./charList.scss";
import { useState, useEffect } from "react";
import { useRickMortyService } from "../../services/RickMorthyService";
import { Spinner } from "../spinner/Spinner";

const CharList = (props) => {
  const [charArr, setCharArr] = useState([]),
    [currentPage, setCurrentPage] = useState(1),
    { loading, error, getAllCharacters } = useRickMortyService();

  useEffect(() => {
    updateChar();
  }, []);

  const updateChar = () => {
    getAllCharacters(currentPage).then((res) => {
      setCharArr(res);
    });
  };
  //БАГ С ПЕРВЫМ КЛИКОМ
  const getNewCharacters = () => {
    setCurrentPage((currentPage) => currentPage + 1);
    getAllCharacters(currentPage).then((res) => {
      setCharArr(res);
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

  return (
    <div className="char__list">
      {spinner}
      {items}
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
