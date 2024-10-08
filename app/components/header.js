import Image from "next/image";
import Link from "next/link";
const NavLinks= [
{
  name:"Home",
  link:"/"
},
  {

name:"I migliori anime",
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
    <section className="header-container">
    <div className="logo">
     <Image src="/Logo/MainLogo.png" width={210} height={50} alt="logo" className="logo"/>

    </div>

<nav>
  <ul>
    {NavLinks.map((data)=>(
     <li><Link href={data.link} className="link">{data.name}</Link></li>

    ))}
  </ul>
</nav></section>
<section className="magicpattern"></section>
    </header>
  );
}
