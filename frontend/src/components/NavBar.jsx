import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate=useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`fixed w-[100%] h-[15vh] flex flex-col border-[1px] shadow-lg z-50 text-[#8c354e] ${isScrolled ? "border-b-[#8c354e] bg-white " : null} transition-all duration-300`}>
            <div className="bg-slate-100 w-[100%] h-[5vh] flex justify-between">
                <ul className="h-[100%] flex items-center gap-x-[1.5rem] pl-[20px]">
                    <li><button className="flex items-center gap-x-[0.5rem]"><span>+966564044170</span><FaWhatsapp></FaWhatsapp></button></li>
                    <li><button className="flex items-center gap-x-[0.5rem]"><span>info@aqartec.com</span><MdEmail></MdEmail></button></li>
                    <li><button className="flex items-center gap-x-[0.5rem]"><span>+966564044170</span><FaPhoneAlt></FaPhoneAlt></button></li>
                </ul>

                <ul className="flex items-center gap-x-[1.5rem] pr-[20px]">
                    <li><Link to={'/signup'}>تسجيل</Link></li>
                    <li><Link to={'/login'}>دخول</Link></li>
                </ul>
            </div>

            <div className="w-[100%] h-[10vh] flex items-center justify-between pl-[20px] bg-white">
                <div className="h-[100%] flex items-center gap-x-[1rem]">
                    <button onClick={()=>{navigate('/addproperty')}} className="w-[10vw] h-[65%] rounded-[10px] border-[#8c354e] border-[1px] bg-transparent text-[#8c354e]">اعرض عقارك</button>
                    <button onClick={()=>{navigate('/')}} className="w-[10vw] h-[65%] rounded-[10px] bg-[#8c354e] text-white">خدمة ادارة الاملاك</button>
                </div>

                <div className=" flex items-center">
                    <ul className=" flex items-center gap-x-[1rem]">
                        <li><Link to={'/explorer'}>استكشاف العقارات</Link></li>
                        <li><Link to={'/home'}>الرئيسية</Link></li>
                        <li><img className="h-[10vh]" src={'/logo.png'}></img></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavBar;

