import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import AdsItems from "../components/AdsItems"
import ContractItems from "../components/ContractItems"
import ManagementItems from "../components/ManagementItems"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
function AdminDashboard() {

    const [reviewState, setReviewState] = useState(""); // الحالة لتحديد نوع الطلب
    const [data, setData] = useState([]); // لتخزين البيانات المسترجعة
    const [loading, setLoading] = useState(false); // لإظهار مؤشر التحميل

    let adminName = localStorage.getItem("userName");
    let userID = localStorage.getItem("userID");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userID) {
            navigate("/login");
        }
    }, []);

    // جلب البيانات عند تغيير reviewState
    useEffect(() => {
        if (!reviewState) return;

        setLoading(true); // تفعيل مؤشر التحميل

        let apiUrl;
        switch (reviewState) {
            case "ads":
                apiUrl = "http://localhost/aqarSiteBackend/backend/api/getProperty.php"; // استبدل بالمسار الفعلي للـ API
                break;
            case "commercialContract":
                apiUrl = "http://localhost/aqarSiteBackend/backend/api/getContractCommerical.php"; // استبدل بالمسار الفعلي للـ API
                break;
            case "residentialContract":
                apiUrl = "http://localhost/aqarSiteBackend/backend/api/getContractResdintel.php"; // استبدل بالمسار الفعلي للـ API
                break;
            case "management":
                apiUrl = "http://localhost/aqarSiteBackend/backend/api/getManagementRequist.php"; // استبدل بالمسار الفعلي للـ API
                break;
            default:
                apiUrl = null;
        }

        if (apiUrl) {
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((response) => {
                    setData(response.data); // تخزين البيانات المسترجعة
                    console.log(data)
                    setLoading(false); // إيقاف مؤشر التحميل
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setLoading(false); // إيقاف مؤشر التحميل حتى عند الفشل
                });

        }

    }, [reviewState]);

    function swapstate(state) {
        setReviewState(state);
    }
    return (
        <div>
            <NavBar></NavBar>

            <div className="w-[100%] min-h-[100vh] flex flex-col gap-y-[2rem] items-center pt-[20vh]">
                <div className="w-[80%] flex justify-center">
                    <ul className="flex gap-x-[1.5rem]">
                        <li><button onClick={() => { swapstate('commercialContract') }}>طلبات العقودالتجارية</button></li>
                        <li><button onClick={() => { swapstate('residentialContract') }}>طلبات العقود السكنية</button></li>
                        <li><button onClick={() => { swapstate('management') }}>طلبات ادارة الاملاك</button></li>
                        <li><button onClick={() => { swapstate('ads') }}>طلبات عرض العقارات</button></li>
                        <li><Link to={'/addproperty'}>اضافة عقار</Link></li>
                    </ul>
                </div>

                <div className="w-[80%] h-[7vh] px-[15px] flex justify-end items-center text-[1.5rem] font-semibold bg-slate-200">
                    {adminName + " : مرحبا"}
                </div>

                <div className="w-[80%] h-[100vh] border-[1px] border-black">
                    {reviewState === "ads" &&
                        data.map((item, index) => (
                            <AdsItems
                                key={index}
                                id={item.id}
                                title={item.title}
                                city={item.city}
                                offer={item.offer}
                                description={item.description}
                            />
                        ))

                    }

                    {reviewState === "commercialContract" &&

                        data.map((item, index) => (
                            <ContractItems
                                key={index}
                                id={item.ContractID}
                                title='عقد تجاري'
                                contractType='commercial'
                                LessorName={item.LessorName}
                                PropertyType={item.PropertyType}

                            />
                        ))
                    }

                    {reviewState === "residentialContract" &&
                        data.map((item, index) => (
                            <ContractItems
                                key={index}
                                id={item.ContractID}
                                title='عقد سكني'
                                contractType='residential'
                                LessorName={item.LessorName}
                                PropertyType={item.PropertyType}
                            />
                        ))
                    }

                    {reviewState === "management" &&
                        <ContractItems

                        ></ContractItems>
                    }

                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default AdminDashboard
