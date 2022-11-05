import Image from "next/image";
import React, { useEffect } from "react";
import BuyForm from "../ComponetntModuls/Forms/BuyForm";
import AOS from "aos";
import "aos/dist/aos.css";

const Consultation = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div id="consultation" className="mt-32 ">
      <div className="max-w-[1185px] mx-auto bg-gray-bg_main px-4 pt-4 md:px-12 md:pt-12 md:rounded-sectionRadius">
        <div className="tablet_min:flex tablet_min:items-center tablet_min:justify-between">
          <div>
            <Image
              className="lg:ml-20 mx-auto hidden tablet_min:block h-auto mt-14"
              src={"/Assets/Images/BuyAll/person.png"}
              alt="Picture of the Karkas"
              width={380}
              height={466}
              priority="true"
            />
          </div>
          <div className="w-fit pb-4 md:pb-12">
            <h2 className="text-xl sm:text-3xl md:text-32 font-bold leading-9">
              Получить консултацию
            </h2>
            <p className="max-w-403 text-sm md:text-base text-gray-foot leading-5 mt-4 mb-6 sm:mb-8">
              Чтобы получить консультацию, отправьте нам свой номер телефона и
              имя, и мы свяжемся с вами в ближайшее время.
            </p>
            <Image
              className="lg:ml-20 mx-auto block tablet_min:hidden"
              src={"/Assets/Images/BuyAll/person.png"}
              alt="Picture of the Karkas"
              width={380}
              height={466}
              priority="true"
            />
            <BuyForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
