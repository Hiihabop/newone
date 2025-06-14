import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const Header_payment = (porps) => {
  return (
    <Link
      onClick={porps.onclick}
      to={porps.to}
      className="p-[16px] flex items-center"
    >
      <MdChevronLeft className="text-3xl" />
      <div className="flex items-center">
        <p className="font-semibold text-sm ml-1 mb-1">{porps.text}</p>
      </div>
    </Link>
  );
};

export default Header_payment;
