import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ExplorerPropertyCard from "../components/ExplorerPropertyCard";
import { fetchPropertiesQuery } from "../services/api";

function Explorer() {
    const [offer, setOffer] = useState(""); // للبيع أو للإيجار
    const [city, setCity] = useState(""); // اسم المدينة
    const [category, setCategory] = useState(""); // سكني أو تجاري
    const [type, setType] = useState(""); // الخيارات الفرعية
    const [categoryPop, setCategoryPop] = useState(false);

    const [properties, setProperties] = useState([]);


    useEffect(() => {
        const loadProperties = async () => {
            const filters = {
                offer,
                city,
                type
            };
    
            try {
                const response = await fetchPropertiesQuery(filters);
                console.log("Properties loaded:", response);
                setProperties(response || []); // إذا كانت الاستجابة فارغة، اجعلها مصفوفة فارغة
            } catch (error) {
                console.error("Error loading properties:", error);
            }
        };
    
        loadProperties();
    }, [offer, city, type]);
    

    function resetFilter(){
        setCategory("")
        setCity("")
        setType("")
        setOffer("")
    }


    function returnSubCatagoryArb(subCate) {
        switch (subCate) {
            case "مكتب":
                return "مكتب";
            case "محل":
                return "محل";
            case "شقة":
                return "شقة";
            case "استديو":
                return "استديو";
            case "فيلا":
                return "فيلا";
            default:
                return "";
        }
    }

    return (
        <div>
            <NavBar></NavBar>

            {/* واجهة البحث */}
            <div className="w-[100%] h-[30vh] flex flex-row-reverse justify-evenly items-center px-[10vw] pt-[16vh] ">
                {/* خيارات البحث */}
                <div className="flex items-center gap-x-[1rem]">
                    <select
                        value={offer}
                        onChange={(e) => setOffer(e.target.value)}
                        className="w-[80px] h-[40px] rounded-[5px] text-right px-[5px] border-[#8c354e] border-[1px]"
                    >
                        <option value="sale">للبيع</option>
                        <option value="rent">للإيجار</option>
                    </select>
                    <p>العرض</p>
                </div>

                <div className="flex items-center gap-x-[1rem]">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="أدخل الموقع"
                        className="w-[250px] h-[40px] rounded-[5px] text-right px-[5px] border-[#8c354e] border-[1px]"
                    ></input>
                    <p>: المنطقة</p>
                </div>

                {/* تصنيف العقار */}
                <div className="flex items-center gap-x-[1rem]">
                    <div className="w-[250px] h-[40px] rounded-[5px] text-right relative border-[#8c354e] border-[1px]">
                        <div
                            className="w-[100%] h-[100%] flex items-center justify-end px-[10px] text-gray-700"
                            onClick={() => setCategoryPop((prev) => !prev)}
                        >
                            {category}
                            {type ? " - " + returnSubCatagoryArb(type) : null}
                        </div>
                        {categoryPop ? (
                            <div className="w-[250px] absolute top-[45px] p-[15px] flex flex-col items-center bg-white rounded-[5px] shadow-lg">
                                <div className="w-[100%] flex justify-center ">
                                    <button
                                        className={`w-[50%] ${category === "سكني" ? "text-[#8c354e] border-b-[#8c354e]" : "text-black"} py-[10px] px-[25px] border-b-[2px]`}
                                        onClick={() => setCategory("سكني")}
                                    >
                                        سكني
                                    </button>
                                    <button
                                        className={`w-[50%] ${category === "تجاري" ? "text-[#8c354e] border-b-[#8c354e]" : "text-black"} py-[10px] px-[25px] border-b-[2px]`}
                                        onClick={() => setCategory("تجاري")}
                                    >
                                        تجاري
                                    </button>
                                </div>

                                <div className="w-[100%] h-[100%] py-[10px]">
                                    {category === "سكني" && (
                                        <div className="w-[100%] h-[100%] flex flex-wrap justify-between items-end gap-y-[0.5rem]">
                                            <button
                                                className="w-[45%] border-[1px] rounded-[50px] hover:bg-[#8c354e87]"
                                                onClick={() => {
                                                    setType("شقة");
                                                    setCategoryPop(false);
                                                }}
                                            >
                                                شقة
                                            </button>
                                            <button
                                                className="w-[45%] border-[1px] rounded-[50px] hover:bg-[#8c354e87]"
                                                onClick={() => {
                                                    setType("فيلا");
                                                    setCategoryPop(false);
                                                }}
                                            >
                                                فيلا
                                            </button>
                                            <button
                                                className="w-[45%] border-[1px] rounded-[50px] hover:bg-[#8c354e87]"
                                                onClick={() => {
                                                    setType("استديو");
                                                    setCategoryPop(false);
                                                }}
                                            >
                                                استوديو
                                            </button>
                                        </div>
                                    )}

                                    {category === "تجاري" && (
                                        <div className="w-[100%] h-[100%] flex flex-wrap justify-between items-end gap-y-[0.5rem]">
                                            <button
                                                className="w-[45%] border-[1px] rounded-[50px] hover:bg-[#8c354e87]"
                                                onClick={() => {
                                                    setType("مكتب");
                                                    setCategoryPop(false);
                                                }}
                                            >
                                                مكتب
                                            </button>
                                            <button
                                                className="w-[45%] border-[1px] rounded-[50px] hover:bg-[#8c354e87]"
                                                onClick={() => {
                                                    setType("محل");
                                                    setCategoryPop(false);
                                                }}
                                            >
                                                محل
                                            </button>
                                            <button
                                                className="w-[45%] border-[1px] rounded-[50px] hover:bg-[#8c354e87]"
                                                onClick={() => {
                                                    setType("");
                                                    setCategoryPop(false);
                                                }}
                                            >
                                                معرض
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <p>النوع</p>
                </div>

                {/* زر البحث */}
                <button
                    onClick={()=>{resetFilter()}}
                    className="w-[100px] h-[40px] rounded-[5px] border-[#8c354e] border-[1px] text-[#8c354e] font-bold text-[1.2rem] hover:bg-[#8c354e] hover:text-white"
                >
                    مسح
                </button>
            </div>

            {/* عرض العقارات */}
            <div className="w-[100%] h-[100vh] flex flex-col items-center gap-y-[1.5rem] py-[5vh] ">
                {properties.map((property) => (
                    <ExplorerPropertyCard
                        key={property.id}
                        subtitle={"شقق للبيع جدة"}
                        title={property.title}
                        location={property.city + " , حي " + property.neighborhood}
                        description={property.description}
                        price={property.price}
                        image={property.images}
                        id={property.id}
                    />
                ))}
            </div>

            <Footer></Footer>
        </div>
    );
}

export default Explorer;

