import Carousel2 from "./components/Carousel2/Carousel2";
import Feature from "./components/Feature/Feature";
// import Footer from "./components/Footer/Footer";
// import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Pick from "./components/Pick/Pick";
import Products from "./components/Products/Products";
import Summer from "./components/Summer/Summer";

export default function Home() {
  const query=`*[_type == "product"]{
    id,
    title,
    description,
    images[]{
      _key,
      asset->{url} // This fetches the image URL from the asset reference
    },
    category,
    price,
    discountPercentage,
    rating,
    tags[],
    stock,
    brand,
    availabilityStatus
}[0...28]`;

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <Hero></Hero>
      <Pick></Pick>
      <Products
      query={query}
      ></Products>
      <Carousel2></Carousel2>
      <Summer></Summer>
      <Feature></Feature>
    </main>
  );
}

