import Image from "next/image";

import style from "../../styles/home/search.scss"
import Link from "next/link";

export default function Search() {
  return (
  <section className="Search">
  <div className="anime">
<span><h3>Trova l'anime adatto a te</h3>  <Image src="/Images/One-Piece.png" alt="A one piece image" width={200} height={200}/></span>

<Link href="/pages/Anime/SearchAnime"><button> Cerca</button></Link>
  </div>
  <div className="manga">
<span><h3>Trova il manga adatto a te</h3>  <Image src="/Images/Berserk.png" alt="A berserk image" width={180} height={200}/></span>

<Link href="/pages/Manga/SearchManga"><button> Cerca</button></Link>
  </div>
  </section>
  );
}
