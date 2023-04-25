import { useHttp } from "../hooks/http.hook";

export const useRickMortyService = () => {
  const { loading, request, error } = useHttp(),
    _url = "https://rickandmortyapi.com/api/character",
    getAllCharacters = async (pageNumber) => {
      const res = await request(`${_url}/?page=${pageNumber}`);
      console.log(`${_url}/?page=${pageNumber}`);
      return res.results.map(_transformCharacter);
    },
    getCharacter = async (id) => {
      const res = await request(`${_url}/${id}`);
      return _transformCharacter(res);
    },
    _transformCharacter = (res) => {
      return {
        id: res.id,
        name: res.name,
        species: res.species,
        thumbnail: res.image,
        status: res.status,
        origin: res.origin.name,
        episode: res.episode,
      };
    };

  return { loading, error, getAllCharacters, getCharacter };
};
