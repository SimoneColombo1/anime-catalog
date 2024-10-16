'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "../../../styles/Anime/searchAnime.scss"
const SearchAnime=()=>{
const [animeData, setAnimeData] = useState(null);
const [loading, setLoading] = useState(true);
const [genreData, setGenreData]=useState(null);
  const  [getTitle, setTitle] =useState('');
  const [genre, setGenre] = useState([]); // Definisci il genere come stringa vuota per default
  const [type, setType] = useState('');
  const [order_by, setOrderBy] = useState('title');
  const [sort, setSort] = useState('asc');
  
      const FunctionGetTitle = (event) => {
    setTitle(event.target.value);
    console.log(getTitle)
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

    useEffect(()=>{
const fetchData = async () => {

  
 //? Api per la ricerca di anime
      const res = await axios.get( `https://api.jikan.moe/v4/anime?q=${ getTitle}&genres=${genre}&type=${type}&order_by=${order_by}&sort=${sort}`);
      setAnimeData(res.data);
      
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
<input type="checkbox" value={genre.mal_id} onClick={getGenre} className="checkbox"/>
<span className="checkmark">{genre.name}</span></label>
))}</div>
<div className="more-options">

<select>
  <option value="">Media</option>
  <option value="" onClick={getType}>Tutto</option>
  <option id ="tv" value="tv" onClick={getType}>
Serie
  </option>
  <option   id="movie" value="movie" onClick={getType}>
film
  </option>
  <option id="ova"  value="ova" onClick={getType}>
Ova
  </option>
  <option  id="special" value="special" onClick={getType}>
special
  </option>
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


{animeData.data.map((anime)=>(
  
  <div className="card-anime" >
    <span className="image"><img src={anime.images.jpg.image_url} /></span>
    <span>
   {anime.title_english ? anime.title_english : anime.title}
    </span>
    <span className="sinossi">{anime.synopsis}</span>
    <span>numero episodi: {anime.episodes ? anime.episodes: "Non disponibile"}</span>
    <span>stato: {anime.status ? anime.status : "Non disponibile"}</span>
    <span>score: {anime.score ? anime.score : "Non disponibile"}</span>
   
    </div>
  
  
  
))}


</section>
<section className="load-more"></section>
  </section>
);
}

export default  SearchAnime;
