import { useState } from "react";
import NavBar from "../components/NavBar";

function RequestResidentialContract() {

    const [step, setStep] = useState(1); // تتبع الخطوة الحالية
    const [formData, setFormData] = useState({
        role: "",
        purpose: "",
        ownershipType: "",
        deedNumber: "",
        deedDate: "",

        propertyType: "",
        stairsNumber: "",
        rooms: "",
        area: "",
        propertyDescription: "",
        contractDuration: "",
        ContractStartDate: "",

        ownerId: "",
        ownerName: "",
        ownerBirthDay: "",
        ownerIbsherPhone: "",
        ownerIBAN: "",

        renterId: "",
        renterName: "",
        renterBirthDay: "",
        renterIbsherPhone: "",

    });
    const [errors, setErrors] = useState({}); // لتخزين الأخطاء


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // دالة لإرسال البيانات إلى الخادم
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost/aqarSiteBackend/backend/api/addContractResdintel.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // تحويل البيانات إلى JSON
            });

            if (response.ok) {
                // في حالة النجاح
                const result = await response.json();
                console.log("تم إرسال البيانات بنجاح:", result);
            } else {
                // في حالة حدوث خطأ
                console.error("فشل إرسال البيانات:", response.statusText);
            }
        } catch (error) {
            console.error("حدث خطأ أثناء الإرسال:", error);
        }
    };
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
            if (formData.deedNumber.length != 12) newErrors.deedNumber = "رقم الصك يجب ان يتكون من 12 خانة";
            if (!formData.deedDate) newErrors.deedDate = "تاريخ إصدار الصك مطلوب.";
        }
        if (step === 4) {
            // التحقق من اسم المالك
            const arabicNameRegex = /^[\u0600-\u06FF]{2,}( [\u0600-\u06FF]{2,}){2}$/;
            if (!formData.ownerName) {
                newErrors.ownerName = "اسم المالك مطلوب.";
            } else if (!arabicNameRegex.test(formData.ownerName)) {
                newErrors.ownerName = "يجب أن يكون الاسم ثلاثياً وباللغة العربية.";
            }

            // التحقق من رقم هوية المالك
            if (!formData.ownerId) {
                newErrors.ownerId = "رقم الهوية مطلوب.";
            } else if (!/^\d{10}$/.test(formData.ownerId)) {
                newErrors.ownerId = "رقم الهوية يجب أن يتكون من 10 أرقام.";
            }

            // التحقق من رقم جوال المالك
            if (!formData.ownerIbsherPhone) {
                newErrors.ownerIbsherPhone = "رقم الجوال مطلوب.";
            } else if (!/^05\d{8}$/.test(formData.ownerIbsherPhone)) {
                newErrors.ownerIbsherPhone = "رقم الجوال يجب أن يبدأ بـ '05' ويتكون من 10 أرقام.";
            }

            if (!formData.ownerIBAN) {
                newErrors.ownerIBAN = "رقم الايبان مطلوب";
            } else if (!/^SA\d{22}$/i.test(formData.ownerIBAN)) {
                newErrors.ownerIBAN = "رقم الايبان يجب ان يبدأ بـ 'SA' ويحتوي على 22 رقمًا";
            }

        }

        if (step === 5) {
            // التحقق من اسم المالك
            const arabicNameRegex = /^[\u0600-\u06FF]{2,}( [\u0600-\u06FF]{2,}){2}$/;
            if (!formData.renterName) {
                newErrors.renterName = "اسم المالك مطلوب.";
            } else if (!arabicNameRegex.test(formData.renterName)) {
                newErrors.renterName = "يجب أن يكون الاسم ثلاثياً وباللغة العربية.";
            }

            // التحقق من رقم هوية المالك
            if (!formData.renterId) {
                newErrors.renterId = "رقم الهوية مطلوب.";
            } else if (!/^\d{10}$/.test(formData.renterId)) {
                newErrors.renterId = "رقم الهوية يجب أن يتكون من 10 أرقام.";
            }

            // التحقق من رقم جوال المالك
            if (!formData.renterIbsherPhone) {
                newErrors.renterIbsherPhone = "رقم الجوال مطلوب.";
            } else if (!/^05\d{8}$/.test(formData.renterIbsherPhone)) {
                newErrors.renterIbsherPhone = "رقم الجوال يجب أن يبدأ بـ '05' ويتكون من 10 أرقام.";
            }
        }

        //if(step === 4){
        //  if()
        //}
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



    return (
        <div>
            <NavBar />
            <div className="flex justify-center items-center min-h-[100vh] w-[100%] background-pattern bg-[#8c354e] py-[18vh]">
                <div className="flex flex-col items-center">
                    {/* Sub steps nav */}
                    <div className="flex mb-4">
                        <p className="text-white">{`الخطوة ${step} من 6`}</p>
                    </div>
                    <div className="w-[25vw] h-[fit-content] bg-white rounded-[5px] shadow-lg p-[20px] transition-all duration-300">
                        {/* عرض الخطوة بناءً على القيمة */}
                        {step === 1 && (
                            <div className="flex flex-col gap-y-[1rem] items-center text-right">
                                <p className="text-[1.2rem] font-semibold">طلبات قبل نبدأ</p>
                                <ul className="list-decimal rtl">
                                    <li>رقم الصك الإلكتروني من المؤجر</li>
                                    <li>معلومات هوية المؤجر والمستأجر</li>
                                    <li>جوال الطرفين المسجل في ابشر</li>
                                    <li>رقم الحساب البنكي (آيبان) للمؤجر</li>
                                    <li>الدور ، عدد الغرف ، عدد أدوار المبنى</li>
                                    <li>مساحة الوحدة العقارية</li>
                                    <li>وأخيراً 299 رس رسوم الخدمة</li>
                                </ul>
                                <button onClick={handleNext} className="w-[30%] h-[40px] rounded-[10px] bg-[#8c354e] text-white mt-4">
                                    التالي
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="flex flex-col items-center">
                                <p className="text-right w-[80%]">هل أنت المالك أم المستأجر؟</p>
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
                                        <p className="mt-4 text-right w-[80%]">ما هو الغرض من طلب العقد؟</p>
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
                                        <p className="mt-4 text-right w-[80%]">ما هو نوع صك الملكية؟</p>
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

                                <div className="flex justify-between w-[80%] mt-4">
                                    {formData.ownershipType === 'electronic' ? <button onClick={handleNext} className="w-[30%] h-[40px] rounded-[10px] bg-[#8c354e] text-white">
                                        التالي
                                    </button> : <div className="w-[30%] h-[40px] "></div>}
                                    <button onClick={handlePrev} className="w-[30%] h-[40px] rounded-[10px] bg-gray-500 text-white">
                                        السابق
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="flex flex-col items-center">
                                <p className="text-[1.2rem] font-semibold">معلومات الوحده</p>
                                <p className="mt-2 text-right w-[80%]">الرجاء إدخال رقم الصك:</p>
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
                                        <p className="mt-2 text-right w-[80%]">الرجاء إدخال تاريخ إصدار الصك:</p>
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
                                {formData.deedDate && (
                                    <>
                                        <p className="mt-2 text-right w-[80%]">رقم الدور</p>
                                        <input
                                            type="number"
                                            name="stairsNumber"
                                            value={formData.stairsNumber}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        ></input>
                                    </>
                                )}
                                {formData.stairsNumber && (
                                    <>
                                        <p className="mt-2 text-right w-[80%]">عدد الغرف</p>
                                        <input
                                            type="number"
                                            name="roomsNumber"
                                            value={formData.roomsNumber}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        ></input>
                                    </>
                                )}
                                {formData.roomsNumber && (
                                    <>
                                        <p className="mt-2 text-right w-[80%]">مساحة الوحدة</p>
                                        <input
                                            type="number"
                                            name="ApartmentArea"
                                            value={formData.ApartmentArea}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        ></input>
                                    </>
                                )}
                                <div className="flex justify-between w-[80%] mt-4">
                                    {formData.ApartmentArea ? <button onClick={handleNext} className="w-[30%] h-[40px] rounded-[10px] bg-[#8c354e] text-white">
                                        التالي
                                    </button> : <div className="w-[30%] h-[40px]"></div>}
                                    <button onClick={handlePrev} className="w-[30%] h-[40px] rounded-[10px] bg-gray-500 text-white">
                                        السابق
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 4 && (
                            <div className="flex flex-col items-center">
                                <p className="text-[1.2rem] font-semibold">معلومات المالك</p>
                                <p className="mt-2 text-right w-[80%]">اسم المالك</p>
                                <input
                                    type="text"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    className="border p-2 mt-2 w-[80%]"
                                ></input>
                                {errors.ownerName && <p className="text-red-500">{errors.ownerName}</p>}
                                {formData.ownerName && (
                                    <>
                                        <p className="mt-2 text-right w-[80%]">هوية المالك</p>
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
                                {errors.ownerId && <p className="text-red-500">{errors.ownerId}</p>}
                                {formData.ownerId && (
                                    <>
                                        <p className="mt-2 text-right w-[80%]">تاريخ ميلاد المالك</p>
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
                                        <p className="mt-2 text-right w-[80%]">رقم الجوال المسجل في ابشر</p>
                                        <input
                                            type="number"
                                            name="ownerIbsherPhone"
                                            value={formData.ownerIbsherPhone}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        ></input>
                                    </>
                                )}
                                {errors.ownerIbsherPhone && <p className="text-red-500">{errors.ownerIbsherPhone}</p>}
                                {formData.ownerIbsherPhone && (
                                    <>
                                        <p className="mt-2 text-right w-[80%]">رقم الايبان البنكي</p>
                                        <input
                                            type="text"
                                            name="ownerIBAN"
                                            value={formData.ownerIBAN}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        ></input>
                                    </>
                                )}
                                {errors.ownerIBAN && <p className="text-red-500">{errors.ownerIBAN}</p>}
                                <div className="flex justify-between w-[80%] mt-4">
                                    {formData.ownerIBAN ?
                                        <button onClick={handleNext} className="w-[30%] h-[40px] rounded-[10px] bg-[#8c354e] text-white">
                                            التالي
                                        </button>
                                        : <div className="w-[30%] h-[40px]"></div>}
                                    <button onClick={handlePrev} className="w-[30%] h-[40px] rounded-[10px] bg-gray-500 text-white">
                                        السابق
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="flex flex-col items-center">
                                <p className="text-[1.2rem] font-semibold">معلومات المستأجر</p>
                                <p className="mt-2 text-right w-[80%]">اسم المستأجر</p>
                                <input
                                    type="text"
                                    name="renterName"
                                    value={formData.renterName}
                                    onChange={handleChange}
                                    className="border p-2 mt-2 w-[80%]"
                                ></input>
                                {errors.renterName && <p className="text-red-500">{errors.renterName}</p>}
                                {formData.renterName && (
                                    <>
                                        <p className="mt-2 text-right w-[80%]">هوية المستأجر</p>
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
                                {errors.renterId && <p className="text-red-500">{errors.renterId}</p>}
                                {formData.renterId && (
                                    <>
                                        <p className="mt-2 text-right w-[80%]">تاريخ ميلاد المستأجر</p>
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
                                        <p className="mt-2 text-right w-[80%]">رقم الجوال المسجل في ابشر</p>
                                        <input
                                            type="number"
                                            name="renterIbsherPhone"
                                            value={formData.renterIbsherPhone}
                                            onChange={handleChange}
                                            className="border p-2 mt-2 w-[80%]"
                                        ></input>
                                    </>
                                )}
                                {errors.renterIbsherPhone && <p className="text-red-500">{errors.renterIbsherPhone}</p>}
                                <div className="flex justify-between w-[80%] mt-4">
                                    {formData.renterIbsherPhone ?
                                        <button onClick={handleSubmit} className="w-[30%] h-[40px] rounded-[10px] bg-[#8c354e] text-white">
                                            ارسال
                                        </button>
                                        : <div className="w-[30%] h-[40px]"></div>}
                                    <button onClick={handlePrev} className="w-[30%] h-[40px] rounded-[10px] bg-gray-500 text-white">
                                        السابق
                                    </button>
                                </div>

                            </div>
                        )}
                        {step > 5 && (
                            <div className="flex flex-col items-center">
                                <p className="text-[1.2rem] font-semibold">لقد تم ارسال بياناتك بنجاح</p>
                                <p>الخطوة الاخيرة</p>
                                <p>قم بتحويل قيمة الخدمه 250 ريال على احدى حساباتنا</p>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestResidentialContract
