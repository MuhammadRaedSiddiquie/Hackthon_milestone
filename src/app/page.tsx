import Feature from "./components/Feature/Feature";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Pick from "./components/Pick/Pick";
import Products from "./components/Products/Products";
import Summer from "./components/Summer/Summer";

export default function Home() {

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <Header></Header>
      <Hero></Hero>
      <Pick></Pick>
      <Products></Products>
      <Hero></Hero>
      <Summer></Summer>
      <Feature></Feature>
      <Footer></Footer>
    </main>
  );
}

