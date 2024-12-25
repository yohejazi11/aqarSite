import { useState } from "react";
import NavBar from "../components/NavBar";

function RequestCommercialContract() {
    const [step, setStep] = useState(1); // تتبع الخطوة الحالية
    const [formData, setFormData] = useState({
        role: "",
        purpose: "",
        ownershipType: "",
        deedNumber: "",
        deedDate: "",
        ownerId: "",
        ownerName: "",
        ownerBirthDay: "",
        ownerIbsherPhone: "",

        renterId: "",
        renterName: "",
        renterBirthDay: "",
        renterIbsherPhone: "",
        
    });
    const [errors, setErrors] = useState({}); // لتخزين الأخطاء

    // التحقق من المدخلات
    const validateStep = () => {
        const newErrors = {};

        if (step === 2) {
            if (!formData.role) newErrors.role = "يجب اختيار المالك أو المستأجر.";
            if (!formData.purpose) newErrors.purpose = "الغرض من طلب العقد مطلوب.";
            if (!formData.ownershipType) {
                newErrors.ownershipType = "نوع صك الملكية مطلوب.";
            } else if (formData.ownershipType === "none") {
                newErrors.ownershipType = "لا يمكن إنشاء عقد بدون صك إلكتروني.";
            }
        }

        if (step === 3) {
            if (!formData.deedNumber) newErrors.deedNumber = "رقم الصك مطلوب.";
            if (!formData.deedDate) newErrors.deedDate = "تاريخ إصدار الصك مطلوب.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // إذا لم توجد أخطاء
    };

    // الانتقال للخطوة التالية
    const handleNext = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    // العودة للخطوة السابقة
    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // تحديث القيم المدخلة
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center h-[100vh] w-[100%] bg-[#8c354e]">
                <div className="flex flex-col items-center">
                    {/* Sub steps nav */}
                    <div className="flex mb-4">
                        <p className="text-white">{`الخطوة ${step} من 3`}</p>
                    </div>
                    <div className="w-[25vw] h-[60vh] bg-white rounded-[15px] shadow-lg p-[20px]">
                        {/* عرض الخطوة بناءً على القيمة */}
                        {step === 1 && (
                            <div className="flex flex-col items-center">
                                <p>طلبات قبل نبدأ</p>
                                <p>رقم الصك الإلكتروني من المؤجر</p>
                                <p>معلومات هوية المؤجر والمستأجر</p>
                                <p>جوال الطرفين المسجل في ابشر</p>
                                <p>رقم الحساب البنكي (آيبان) للمؤجر</p>
                                <p>الدور ، عدد الغرف ، عدد أدوار المبنى</p>
                                <p>مساحة الوحدة العقارية</p>
                                <p>وأخيراً 299 رس رسوم الخدمة</p>
                                <button onClick={handleNext} className="w-[50%] h-[40px] bg-[#8c354e] text-white mt-4">
                                    التالي
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="flex flex-col items-center">
                                <p>هل أنت المالك أم المستأجر؟</p>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="border p-2 mt-2 w-[80%]"
                                >
                                    <option value="">اختر</option>
                                    <option value="owner">مالك</option>
                                    <option value="tenant">مستأجر</option>
                                </select>
                                {errors.role && <p className="text-red-500">{errors.role}</p>}

                                {formData.role && (
                                    <>
                                        <p className="mt-4">ما هو الغرض من طلب العقد؟</p>
                                        <select
                                            name="purpose"
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        >
                                            <option value="">اختر</option>
                                            <option value="citizen_support">حساب المواطن</option>
                                            <option value="social_security">الضمان الاجتماعي</option>
                                            <option value="proof_of_residence">إثبات سكن لأحد الجهات</option>
                                        </select>
                                        {errors.purpose && <p className="text-red-500">{errors.purpose}</p>}
                                    </>
                                )}

                                {formData.purpose && (
                                    <>
                                        <p className="mt-4">ما هو نوع صك الملكية؟</p>
                                        <select
                                            name="ownershipType"
                                            value={formData.ownershipType}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        >
                                            <option value="">اختر</option>
                                            <option value="electronic">صك إلكتروني</option>
                                            <option value="none">لا يوجد صك</option>
                                        </select>
                                        {errors.ownershipType && (
                                            <p className="text-red-500">{errors.ownershipType}</p>
                                        )}
                                    </>
                                )}

                                <div className="flex justify-between w-full mt-4">
                                    <button onClick={handlePrev} className="w-[45%] h-[40px] bg-gray-500 text-white">
                                        السابق
                                    </button>
                                    {formData.ownershipType === "electronic" && (
                                        <button onClick={handleNext} className="w-[45%] h-[40px] bg-[#8c354e] text-white">
                                            التالي
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="flex flex-col items-center">
                                <p>الرجاء إدخال رقم الصك:</p>
                                <input
                                    type="text"
                                    name="deedNumber"
                                    value={formData.deedNumber}
                                    onChange={handleChange}
                                    className="border p-2 mt-2 w-[80%]"
                                />
                                {errors.deedNumber && <p className="text-red-500">{errors.deedNumber}</p>}
                                {formData.deedNumber && (
                                    <>
                                        <p className="mt-4">الرجاء إدخال تاريخ إصدار الصك:</p>
                                        <input
                                            type="date"
                                            name="deedDate"
                                            value={formData.deedDate}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        />
                                    </>

                                )}

                                {errors.deedDate && <p className="text-red-500">{errors.deedDate}</p>}

                                <div className="flex justify-between w-full mt-4">
                                    <button onClick={handlePrev} className="w-[45%] h-[40px] bg-gray-500 text-white">
                                        السابق
                                    </button>
                                    <button onClick={handleNext} className="w-[45%] h-[40px] bg-[#8c354e] text-white">
                                        التالي
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 4 && (
                            <div className="flex flex-col items-center">
                                <p>معلومات المالك</p>
                                <p>اسم المالك</p>
                                <input
                                    type="text"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    className="border p-2 mt-2 w-[80%]"
                                ></input>

                                {formData.ownerName && (
                                    <>
                                        <p>هوية المالك</p>
                                        <input
                                            type="number"
                                            name="ownerId"
                                            value={formData.ownerId}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"

                                        >
                                        </input>
                                    </>
                                )}
                                {formData.ownerId && (
                                    <>
                                        <p>تاريخ ميلاد المالك</p>
                                        <input
                                            type="date"
                                            name="ownerBirthDay"
                                            value={formData.ownerBirthDay}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        ></input>
                                    </>
                                )}
                                {formData.ownerBirthDay && (
                                    <>
                                        <p>رقم الجوال المسجل في ابشر</p>
                                        <input
                                            type="number"
                                            name="ownerIbsherPhone"
                                            value={formData.ownerIbsherPhone}
                                            onChange={handleChange}
                                        ></input>
                                    </>

                                )}
                                <div className="flex justify-between w-full mt-4">
                                    <button onClick={handlePrev} className="w-[45%] h-[40px] bg-gray-500 text-white">
                                        السابق
                                    </button>
                                    {formData.ownerIbsherPhone && (

                                        <button onClick={handleNext} className="w-[45%] h-[40px] bg-[#8c354e] text-white">
                                            التالي
                                        </button>

                                    )}
                                </div>


                            </div>
                        )}

                        {step > 4 && (
                            <div className="flex flex-col items-center">
                                <p>معلومات المستأجر</p>
                                <p>اسم المستأجر</p>
                                <input
                                    type="text"
                                    name="renterName"
                                    value={formData.renterName}
                                    onChange={handleChange}
                                    className="border p-2 mt-2 w-[80%]"
                                ></input>

                                {formData.renterName && (
                                    <>
                                        <p>هوية المستأجر</p>
                                        <input
                                            type="number"
                                            name="renterId"
                                            value={formData.renterId}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"

                                        >
                                        </input>
                                    </>
                                )}
                                {formData.renterId && (
                                    <>
                                        <p>تاريخ ميلاد المستأجر</p>
                                        <input
                                            type="date"
                                            name="renterBirthDay"
                                            value={formData.renterBirthDay}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        ></input>
                                    </>
                                )}
                                {formData.renterBirthDay && (
                                    <>
                                        <p>رقم الجوال المسجل في ابشر</p>
                                        <input
                                            type="number"
                                            name="renterIbsherPhone"
                                            value={formData.renterIbsherPhone}
                                            onChange={handleChange}
                                        ></input>
                                    </>

                                )}
                                <div className="flex justify-between w-full mt-4">
                                    <button onClick={handlePrev} className="w-[45%] h-[40px] bg-gray-500 text-white">
                                        السابق
                                    </button>
                                    {formData.renterIbsherPhone && (

                                        <button onClick={handleNext} className="w-[45%] h-[40px] bg-[#8c354e] text-white">
                                            التالي
                                        </button>

                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestCommercialContract;

