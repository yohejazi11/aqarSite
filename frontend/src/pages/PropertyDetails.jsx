import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { TbBackground } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { fetchPropertyById,deleteProperty } from '../services/api';
import { useEffect, useState } from "react";

function PropertyDetails() {

    const navigate = useNavigate()

    const [property, setProperty] = useState([]);

    const [loading, setLoading] = useState(false); // لتحكم بحالة التحميل

    const { id } = useParams()


    useEffect(() => {
        console.log(id)

        const fetchProperty = async () => {
            try {
                const data = await fetchPropertyById(id);
                if (data.success) {
                    setProperty(data.data);
                    console.log(property)
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchProperty();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
            setLoading(true);
            try {
                const response = await deleteProperty(id); // حذف العقار بناءً على المعرف
                if (response.success) {
                    alert('تم حذف الإعلان بنجاح');
                    // إعادة التوجيه إلى صفحة الإعلانات أو التحديث
                    setTimeout(() => navigate('/home'), 500);
                } else {
                    alert(response.message || 'فشل في حذف الإعلان');
                    console.log(id)
                }
            } catch (error) {
                alert('حدث خطأ أثناء حذف الإعلان');
            } finally {
                setLoading(false);
            }
        }
    };

    function intrestingWhats() {
        window.location.href = 'https://wa.me/966503453670?text=مهتم';

    }


    return (
        <div>
            <NavBar></NavBar>

            <div className="w-[100%]  flex flex-col items-end gap-y-[1rem] justify-end px-[5vw]">


                <div className="flex w-[95%] h-[95vh] mt-[20vh]">

                    <div className="w-[25%] flex flex-col items-center justify-between p-[10px] gap-y-[1rem]">
                        <img className="w-[100%] h-[33%] rounded-[5px]" src={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}></img>
                        <img className="w-[100%] h-[33%] rounded-[5px]" src={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}></img>
                        <img className="w-[100%] h-[33%] rounded-[5px]" src={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}></img>
                    </div>
                    <div className="w-[75%] h-[100%] p-[10px]">
                        <img className="w-[100%] h-[100%] rounded-[5px]" src={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}></img>
                    </div>

                </div>

                <div className="w-[95%] flex flex-row-reverse justify-between">
                    <div className="flex flex-col items-end w-[60%]">
                        <div className="p-[10px] text-[2rem] font-bold">ريال {property.price}</div>

                        <div className="p-[10px]"> {property.city} ، حي {property.neighborhood}</div>

                        <div className="flex flex-row-reverse items-center gap-x-[1.5rem] p-[10px]">
                            <div className="flex items-center gap-x-[0.5rem] text-[1.2rem]">
                                <p>{property.bedrooms} <span>غرف نوم</span></p>
                                <FaBed></FaBed>
                            </div>
                            <div className="flex items-center gap-x-[0.5rem] text-[1.2rem]">
                                <p>{property.bathrooms}</p>
                                <FaBath></FaBath>
                            </div>
                            <div className="flex items-center gap-x-[0.5rem] text-[1.2rem]">
                                <p>{property.area} m</p>
                                <TbBackground></TbBackground>
                            </div>
                        </div>
                        {/* عنوان الاعلان */}
                        <div className="p-[10px] text-[1.5rem] font-semibold">{property.title}</div>
                        {/* نص الاعلان*/}
                        <div className="flex flex-col text-right w-[80%] min-h-[15vh] p-[10px]">
                            {property.description}
                        </div>
                    </div>


                    <div className="w-[calc(25%-20px)] flex flex-col items-center gap-y-[1rem] rounded-[5px] border-[1px] p-[20px] ml-[10px]">

                        <img className="w-[40%]" src={'/logo.png'}></img>
                        <p>بودان للخدمات العقارية</p>

                        <div className="w-[100%] flex justify-evenly">
                            <button className="w-[70px] h-[40px] flex justify-center items-center bg-blue-100 text-green-500 text-[1.5rem] rounded-[5px]" onClick={intrestingWhats}><FaWhatsapp></FaWhatsapp></button>
                            <button className="w-[70px] h-[40px] flex justify-center items-center bg-blue-100 text-blue-500 text-[1.5rem] rounded-[5px]" onClick={intrestingWhats}><MdEmail></MdEmail></button>
                            <button className="w-[70px] h-[40px] flex justify-center items-center bg-blue-100 text-blue-500 text-[1.5rem] rounded-[5px]" onClick={intrestingWhats}><FaPhoneAlt></FaPhoneAlt></button>

                        </div>


                    </div>
                </div>


                {/* معلومات العقار */}
                <div className="flex flex-col text-right w-[60%] border-[1px]">
                    <p className="p-[15px] text-[1.5rem] font-semibold">معلومات العقار</p>
                    <div className="flex flex-row-reverse w-[100%] border-[1px]">
                        <div className="flex flex-row-reverse w-[50%] p-[15px]">
                            <div className="w-[50%]">نوع العقار</div>
                            <div className="w-[50%] font-semibold">{property.subCategory}</div>
                        </div>
                        <div className="flex flex-row-reverse w-[50%] p-[15px]">
                            <div className="w-[50%]">حالة البناء</div>
                            <div className="w-[50%] font-semibold">جاهز</div>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse w-[100%] border-[1px]">
                        <div className="flex flex-row-reverse w-[50%] p-[15px]">
                            <div className="w-[50%]">نوع العرض</div>
                            <div className="w-[50%] font-semibold">{property.type === 'sale' ? 'للبيع' : 'للايجار'}</div>
                        </div>
                        <div className="flex flex-row-reverse w-[50%] p-[15px]">
                            <div className="w-[50%]">التأثيث</div>
                            <div className="w-[50%] font-semibold">{property.furniture === 1 ? 'مؤثث' : 'غير مؤثث'}</div>
                        </div>
                    </div>
                </div>

                <div className="w-[60%] h-[25vh] border-[1px]">
                    <button
                        onClick={handleDelete}
                        disabled={loading} // تعطيل الزر أثناء التحميل
                        className="h-[40px] w-[150px] rounded-[10px] bg-gray-500 text-white "
                    >
                        {loading ? 'جار الحذف...' : 'حذف'}
                    </button>
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default PropertyDetails
