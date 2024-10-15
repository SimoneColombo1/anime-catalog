
'use client';
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {useEffect,useState} from 'react';
import axios from "axios";
import Image from "next/image";
import style from "../../styles/home/MangaSlider.scss"

const MangaSlider = () => {
  const [MangaData, setMangaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://api.jikan.moe/v4/top/manga?limit=10');
      setMangaData(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }



 

  return (
  <section className="MangaSlider">
    <div className="title"><h1>I Manga più votati</h1></div>
   <Swiper className="cards-container"  modules={[Navigation, Pagination, Autoplay]}
        
        slidesPerView={6}
        
      loop={true}
        autoplay={{ delay: 3000 }}>
     {MangaData.data.map((manga)=>(
 <div className="single-card">
 <SwiperSlide className="card"  key={manga.mal_id}>
<span><img src={manga.images.jpg.image_url}  alt={manga.title_english} className="manga-image"/></span>

<span>{manga.title_english ? manga.title_english : manga.title}</span>
<span> capitoli: {manga.chapters}</span>
<span> genere: {manga.genres.map((genre) => genre.name).join(', ')}</span>
<span>{manga.score}</span>

<span></span>
     </SwiperSlide></div>


     ))}
    


   </Swiper>

  </section>
  );
}
export default MangaSlider;