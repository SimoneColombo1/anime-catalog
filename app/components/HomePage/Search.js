import Image from "next/image";

import style from "../../styles/home/search.scss"
import Link from "next/link";

export default function Search() {
  return (
  <section className="Search">
  <div className="anime">
<span><h3>Cerca il tuo anime</h3>  <p>immagine</p></span>

<Link href="/pages/Anime/SearchAnime"><button> Cerca</button></Link>
  </div>
  <div className="manga">
<span><h3>Cerca il tuo Manga</h3>  <p>immagine</p></span>

<Link href="/pages/Anime/SearchManga"><button> Cerca</button></Link>
  </div>
  </section>
  );
}
