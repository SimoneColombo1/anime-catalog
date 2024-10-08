
import Image from "next/image";
const footerInfoLinks = [
  
   "Chi siamo",
  
  "Contatti",
   
 "Privacy Policy",
 "Termini e condizioni",
    
 "FAQ",
  
     "Guida per l'utente",
  
     "Manga più popolari",

     "Anime più popolari",
  
    "Supporto",


 
];
const additionalFooterLinks = [
  
    "Lavora con noi",
   "Cookie Policy",
 "Pubblicità",
 "Eventi",
   "Recensioni",
  
  
     "Newsletter"
   
  
];
const moreFooterLinks = [
 "Sponsorizzazioni",
  "Blog",
  "Partnership",
   "Comunità"
];
const footerLinks12 = [
  
     "Chi siamo",
   
 "Contatti",

     "Termini di servizio",

     "Condizioni di vendita",
   
     "Resi e rimborsi",
 
     "Affiliazioni",
 
  
     "Programma fedeltà",
 
  
    "Mappa del sito",
 
 
    "Sicurezza online",
  
 
   "Codici promozionali",
    

     "Recensioni dei clienti",
   


    "Assistenza clienti",
  
 
];



export default function Footer() {
  return (
   <footer>
    <section className="footer-container">
    <section className="links">
         <ul>
          {footerInfoLinks.map((data)=>(
          <li><a href="" className="link">{data}</a></li>


          ))}
         </ul>
         <ul>  {additionalFooterLinks.map((data)=>(
          <li><a href="" className="link" >{data}</a></li>


          ))}</ul>
         <ul>{moreFooterLinks.map((data)=>(
          <li><a href="" className="link">{data}</a></li>


          ))}</ul>
         <ul>{footerLinks12.map((data)=>(
          <li><a href="" className="link">{data}</a></li>


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