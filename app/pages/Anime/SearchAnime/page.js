'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../../../styles/Anime/searchAnime.scss";

const SearchAnime = () => {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreData, setGenreData] = useState(null);
  const [getTitle, setTitle] = useState('');
  const [genre, setGenre] = useState([]);
  const [type, setType] = useState('');
  const [order_by, setOrderBy] = useState('title');
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);

  const FunctionGetTitle = (event) => {
    setTitle(event.target.value);
    console.log(getTitle);
  };

  const getGenre = (event) => {
    const selectedGenre = event.target.value;
    setGenre((prevGenres) => {
      if (prevGenres.includes(selectedGenre)) {
        return prevGenres.filter((g) => g !== selectedGenre);
      } else {
        return [...prevGenres, selectedGenre];
      }
    });

    console.log(genre);
  };

  const getType = (event) => {
    setType(event.target.value);
    console.log(type);
  };

  const getOrder = (event) => {
    setOrderBy(event.target.value);
    console.log(order_by);
  };

  const getSort = (event) => {
    setSort(event.target.value);
    console.log(sort);
  };

  const fetchData = async (isLoadMore = false) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.jikan.moe/v4/anime`, {
        params: {
          q: getTitle,
          genres: genre.join(','),
          type,
          order_by,
          sort,
          page,
        },
      });

      if (isLoadMore) {
        // Aggiungi nuovi risultati alla lista esistente
        setAnimeData((prevData) => [...prevData, ...res.data.data]);
      } else {
        // Sostituisci i dati esistenti con quelli nuovi
        setAnimeData(res.data.data);
      }

      // Carica i generi solo una volta
      if (!genreData) {
        const response = await axios.get(`https://api.jikan.moe/v4/genres/anime`);
        setGenreData(response.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getTitle, genre, type, order_by, sort]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData(true); // Passa `true` per aggiungere i nuovi risultati
  };

  if (loading && page === 1) {
    return <p>Loading...</p>;
  }

  return (
    <section className="search-anime">
      <section className="search-title">
        <h3>Trova l'anime adatto a te</h3>
        <input
          type="text"
          placeholder="Cerca"
          value={getTitle}
          onChange={FunctionGetTitle}
        />
      </section>
      
      <section className="more-search">
        <div className="search-genre">
          <h3>Generi:</h3>
          {genreData?.data.map((genre) => (
            <label htmlFor={genre.mal_id} className="rectangle-checkbox">
              <input
                type="checkbox"
                value={genre.mal_id}
                onClick={getGenre}
                className="checkbox"
              />
              <span className="checkmark">{genre.name}</span>
            </label>
          ))}
        </div>
        <div className="more-options">
          <select>
            <option value="">Media</option>
            <option value="" onClick={getType}>Tutto</option>
            <option id="tv" value="tv" onClick={getType}>Serie</option>
            <option id="movie" value="movie" onClick={getType}>Film</option>
            <option id="ova" value="ova" onClick={getType}>Ova</option>
            <option id="special" value="special" onClick={getType}>Special</option>
          </select>
          <select>
            <option value="" onClick={getOrder}>Ordina</option>
            <option value="title" onClick={getOrder}>Ordine Alfabetico</option>
            <option value="score" onClick={getOrder}>Voti</option>
            <option value="episodes" onClick={getOrder}>Numero episodi</option>
          </select>
          <select>
            <option value="" onClick={getSort}>Direzione</option>
            <option value="asc" onClick={getSort}>Crescente</option>
            <option value="desc" onClick={getSort}>Decrescente</option>
          </select>
        </div>
      </section>

      <section className="anime">
        {animeData.map((anime) => (
          <div className="card-anime" key={anime.mal_id}>
            <span className="image">
              <img src={anime.images.jpg.image_url} alt={anime.title} />
            </span>
            <span>{anime.title_english ? anime.title_english : anime.title}</span>
            <span className="sinossi">{anime.synopsis}</span>
            <span>Numero episodi: {anime.episodes ? anime.episodes : "Non disponibile"}</span>
            <span>Stato: {anime.status ? anime.status : "Non disponibile"}</span>
            <span>Score: {anime.score ? anime.score : "Non disponibile"}</span>
          </div>
        ))}
     

      <section className="load-more">
        <button onClick={loadMore} disabled={loading} className="loader">
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </section> </section>
    </section>
  );
}

export default SearchAnime;
