import Image from "next/image";
import Link from "next/link";
const NavLinks= [
{
  name:"Home",
  link:"/"
},
  {

name:"i migliori anime",
link: "/pages/Anime/BestAnime"
},
{
name:"I migliori manga",
link: "/pages/Anime/BestManga"
},
{
name:"Cerca il tuo anime",
link: "/pages/Anime/SearchAnime"
},
{
name:"Cerca il tuo Manga",
link: "/pages/Anime/SearchManga"
}
]

export default function Header() {
  return (
   <header>
    <div class="logo">
      <h1>LOGO</h1>

    </div>

<nav>
  <ul>
    {NavLinks.map((data)=>(
     <li><Link href={data.link}>{data.name}</Link></li>

    ))}
  </ul>
</nav>
    </header>
  );
}
