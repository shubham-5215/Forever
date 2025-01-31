import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="f">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="Forever Logo" className="mb-5 w-32" />
          <p className="w-full sm:w-2/3 text-gray-600">
            Shop with Forever and experience the convenience of online shopping
            like never before.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col flex-1 text-gray-600 cursor-pointer">
            <li
              onClick={() => {
                scrollToTop();
                navigate("/");
              }}
              className="mb-2"
            >
              Home
            </li>
            <li
              onClick={() => {
                scrollToTop();
                navigate("/about");
              }}
              className="mb-2"
            >
              About Us
            </li>
            <li
              onClick={() => {
                scrollToTop();
                navigate("/delivery");
              }}
              className="mb-2"
            >
              Delivery
            </li>
            <li
              onClick={() => {
                scrollToTop();
                navigate("/privacy-policy");
              }}
              className="mb-2"
            >
              Privacy Policy
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col flex-1 text-gray-600">
            <li className="mb-2">+91 8292831799</li>
            <li className="mb-2">shubhamkumarsingh424@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ forever.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
