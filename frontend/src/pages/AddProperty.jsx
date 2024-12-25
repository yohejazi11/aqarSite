import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";

function AddProperty() {
    const [propertyForm, setPropertyForm] = useState({
        title: "",
        type: "",
        offer: "",
        area: "",
        stairs: "",
        stairsNumer: "",
        description: "",
        bedroom: "",
        bathroom: "",
        price: "",
        city: "",
        neighborhood: "",
        ownerNumber: "",
        ownerName: "",
    });

    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviews(previewUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData();
        Object.keys(propertyForm).forEach((key) => {
            formData.append(key, propertyForm[key]);
        });

        images.forEach((image) => {
            formData.append("images[]", image);
        });

        try {
            const response = await axios.post(
                "http://localhost/aqarSiteBackend/backend/api/addProperty.php",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data.success) {
                setMessage("تم إضافة العقار بنجاح!");
                setPropertyForm({
                    title: "",
                    type: "",
                    offer: "",
                    area: "",
                    stairs: "",
                    stairsNumer: "",
                    description: "",
                    bedroom: "",
                    bathroom: "",
                    price: "",
                    city: "",
                    neighborhood: "",
                    ownerNumber: "",
                    ownerName: "",
                });
                setImages([]);
                setPreviews([]);
            } else {
                setMessage("حدث خطأ أثناء إضافة العقار.");
            }
        } catch (error) {
            console.error("Error adding property:", error);
            setMessage("خطأ في الاتصال بالخادم.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="w-full min-h-[100vh] flex flex-col items-center pt-[20vh]">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-end w-[80%] lg:w-[50%] space-y-4 border-[1px] border-[#8c354e] rounded-[5px] p-[15px]"
                >
                    <input
                        type="text"
                        placeholder="عنوان العقار"
                        className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "
                        value={propertyForm.title}
                        onChange={(e) =>
                            setPropertyForm((prev) => ({ ...prev, title: e.target.value }))
                        }
                    />

                    <div className="flex space-x-2">
                        <select
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            value={propertyForm.type}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({ ...prev, type: e.target.value }))
                            }
                        >
                            <optgroup label="سكني">
                                <option value="apartment">شقة</option>
                                <option value="villa">فيلا</option>
                                <option value="townhouse">تاون هاوس</option>
                            </optgroup>
                            <optgroup label="تجاري">
                                <option value="office">مكتب</option>
                                <option value="shop">محل</option>
                                <option value="warehouse">مستودع</option>
                            </optgroup>
                        </select>

                        <select
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            value={propertyForm.offer}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({ ...prev, offer: e.target.value }))
                            }
                        >
                            <option value="sale">للبيع</option>
                            <option value="rent">للإيجار</option>
                        </select>
                    </div>

                    <div className="flex space-x-2">
                        <input
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            type="number"
                            placeholder="المساحة"
                            value={propertyForm.area}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({ ...prev, area: e.target.value }))
                            }
                        />
                        <input
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            type="number"
                            placeholder="عدد الطوابق"
                            value={propertyForm.stairsNumer}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({
                                    ...prev,
                                    stairsNumer: e.target.value,
                                }))
                            }
                        />
                        <input
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            type="number"
                            placeholder="درج"
                            value={propertyForm.stairs}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({ ...prev, stairs: e.target.value }))
                            }
                        />
                    </div>

                    <div className="flex space-x-2">
                        <input
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            type="number"
                            placeholder="غرف النوم"
                            value={propertyForm.bedroom}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({
                                    ...prev,
                                    bedroom: e.target.value,
                                }))
                            }
                        />
                        <input
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            type="number"
                            placeholder="الحمامات"
                            value={propertyForm.bathroom}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({
                                    ...prev,
                                    bathroom: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <textarea
                        className="w-[100%] min-h-[20vh] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                        placeholder="وصف العقار"
                        value={propertyForm.description}
                        onChange={(e) =>
                            setPropertyForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    ></textarea>

                    <div className="flex space-x-2">
                        <input
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            type="number"
                            placeholder="السعر"
                            value={propertyForm.price}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({ ...prev, price: e.target.value }))
                            }
                        />
                        <input
                            type="text"
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            placeholder="المدينة"
                            value={propertyForm.city}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({ ...prev, city: e.target.value }))
                            }
                        />
                        <input
                            type="text"
                            className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            placeholder="الحي"
                            value={propertyForm.neighborhood}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({
                                    ...prev,
                                    neighborhood: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div className="preview flex flex-wrap">
                            {previews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`preview-${index}`}
                                    className="w-20 h-20 object-cover border border-gray-300 rounded-md mr-2 mb-2"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <input
                                                    className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            type="text"
                            placeholder="اسم المالك"
                            value={propertyForm.ownerName}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({
                                    ...prev,
                                    ownerName: e.target.value,
                                }))
                            }
                        />
                        <input
                                                    className="h-[40px] text-right pr-[10px] border-[1px] border-[#8c354e] rounded-[5px] "

                            type="number"
                            placeholder="رقم المالك"
                            value={propertyForm.ownerNumber}
                            onChange={(e) =>
                                setPropertyForm((prev) => ({
                                    ...prev,
                                    ownerNumber: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-[#8c354e] text-white rounded-md"
                    >
                        {loading ? "جاري الإرسال..." : "نشر"}
                    </button>

                    {message && <p className="text-center text-green-500">{message}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddProperty;

