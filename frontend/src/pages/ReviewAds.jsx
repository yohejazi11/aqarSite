import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { TbBackground } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPropertyById, updatePropertyStatus, deleteProperty } from '../services/api';

function ReviewAds() {
    const { id } = useParams()

    let navigate=useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false); // لتحكم بحالة التحميل
    useEffect(() => {
        console.log(id)

        const fetchProperty = async () => {
            try {
                const data = await fetchPropertyById(id);
                if (data.success) {
                    setData(data.data);
                    console.log(data)
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
                    setTimeout(() => navigate('/admindashboard'), 500);
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


    const approveAd = async () => {
        setLoading(true);
        try {
            const response = await updatePropertyStatus(id, "published"); // "published" هي الحالة الجديدة
            if (response.success) {
                alert("تم نشر الإعلان بنجاح");
                setData({ ...data, status: "published" }); // تحديث الحالة في الواجهة
            } else {
                alert("حدث خطأ أثناء نشر الإعلان");
            }
        } catch (error) {
            console.error('Error approving ad:', error);
            alert("حدث خطأ أثناء نشر الإعلان");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar></NavBar>

            <div className="w-[100%] h-[100%] flex justify-center items-center pt-[30vh]">
                <div className="w-[80%] h-[100%] flex">

                    {/* حاوية الصور */}
                    <div className="w-[20%] h-[100%]">

                    </div>

                    {/* حاوية البيانات */}
                    <div className="w-[80%] h-[100%] flex flex-col items-end gap-y-[1rem]">

                        <p className="text-[1.5rem] font-bold">{data.title}</p>

                        <p>{data.offer === 'rent' ? 'للايجار' : 'للبيع'}</p>

                        <div className="flex gap-x-[1rem]">

                            <p>{data.city}</p>
                            <p>{data.neighborhood}</p>

                        </div>

                        <div className="flex flex-row-reverse items-center gap-x-[1.5rem] p-[10px]">
                            <div className="flex items-center gap-x-[0.5rem] text-[1.2rem]">
                                <p>{data.bedrooms} <span>غرف نوم</span></p>
                                <FaBed></FaBed>
                            </div>
                            <div className="flex items-center gap-x-[0.5rem] text-[1.2rem]">
                                <p>{data.bathrooms}</p>
                                <FaBath></FaBath>
                            </div>
                            <div className="flex items-center gap-x-[0.5rem] text-[1.2rem]">
                                <p>{data.area} m</p>
                                <TbBackground></TbBackground>
                            </div>
                        </div>

                        <p>{data.description}</p>

                        <div className="flex gap-x-[0.5rem]">
                            <p>{data.price}</p>
                            <p> : السعر</p>
                        </div>
                        {/* معلومات المعلن */}
                        <div className="flex flex-col items-end">
                            <p className="text-[1.5rem] font-bold">معلومات المعلن</p>

                            <div className="flex gap-x-[1rem]">
                                <p>{data.owner_name}</p>

                                <p> : رقم الجوال</p>

                            </div>

                            <div className="flex gap-x-[1rem]">
                                <p>{data.owner_number}</p>
                                <p> : رقم الجوال</p>
                            </div>

                        </div>

                        <div className="flex gap-x-[2rem] items-center">

                        <button
                            onClick={handleDelete}
                            disabled={loading} // تعطيل الزر أثناء التحميل
                            className="h-[40px] w-[150px] rounded-[10px] bg-gray-500 text-white "
                        >
                            {loading ? 'جار الحذف...' : 'حذف'}
                        </button>
                            <button
                                className={`h-[40px] w-[150px] rounded-[10px] ${loading ? "bg-gray-400" : "bg-[#8c354e]"} text-white`}
                                onClick={approveAd}
                                disabled={loading || data.adsStatus === 'published'}
                            >
                                {loading ? "جاري النشر..." : "نشر"}
                            </button>


                        </div>


                    </div>
                </div>
            </div>
            <Footer></Footer>

        </div>
    )
}

export default ReviewAds
