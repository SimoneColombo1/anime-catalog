'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SinglemangaPage = ({ params }) => {
  const { id } = params; 
  const [manga, setmanga] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchmanga = async () => {
      if (!id) return; 
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
        setmanga(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recuperare i dati dell\'manga', error);
        setLoading(false);
      }
    };

    fetchmanga();
  }, [id]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!manga) {
    return <p>manga non trovato.</p>;
  }

  return (
    <div>
      <h1>{manga.title_english || manga.title}</h1>
      {manga.images?.jpg?.image_url ? (
        <img src={manga.images.jpg.image_url} alt={manga.title} width="300" height="450" />
      ) : (
        <p>Immagine non disponibile</p>
      )}
      <p><strong>Trama:</strong> {manga.synopsis || "Descrizione non disponibile"}</p>
      <p><strong>Punteggio:</strong> {manga.score || "Non disponibile"}</p>
       <p><strong>Genere:</strong> {manga.genres.map((genre)=>
      genre.name
      ).join(', ')}</p>
      <p><strong>Capitoli:</strong> {manga.chapters || "Non disponibile"}</p>
      <p><strong>Volumi:</strong> {manga.volumes || "Non disponibile"}</p>
      <p><strong>In corso:</strong> {manga.publishing===true?('Si'):('No')} </p>
      <p><strong>Autore:</strong>  {manga.authors.map((author)=>
      author.name
      )}
      </p>
      <p><strong>Pubblicato dal: </strong>     {manga.published.string}
    </p>
     
    </div>
  );
};

export default SinglemangaPage;
