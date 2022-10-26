import Head from 'next/head'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import SiteLogo from "../public/Assets/Images/i-logo.svg"

export default function Home() {
  return (
    <div >
      <Head>
        <title>Intex shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={SiteLogo} />
      </Head>
      <Header/> {/* Nurillo Headerni oldi  */}
      <Hero/> {/*Nurillo Hero oldi*/}
      <Popular/> {/*Nozimjon Популярные товары oldi*/}
    </div>
  )
}
