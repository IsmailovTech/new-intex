import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card/Card";

const env = process.env.NEXT_PUBLIC_TOKEN;

const Naduvniy = () => {
  const lang = useSelector((state) => state.data.lang);
  const languages = useSelector((state) => state.data.localization);

  const [naduvnoy, setNaduvnoy] = useState([]);
  const [limit, setLimit] = useState(30);
  const [loader, setLoader] = useState(false);

  // --- Get Products
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${env}products/getByCategory?category_id=1&page=0&limit=${limit}`)
      .then((res) => {
        setNaduvnoy(res?.data?.result);
        setLoader(false);
      });
  }, [limit]);

  const spinner = (
    <svg
      className="inline mr-2 w-h-16 h-16 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  return (
    <section className="mt-7 md:mt-32">
      <div className="max-w-container w-full mx-auto px-5">
        <div className="">
          <p className="flex items-center text-base text-black-black_thin">
            <Link href={`/`} className="text-blue-accent">
              {languages[lang].naduvniy.route}
            </Link>
            <Image
              className="mx-1"
              src={"/Assets/Images/NaduvniyImg/down.svg"}
              width={24}
              height={24}
              alt="Arrow_down"
            />
            {languages[lang].naduvniy.name}
          </p>
          <h2 className="font-bold text-xl md:text-3xl text-black-black_dark mt-5 md:mt-6 mb-5">
            {languages[lang].naduvniy.name}
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {loader ? (
              <div className="w-[1185px] h-[200px] flex items-center justify-center">
                {spinner}
              </div>
            ) : (
              naduvnoy.map((el) => {
                return (
                  <Card
                    key={el.id}
                    id={el.id}
                    data={naduvnoy}
                    image={el.image}
                    attributes={el.attributes}
                    status_ru={el.status_ru}
                    status_en={el.status_en}
                    status_uz={el.status_uz}
                    name_ru={el.name_ru}
                    name_en={el.name_en}
                    name_uz={el.name_uz}
                    price={el.price}
                    sale={el.discount_price}
                  />
                );
              })
            )}
          </div>
          {/* <div className="w-fit mx-auto mt-8 md:mt-5 mb-20 md:mb-3 bg-blue-btn_bg px-34 md:px-10 py-11 md:py-4 rounded-xl">
            <button
              onClick={increment}
              className="font-medium text-lg text-blue-base"
            >
              {languages[lang].show}
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Naduvniy;
