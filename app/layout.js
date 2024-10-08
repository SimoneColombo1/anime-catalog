import localFont from "next/font/local";
import style from "./styles/general.scss"
import Footer from "./components/footer";
import Header from "./components/header";
import StyleVariables from "./styles/variables.scss"
import { Montserrat} from 'next/font/google'
 
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
})
export const metadata = {
  title: "Anime Catalog",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
      <Header/>
    
      <section className="main-container">
        {children}</section>
        <Footer/>
      </body>
    </html>
  );
}
