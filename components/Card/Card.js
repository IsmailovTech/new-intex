import Image from "next/image";
import React, { useState } from "react";
import Button from "../ComponetntModuls/button/Button";
import Baseen from "../../public/Assets/Images/img.png";

function Card({ status, name, price, sale }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="card rounded-xl w-cardWidthMobile mini_phone:w-cardWidthMobile2 mini_phone2:w-cardWidthMobile3 mini_phone3:w-cardWidthMobile4 mini_phone4:w-cardWidthMobile5 mini_phone5:w-cardWidthMobile6 mini_phone6:w-cardWidthMobile7  md:w-cardWidth shadow-card_shadow relative border mt-5">
      <span
        className={`${
          status === "Новинки"
            ? "bg-green-new"
            : status === "-17% скидка"
            ? "bg-red-sale"
            : status === "Pекомендуем"
            ? "bg-blue-recommend"
            : status === "Популярное"
            ? "bg-blue-recommend"
            : "bg-red-xit"
        } text-sm block z-20  w-111 text-center py-5.5 rounded-r-lg text-white absolute top-4 left-0`}
      >
        {status}
      </span>
      <Image
        className="mt-2 mb-1 md:mb-4"
        src={Baseen}
        alt="baseen_product_image"
        width={280}
        height={220}
      />
      <div className="p-2 md:p-4">
        <h3 className="text-sm md:text-lg font-bold leading-5 mb-2">{name}</h3>
        <span className="text-xs md:text-base m-0 mb-2 block leading-22 text-black-black_thin">
          220х150х60см, 1662л
        </span>
        <span className="text-xs md:text-sm block line-through">
          {sale}
        </span>
        <span className="text-xs md:text-sm block mb-2.5 text-black-black_light">{price}</span>
        <Button>Заказать</Button>
      </div>
    </div>
  );
}

export default Card;