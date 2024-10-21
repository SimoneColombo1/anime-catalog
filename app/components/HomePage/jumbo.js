import Image from "next/image";
import style from  "../../styles/home/jumbo.scss";

export default function Jumbo() {
  return (
  <section className="jumbo">
  <div className="text">
      <h1>Benvenuto su Anime Catalog</h1>
    <p>Scopri l’affascinante mondo degli anime e dei manga con Anime Catalog, il tuo catalogo online dedicato a tutti gli appassionati di animazione giapponese! Che tu sia un veterano del genere o un neofita curioso, qui troverai una vasta selezione di titoli, recensioni, e informazioni approfondite per aiutarti a esplorare il tuo nuovo anime preferito.</p></div>
  <div className="img"> <Image src="/Images/Big3.jpg" width={750} height={400} alt="Big3"/></div>
  </section>
  );
}