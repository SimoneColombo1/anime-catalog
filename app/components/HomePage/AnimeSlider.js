
'use client';
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Image from "next/image";
import style from "../../styles/home/AnimeSlider.scss"
const animeList = [
  "Naruto",
  "Attack on Titan",
  "Fullmetal Alchemist: Brotherhood",
  "My Hero Academia",
  "Demon Slayer",
  "One Piece",
  "Death Note",
  "Sword Art Online",
  "Hunter x Hunter",
  "Tokyo Ghoul"
];




export default function AnimeSlider() {
 

  return (
  <section class="AnimeSlider">
   <h1>I migliori Anime</h1>
   <Swiper className="cards-container"  modules={[Navigation, Pagination, Autoplay]}
        
        slidesPerView={5}
        
      
        autoplay={{ delay: 3000 }}>
     {animeList.map((data)=>(
 <SwiperSlide className="card">
{data}
     </SwiperSlide>


     ))}
    


   </Swiper>

  </section>
  );
}
