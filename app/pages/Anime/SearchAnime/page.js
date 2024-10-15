'use client';

import { useEffect, useState } from "react";
import axios from "axios";

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

    <input
        type="text"
        placeholder="Type an anime name..."
        value={getTitle}
        onChange={FunctionGetTitle}
      />
{genreData.data.map((genre)=>(
<span>
<input type="checkbox" value={genre.mal_id} onClick={getGenre}/>
<label htmlFor={genre.mal_id}>{genre.name}</label></span>
))}

<select>
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
  <option value="title" onClick={getOrder}>Ordine Alfabetico</option>
  <option value="score" onClick={getOrder}>Voti</option>
  <option value="episodes" onClick={getOrder}>Numero episodi</option>
</select>

<select>
  <option value="asc" onClick={getSort}>Crescente</option>
  <option value="desc" onClick={getSort}>Decrescente</option>
</select>
<ul>
{animeData.data.map((anime)=>(

<li >{anime.title_english ? anime.title_english : anime.title}</li>
  


))}

</ul>

  </section>
);
}

export default  SearchAnime;
//?  ordina per: titolo,score,numero episodi/ordine discendente o ascendente