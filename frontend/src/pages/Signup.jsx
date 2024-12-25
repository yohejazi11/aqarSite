import React, { useState } from "react";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user", // القيمة الافتراضية: مستخدم
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // إضافة التاريخ الحالي إلى البيانات
        const signupDate = new Date().toISOString();

        try {
            const response = await fetch("http://localhost/aqarSiteBackend/backend/api/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, signupDate }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage("تم التسجيل بنجاح!");
                setErrorMessage("");
            } else {
                setErrorMessage(result.message || "حدث خطأ أثناء التسجيل.");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("تعذر الاتصال بالخادم.");
            setSuccessMessage("");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>صفحة التسجيل</h2>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="name">الاسم:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="email">البريد الإلكتروني:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="password">كلمة المرور:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="role">الدور:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="user">مستخدم</option>
                        <option value="admin">إدمن</option>
                    </select>
                </div>
                <button type="submit" style={{ padding: "10px", width: "100%" }}>
                    تسجيل
                </button>
            </form>
        </div>
    );
};

export default Signup;
