import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function ReviewContractRequist() {
    let { id, type } = useParams()

    const [data, setData] = useState([])
    useEffect(() => {
        fetchContract(id, type)

    }, [])


    const fetchContract = async (id, type) => {
        try {
            let response = null;
            if (type === 'residential') {
                response = await fetch(`http://localhost/aqarSiteBackend/backend/api/getContractResdintelById.php?id=${id}`);

            } else if (type === 'commercial') {
                response = await fetch(`http://localhost/aqarSiteBackend/backend/api/getContractCommericalById.php?id=${id}`);

            }
            if (response.ok) {
                const contract = await response.json();
                setData(contract)
                console.log("بيانات العقد:", contract);
            } else {
                console.error("خطأ أثناء جلب البيانات:", response.statusText);
            }
        } catch (error) {
            console.error("حدث خطأ:", error);
        }
    };
    return (
        <div>
            <NavBar></NavBar>
            <div className="w-[100%] h-[100%] flex justify-center items-center pt-[20vh]">
                <div className="w-[80%] mi-h-[50vh] h-[100%] flex flex-col gap-y-[1.5rem] items-end p-[20px]">
                    <p className="text-[1.5rem] font-semibold w-[100%] text-center mb-[2vh]">{type === 'residential' ? 'طلب عقد سكني' : 'طلب عقد تجاري'}</p>
                    {/* بيانات العقد */}
                    <div className="w-[100%] flex flex-col items-end ">
                        <p className="text-[1.5rem] font-semibold text-right pr-[15px] w-[100%] h-[40px] bg-gray-300">معلومات العقد</p>
                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{':   رقم الصك'}</p>
                            <p>{data.TitleDeedNumber}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{':    تاريخ الصك'}</p>
                            <p>{data.TitleDeedDate}</p>
                        </div>
                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': مدة العقد'}</p>
                            <p>{data.ContractDuration}</p>
                            <p className="font-semibold">{'شهر '}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': تاريخ بداية العقد'}</p>
                            <p>{data.ContractStartDate}</p>
                        </div>

                    </div>


                    {/* بيانات العقار*/}

                    <div className="w-[100%] flex flex-col items-end">
                        <p className="text-[1.5rem] font-semibold text-right pr-[15px] w-[100%] h-[40px] bg-gray-300">معلومات العقار</p>
                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{':  نوع العقار'}</p>
                            <p>{data.PropertyType}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{':  وصف العقار'}</p>
                            <p>{data.PropertyDescription}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{':   المساحة'}</p>
                            <p>{data.Area}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{':   الغرف'}</p>
                            <p>{data.Rooms}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{':   الدور'}</p>
                            <p>{data.FloorNumber}</p>
                        </div>

                    </div>


                    {/* بيانات المؤجر*/}

                    <div className="w-[100%] flex flex-col items-end">
                        <p className="text-[1.5rem] font-semibold text-right pr-[15px] w-[100%] h-[40px] bg-gray-300">معلومات المؤجر</p>
                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': اسم المؤجر'}</p>
                            <p>{data.LessorName}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': رقم هوية المؤجر'}</p>
                            <p>{data.LessorIDNumber}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': تاريخ ميلاد الؤجر'}</p>
                            <p>{data.LessorBirthDate}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': رقم جوال المؤجر ابشر'}</p>
                            <p>{data.LessorPhoneNumber}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{':   رقم حساب المؤجر'}</p>
                            <p>{data.LessorIBAN}</p>
                        </div>

                    </div>

                    {/* بيانات المستأجر*/}

                    <div className="w-[100%] flex flex-col items-end">
                        <p className="text-[1.5rem] font-semibold text-right pr-[15px] w-[100%] h-[40px] bg-gray-300">معلومات المؤجر</p>
                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': اسم المستأجر'}</p>
                            <p>{data.LesseeName}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': رقم هوية المستأجر'}</p>
                            <p>{data.LesseeIDNumber}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': تاريخ ميلاد المستأجر'}</p>
                            <p>{data.LesseeBirthDate}</p>
                        </div>

                        <div className="w-[100%] flex flex-row-reverse justify-start gap-x-[0.8rem]">
                            <p className="font-semibold">{': رقم جوال المستأجر ابشر'}</p>
                            <p>{data.LesseePhoneNumber}</p>
                        </div>

                    </div>
                </div>


            </div>

            <Footer></Footer>

        </div>
    )
}

export default ReviewContractRequist
