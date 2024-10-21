'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import axiosRetry from "axios-retry";
import style from "../../../styles/general/searchPage.scss"
const Searchmanga=()=>{
const [mangaData, setmangaData] = useState(null);
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
 //? Api per la ricerca di manga
      const res = await axios.get( `https://api.jikan.moe/v4/manga?q=${ getTitle}&genres=${genre}&type=${type}&order_by=${order_by}&sort=${sort}`);
      setmangaData(res.data);
        setNoResults(res.data.data.length === 0); 
//< Api per prendere tutti i generi
     const response= await axios.get(`https://api.jikan.moe/v4/genres/manga`);
     setGenreData(response.data)

setLoading(false);

    };

    fetchData();


},[getTitle, genre, type,order_by, sort]);

  if (loading) {
    return <p>Loading...</p>;
  }
return(

  <section className="search-manga">
   
<section className="search-title">
  <h3>Trova l'manga adatto a te</h3>
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
  <option value="">Tipo</option>
  <option value=""onChange={getType}>Tutto</option>
  <option id ="manga" value="manga"onChange={getType}>
Manga
  </option>
  <option   id="novel" value="novel"onChange={getType}>
Novel
  </option>
  <option id="lightnovel"  value="lightnovel"onChange={getType}>
Light Novel
  </option>
  <option  id="oneshot" value="oneshot"onChange={getType}>
One Shot
  </option>
  <option  id="manhwa" value="manhwa"onChange={getType}>
manhwa
  </option>
  <option  id="manhua" value="manhua"onChange={getType}>
manhua
  </option>
</select>
<select>
  <option value=""onChange={getOrder}>Ordina</option>
  <option value="title"onChange={getOrder}>Ordine Alfabetico</option>
  <option value="score"onChange={getOrder}>Voti</option>
  <option value="chapters"onChange={getOrder}>Numero capitoli</option>
  <option value="volumes"onChange={getOrder}>Numero volumi</option>
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
          <p>Nessun manga trovato. Prova a modificare i criteri di ricerca.</p>
        </div></div>
      )}


<section className="card-container">


{mangaData.data.map((manga)=>(
  
  <div className="card" >
    <span className="image"><img src={manga.images.jpg.image_url} /></span>
   <div className="content">
     <span>
   {manga.title_english ? manga.title_english : manga.title}
    </span>
    
    <span className="sinossi">{manga.synopsis}</span>
    <span>Capitoli: {manga.chapters ? manga.chapters: "Non disponibile"}</span>
    <span>Volumi: {manga.volumes ? manga.volumes: "Non disponibile"}</span>
    <span>stato: {manga.status ? manga.status : "Non disponibile"}</span>
    <span>score: {manga.score ? manga.score : "Non disponibile"}</span>
    <span>Genere: {manga.genres.map((genre) => genre.name).join(', ') ?manga.genres.map((genre) => genre.name).join(', '): "Non disponibile" }</span>
    <Link href={`/pages/Manga/${manga.mal_id}`}>Vedi dettagli</Link>
   </div>
    </div>
  
  
  
))}


</section>

  </section>
);
}

export default  Searchmanga;
