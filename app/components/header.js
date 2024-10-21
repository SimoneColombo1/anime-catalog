import Image from "next/image";
import Link from "next/link";
const NavLinks= [
{
id:1,
  name:"Home",
  link:"/"
},
  {

id:2,
name:"I migliori anime",
link: "/pages/Anime/BestAnime"
},
{
id:3,
name:"I migliori manga",
link: "/pages/Manga/BestManga"
},
{
id:4,
name:"Cerca il tuo anime",
link: "/pages/Anime/SearchAnime"
},
{
id:5,
name:"Cerca il tuo Manga",
link: "/pages/Manga/SearchManga"
}
]

export default function Header() {
  return (
   <header>
    <section className="header-container" id="header">
    <div className="logo">
     <Image src="/Logo/MainLogo.png" width={210} height={50} alt="logo" className="logo"/>

    </div>

<nav>
  <ul>
    {NavLinks.map((data)=>(
     <li key={data.id}><Link href={data.link} className="link">{data.name}</Link></li>

    ))}
  </ul>
</nav></section>
<section className="magicpattern"></section>
    </header>
  );
}
