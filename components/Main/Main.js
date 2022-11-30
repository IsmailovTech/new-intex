import AboutUs from "../AboutUs/AboutUs";
import Hero from "../Hero/Hero";
import BuyAll from "../BuyAll/BuyAll";
import TashkentPools from "../TashkentPools/TashkentPools";
import { useSelector } from "react-redux";
import Consultation from "../Consultation/Consultation";
import { useEffect, useState } from "react";
import Tovar_nov from "../Tovar_noviy/Tovar_noviy";
import Sale_nov from "../Sale_tovar/Sale_tovar";
import Populyar_nov from "../Populyar_tovar/Populyar_tovar";

function Main() {
  const lang = useSelector((state) => state.data.lang);
  const languages = useSelector((state) => state.data.localization);

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);
    if (isMobileDevice) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <main>
      <Hero />
      <Populyar_nov mobile={mobile} />
      <TashkentPools />
      <Tovar_nov mobile={mobile} />
      <BuyAll />
      <AboutUs />
      <Sale_nov mobile={mobile} />
      <Consultation />
    </main>
  );
}

export default Main;
