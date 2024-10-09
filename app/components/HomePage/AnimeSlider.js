
'use client';
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {useEffect,useState} from 'react';
import axios from "axios";
import Image from "next/image";
import style from "../../styles/home/AnimeSlider.scss"



const AnimeSlider = () => {
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://api.jikan.moe/v4/top/anime');
      setAnimeData(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }


 

  return (
  <section className="AnimeSlider">
   <div className="title"><h1>Gli anime più votati</h1></div>
   <Swiper className="cards-container"  modules={[Navigation, Pagination, Autoplay]}
        
        slidesPerView={6}
        loop={true}
        autoplay={{ delay: 3000 }}>
     {animeData.data.map((anime)=>(
 <SwiperSlide className="card" key={anime.mal_id}>

<span><img src={anime.images.jpg.image_url}  alt={anime.title_english} className="anime-image"/></span>

<span>

           {anime.title_english ? anime.title_english : anime.title}
  </span>
<span>
  Episodi:
  {anime.episodes}</span>
<span> genere: {anime.genres.map((genre) => genre.name).join(', ')}</span>
<span>{anime.score}</span>

<span></span>

     </SwiperSlide>


     ))}
    


   </Swiper>
 
  </section>
  );
}
export default AnimeSlider;