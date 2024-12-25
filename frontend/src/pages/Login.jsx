import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // حالة التحميل
    const navigate = useNavigate();
    function login() {
        // التحقق من صحة المدخلات أولاً
        if (!email || !password) {
            alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
            return;
        }
        if (!email || !password) {
            alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
            return;
        }

        setLoading(true); // بدء التحميل
        // إرسال البيانات إلى الخادم للتحقق
        axios
            .post("http://localhost/aqarSiteBackend/backend/api/login.php", {
                email: email,
                password: password,
            })
            .then(function (response) {
                const user = response.data; // نفترض أن الخادم يعيد معلومات المستخدم
                if (user.success) {
                    localStorage.setItem("userName", user.name);
                    localStorage.setItem("userID", user.id);
                    navigate("/admindashboard");
                } else {
                    alert("بيانات الدخول غير صحيحة");
                }
            })
            .catch(function (error) {
                console.error("خطأ أثناء تسجيل الدخول:", error);
                alert("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى لاحقًا.");
            })
            .finally(() => {
                setLoading(false); // إيقاف التحميل
            });
    }
    
    return (
        <div>
            <NavBar></NavBar>
            <div className="w-full min-h-[55vh] flex justify-center items-center">
                <div className="bg-gray-100 p-6 rounded shadow-lg">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="البريد الإلكتروني"
                        className="border mb-3 p-2 w-full rounded"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="كلمة المرور"
                        className="border mb-3 p-2 w-full rounded"
                    />
                    <button
                        onClick={login}
                        disabled={loading} // تعطيل الزر أثناء التحميل
                        className={`w-full py-2 px-4 rounded ${
                            loading ? "bg-gray-400" : "bg-blue-600 text-white"
                        }`}
                    >
                        {loading ? "جارٍ التحقق..." : "تسجيل دخول"}
                    </button>
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default Login
