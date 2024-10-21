'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../../../styles/general/searchPage.scss"
import axiosRetry from "axios-retry";
import { debounce } from 'lodash';
import Link from "next/link";

const SearchAnime=()=>{
const [animeData, setAnimeData] = useState(null);
const [loading, setLoading] = useState(true);
const [genreData, setGenreData]=useState(null);
  const  [getTitle, setTitle] =useState('');
  const [genre, setGenre] = useState([]); // Definisci il genere come stringa vuota per default
  const [type, setType] = useState('');
  const [order_by, setOrderBy] = useState('title');
  const [sort, setSort] = useState('asc');
   const [noResults, setNoResults] = useState(false);
   

  const FunctionGetTitle = (event) => {
    setTitle(event.target.value);
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

const getType =(event)=>{
  setType(event.target.value)
  console.log(type);
}

const getOrder=(event)=>{
  setOrderBy(event.target.value)
  console.log(order_by)
}
const getSort=(event)=>{
  setSort(event.target.value)
  console.log(sort)
}
axiosRetry(axios, {
  retries: 3, // Numero di tentativi
  retryDelay: (retryCount) => {
    console.log(`Retry attempt: ${retryCount}`);
    return retryCount * 2000; // Ritardo di 2 secondi tra ogni tentativo
  },
  retryCondition: (error) => {
    return error.response.status === 429; // Riprova solo per errore 429
  }
});


    useEffect(()=>{
const fetchData = async () => {

  
 //? Api per la ricerca di anime
      const res = await axios.get( `https://api.jikan.moe/v4/anime?q=${ getTitle}&genres=${genre}&type=${type}&order_by=${order_by}&sort=${sort}`);
      setAnimeData(res.data);
        setNoResults(res.data.data.length === 0); 
//< Api per prendere tutti i generi
     const response= await axios.get(`https://api.jikan.moe/v4/genres/anime`);
     setGenreData(response.data)

setLoading(false);

    };

    fetchData();


},[getTitle, genre, type,order_by, sort]);

  if (loading) {
    return <p>Loading...</p>;
  }
return(

  <section className="search-anime">
   
<section className="search-title">
  <h3>Trova l'anime adatto a te</h3>
    <input
        type="text"
        placeholder="Cerca"
        value={getTitle}
        onChange={FunctionGetTitle}
      /></section>
<section className="more-search">

<div className="search-genre">
<h3>Generi:</h3>
{genreData.data.map((genre)=>(
  <label htmlFor={genre.mal_id} className="rectangle-checkbox">
<input type="checkbox" value={genre.mal_id}onChange={getGenre} className="checkbox"/>
<span className="checkmark">{genre.name}</span></label>
))}</div>
<div className="more-options">

<select>
  <option value="">Media</option>
  <option value=""onChange={getType}>Tutto</option>
  <option id ="tv" value="tv"onChange={getType}>
Serie
  </option>
  <option   id="movie" value="movie"onChange={getType}>
film
  </option>
  <option id="ova"  value="ova"onChange={getType}>
Ova
  </option>
  <option  id="special" value="special"onChange={getType}>
special
  </option>
</select>
<select>
  <option value=""onChange={getOrder}>Ordina</option>
  <option value="title"onChange={getOrder}>Ordine Alfabetico</option>
  <option value="score"onChange={getOrder}>Voti</option>
  <option value="episodes"onChange={getOrder}>Numero episodi</option>
</select>

<select>
  <option value=""onChange={getSort}>Direzione</option>
  <option value="asc"onChange={getSort}>Crescente</option>
  <option value="desc"onChange={getSort}>Decrescente</option>
</select>
</div>
</section>
  {noResults && !loading && (
        <div className="error">
        <div className="no-results">
          <p>Nessun anime trovato. Prova a modificare i criteri di ricerca.</p>
        </div></div>
      )}


<section className="card-container">


{animeData.data.map((anime)=>(
  
  <div className="card" >
    <span className="image"><img src={anime.images.jpg.image_url} /></span>
   <div className="content">
    <span>
   {anime.title_english ? anime.title_english : anime.title}
    </span>
    <span className="sinossi">{anime.synopsis}</span>
    <span>episodi: {anime.episodes ? anime.episodes: "Non disponibile"}</span>
    <span>stato: {anime.status ? anime.status : "Non disponibile"}</span>
    <span>score: {anime.score ? anime.score : "Non disponibile"}</span>
    <span>Genere: {anime.genres.map((genre) => genre.name).join(', ') ?anime.genres.map((genre) => genre.name).join(', '): "Non disponibile" }</span>
    <Link href={`/pages/Anime/${anime.mal_id}`}>Vedi dettagli</Link>
   </div>
    </div>
  
  
  
))}


</section>

  </section>
);
}

export default  SearchAnime;
