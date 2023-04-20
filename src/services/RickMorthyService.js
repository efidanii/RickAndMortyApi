export class RickMortyService {
  _url = "https://rickandmortyapi.com/api/charactr";
  getRes = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    return await res.json();
  };
  getAllCharacters = async () => {
    const res = await this.getRes(`${this._url}`);
    return res.results.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const res = await this.getRes(`${this._url}/${id}`);
    return this._transformCharacter(res);
  };

  _transformCharacter = (res) => {
    return {
      name: res.name,
      species: res.species,
      thumbnail: res.image,
      status: res.status,
      origin: res.origin.name,
      episode: res.episode.length,
    };
  };
}
