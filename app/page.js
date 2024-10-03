import Image from "next/image";
import Jumbo from "./components/HomePage/jumbo";
import Search from "./components/HomePage/Search";
import AnimeSlider from "./components/HomePage/AnimeSlider";
import MangaSlider from "./components/HomePage/MangaSlider";


export default function Home() {
  return (
  <section className="HomePage">
    <Jumbo/>
    <Search/>
    <AnimeSlider/>
    <MangaSlider/>
  </section>
  );
}
