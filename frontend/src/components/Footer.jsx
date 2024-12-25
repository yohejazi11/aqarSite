import { Link } from "react-router-dom"
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSnapchatSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-[100%] h-[30vh] flex flex-col items-center justify-between p-[20px] footer-background-pattern bg-gray-100 mt-[10vh]">
      <p></p>

<div className="flex items-center gap-x-[1.5rem]">

</div>


      <div className="flex items-center gap-x-[1.5rem]">
        <Link>المساعدة والدعم</Link>
        <Link>نبذة عنا</Link>
        <Link>اتصل بنا</Link>
      </div>

      <p>جميع الحقوق محفوظة لصالح بودان للخدمات العقارية</p>
    </div>
  )
}

export default Footer
