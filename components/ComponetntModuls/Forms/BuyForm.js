import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";
import { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import { toast, Toaster } from "react-hot-toast";

let token = "5463520222:AAFQgcQ7hyUTAYV3ad0YaGTQ_lGIbRZyyxg";
let chatId = "636476536";

const env = process.env.NEXT_PUBLIC_TOKEN;

const initialValues = {
  name: "",
  number: "",
};

const BuyForm = () => {
  const [loading, setLoading] = useState(false);

  const lang = useSelector((state) => state.data.lang);
  const languages = useSelector((state) => state.data.localization);

  const onSubmit = (values, { resetForm }) => {
    let fullText = `\u{2705} Name: ${values.name}%0A\u{2705} Phone Number: \u{FF0B}998${values.number}`;
    setLoading(true);

    // --- Sent Telegram Bot
    axios.post(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${fullText},`
    );

    // --- Post Consultation
    axios
      .post(`${env}consultations/create`, {
        name: values.name,
        phone: `+998${values.number}`,
      })
      .then(() => {
        toast.success(
          lang === "ru"
            ? "Успешно отправлено!"
            : lang === "en"
            ? "Successfully sent!"
            : "Muvaffaqiyatli yuborildi!"
        );
      })
      .catch(() => {
        toast.success(
          lang === "ru"
            ? "Не удалось отправить!"
            : lang === "en"
            ? "Failed to send!"
            : "Jo'natish muvafaqiyatsiz yakunlandi!"
        );
      })
      .finally(() => {
        setLoading(false);
      });

    values.name = "";
    resetForm({ values: "" });
  };

  const phoneRegExp = /^[0-9]{9}$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(
        lang === "ru"
          ? "Требуется имя пользователя, минимум 3 символа"
          : lang === "en"
          ? "Username is required, at least 3 characters"
          : "Foydalanuvchi nomi talab qilinadi, kamida 3 ta belgi"
      )
      .min(
        3,
        lang === "ru"
          ? "Минимум 3 символа"
          : lang === "en"
          ? "Minimal 3 characters"
          : "Minimal 3 ta belgi"
      )
      .max(
        20,
        lang === "ru"
          ? "Максимум 20 символов"
          : lang === "en"
          ? "Maximum 20 characters"
          : "Maksimal 20 ta belgi"
      ),
    number: Yup.string(
      lang === "ru"
        ? "Должен быть только номер"
        : lang === "en"
        ? "Must be only number"
        : "Faqat raqam bo'lishi kerak"
    )
      .matches(phoneRegExp, {
        message:
          lang === "ru"
            ? "Номер телефона недействителен"
            : lang === "en"
            ? "Phone number is not valid."
            : "Telefon raqami yaroqsiz.",
        excludeEmptyString: true,
      })
      .required(
        lang === "ru"
          ? "Необходимый номер телефона"
          : lang === "en"
          ? "Required phone number"
          : "Telefon raqami kiritish majburiy"
      ),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const loaderButton = (
    <svg
      className="inline mr-2 w-5 h-5 text-text-white animate-spin dark:text-white fill-gray-400 dark:fill-gray-400"
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
    <div className="w-full h-264 sm:h-312 rounded-xl p-4 sm:p-7 sm:mt-0  bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
          formik.values = initialValues;
        }}
        className=" flex flex-col"
        autoComplete="off"
      >
        <label className="text-base relative flex flex-col">
          {languages[lang].buyAll.nameLabel}
          <input
            type="text"
            name="name"
            id="name"
            placeholder={languages[lang].buyAll.placeholder}
            className={
              formik.touched.name && formik.errors.name
                ? "  h-48 text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 mb-3 sm:mb-6"
                : "  h-48 text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius mb-3 sm:mb-6"
            }
            minLength="3"
            maxLength="25"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
              {formik.errors.name}
            </span>
          ) : null}
        </label>
        <label className="relative flex flex-col">
          {languages[lang].buyAll.phoneLabel}
          <div
            className={
              formik.touched.number && formik.errors.number
                ? " flex items-center pl-4 h-48 text-base rounded-lg p-1 outline-none border  border-red-600 mb-4 sm:mb-6"
                : " flex items-center pl-4 h-48 text-base rounded-lg p-1 outline-none border  border-gray-input_radius mb-4 sm:mb-6"
            }
          >
            <Image
              src={"/Assets/Images/BuyAll/Flag.svg"}
              className="w-6 h-4"
              width={22}
              height={15}
              alt="site_logo"
            />
            <span className="text-base text-black ml-1">+998</span>
            <input
              type="number"
              name="number"
              id="number"
              placeholder="901234567"
              className=" outline-none w-full sm:ml-4 h-full p-2 "
              {...formik.getFieldProps("number")}
            />
            {formik.touched.number && formik.errors.number ? (
              <span className="text-red-600 text-xs absolute bottom-0 sm:bottom-2  left-2">
                {formik.errors.number}
              </span>
            ) : null}
          </div>
        </label>
        <button
          className="w-full h-48 bg-blue-base rounded-xl text-white  "
          type="submit"
        >
          {loading ? (
            <div>{loaderButton}</div>
          ) : lang === "ru" ? (
            "Отправить"
          ) : lang === "en" ? (
            "Send"
          ) : (
            "Yuborish"
          )}
        </button>
      </form>
    </div>
  );
};

export default BuyForm;
