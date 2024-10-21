'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SingleAnimePage = ({ params }) => {
  const { id } = params; 
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnime = async () => {
      if (!id) return; 
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recuperare i dati dell\'anime', error);
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!anime) {
    return <p>Anime non trovato.</p>;
  }

  return (
    <div>
      <h1>{anime.title}</h1>
      {anime.images?.jpg?.image_url ? (
        <img src={anime.images.jpg.image_url} alt={anime.title} width="300" height="450" />
      ) : (
        <p>Immagine non disponibile</p>
      )}
      <p><strong>Trama:</strong> {anime.synopsis || "Descrizione non disponibile"}</p>
      <p><strong>Punteggio:</strong> {anime.score || "Non disponibile"}</p>
      <p><strong>Episodi:</strong> {anime.episodes || "Non disponibile"}</p>
      <p><strong>Genere:</strong> {anime.genres.map((genre)=>
      genre.name
      ).join(', ')}</p>
      <p><strong>Tipo: </strong> {anime.type}</p>
       <p><strong>In corso:</strong> {anime.airing===true?('Si'):('No')} </p>
       <p><strong>Anno:</strong> {anime.year}</p>
       <p><strong>Studio: </strong>  {anime.studios.map((studio)=>
      studio.name
      ).join(', ')}</p>
      {anime.trailer?.url && (
        <a href={anime.trailer.url} target="_blank" rel="noopener noreferrer">Guarda il trailer</a>
      )}
    </div>
  );
};

export default SingleAnimePage;
