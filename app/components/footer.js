
import Image from "next/image";
const footerInfoLinks = [
  { link: "Chi siamo", id: 1 },
  { link: "Contatti", id: 2 },
  { link: "Privacy Policy", id: 3 },
  { link: "Termini e condizioni", id: 4 },
  { link: "FAQ", id: 5 },
  { link: "Guida per l'utente", id: 6 },
  { link: "Manga più popolari", id: 7 },
  { link: "Anime più popolari", id: 8 },
  { link: "Supporto", id: 9 },
];

const additionalFooterLinks = [
  { link: "Lavora con noi", id: 10 },
  { link: "Cookie Policy", id: 11 },
  { link: "Pubblicità", id: 12 },
  { link: "Eventi", id: 13 },
  { link: "Recensioni", id: 14 },
  { link: "Newsletter", id: 15 },
];

const moreFooterLinks = [
  { link: "Sponsorizzazioni", id: 16 },
  { link: "Blog", id: 17 },
  { link: "Partnership", id: 18 },
  { link: "Comunità", id: 19 },
];

const footerLinks12 = [
  { link: "Chi siamo", id: 20 },
  { link: "Contatti", id: 21 },
  { link: "Termini di servizio", id: 22 },
  { link: "Condizioni di vendita", id: 23 },
  { link: "Resi e rimborsi", id: 24 },
  { link: "Affiliazioni", id: 25 },
  { link: "Programma fedeltà", id: 26 },
  { link: "Mappa del sito", id: 27 },
  { link: "Sicurezza online", id: 28 },
  { link: "Codici promozionali", id: 29 },
  { link: "Recensioni dei clienti", id: 30 },
  { link: "Assistenza clienti", id: 31 },
];



export default function Footer() {
  return (
   <footer>
    <section className="footer-container">
    <section className="links">
         <ul>
          {footerInfoLinks.map((data)=>(
          <li><a href="" className="link" key={data.id}>{data.link}</a></li>


          ))}
         </ul>
         <ul>  {additionalFooterLinks.map((data)=>(
          <li><a href="" className="link" key={data.id}>{data.link}</a></li>


          ))}</ul>
         <ul>{moreFooterLinks.map((data)=>(
          <li><a href="" className="link" key={data.id}>{data.link}</a></li>


          ))}</ul>
         <ul>{footerLinks12.map((data)=>(
          <li><a href="" className="link" key={data.id}>{data.link}</a></li>


          ))}</ul>
    </section>
    <hr></hr>
    <section className="socials">
      <div>
  <h4> I nostri social</h4>
<Image src="/FooterIcons/facebook.svg" width={25} height={25} alt="facebook" />
      <Image src="/FooterIcons/instagram-fill.svg" width={25} height={25} alt="instagram" />
      <Image src="/FooterIcons/tik-tok.svg" width={25} height={25} alt="tik-tok" />
      <Image src="/FooterIcons/twitter.svg" width={25} height={25} alt="twitter" /></div>
      <div>
        © 2024 Anime Catalog. All rights reserved.
      </div>
    </section></section>
    </footer>
  );
}