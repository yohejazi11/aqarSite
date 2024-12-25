import { Link, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import PropertyCard from "../components/PropertyCard"
import { FaArrowLeftLong } from "react-icons/fa6";
import villa from '/icons/villa.png';
import villa2 from '/icons/villa2.png';
import skyscrapers from '/icons/skyscrapers.png';
import skyscrapers2 from '/icons/skyscrapers2.png';
import plot from '/icons/plot.png';
import plot2 from '/icons/plot2.png';
import office from '/icons/office.png';
import office2 from '/icons/office2.png';
import { useState, useEffect } from "react";
import { LiaFileContractSolid } from "react-icons/lia";
import { fetchProperties } from '../services/api';

function Home() {
    const [isVillaHover, setVillaHover] = useState(false)
    const [isSkyscrapersHover, setSkyscrapersHover] = useState(false)
    const [isPlotHover, setPlotHover] = useState(false)
    const [isOfficeHover, setOfficeHover] = useState(false)


    const [properties, setProperties] = useState([]);


    useEffect(() => {
        const loadProperties = async () => {
            try {
                const response = await fetchProperties();
                if (response && response.data) {
                    setProperties(response.data);
                } else {
                    console.error('Unexpected data format:', response);
                }
            } catch (error) {
                console.error('Failed to load properties:', error);
            }
        };
    
        loadProperties();
    }, []);
    



    const navigate = useNavigate()
    const handleMouseEnter = (button) => {
        switch (button) {
            case 'villa':
                setVillaHover(true)
                break;
            case 'Skyscrapers':
                setSkyscrapersHover(true);
                break;
            case 'plot':
                setPlotHover(true);
                break;
            case 'office':
                setOfficeHover(true);
                break;
            default:
                break;

        }
    };

    const handleMouseLeave = (button) => {
        switch (button) {
            case 'villa':
                setVillaHover(false)
                break;
            case 'Skyscrapers':
                setSkyscrapersHover(false);
                break;
            case 'plot':
                setPlotHover(false);
                break;
            case 'office':
                setOfficeHover(false);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <NavBar></NavBar>

            <div className="w-[100%] flex flex-col items-center justify-center ">
                <div className="relative w-[100%] h-[80vh] bg-gray-200">
                    {/*<img className="w-[100%] h-[100%]" src="https://i.pinimg.com/736x/b3/4f/16/b34f160c50cd995daa6878993a38f0f5.jpg"></img>*/}
                    <div className="absolute top-0 w-[100%] h-[100%] z-10 main-header bg-[#8c354e]"></div>
                    <div className="absolute z-20 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[80%] flex">
                        <div className="w-[50%] flex flex-col items-center justify-center gap-y-[2rem]">
                            {/*<img className="w-[30%]" src={contract}></img>*/}
                            <LiaFileContractSolid className="text-[10rem] text-white"></LiaFileContractSolid>
                            <div className="flex flex-col gap-y-[1rem]">
                            <button onClick={() => { navigate('/requestresidentialcontract') }} className="h-[40px] w-[200px] text-[#8c354e] font-bold bg-white rounded-[10px] hover:text-white hover:bg-[#8c354e] hover:border-white hover:border-[1px]">طلب عقد سكني</button>
                            <button onClick={() => { navigate('/requestcommercialcontract') }} className="h-[40px] w-[200px] text-[#8c354e] font-bold bg-white rounded-[10px] hover:text-white hover:bg-[#8c354e] hover:border-white hover:border-[1px]">طلب عقد تجاري</button>

                            </div>

                        </div>
                        <div className="w-[50%] flex flex-col gap-y-[1rem] items-end">
                            <p className="text-right text-white font-bold text-[2rem]">عقد ايجار الكتروني موثّق</p>
                            <p className="text-right text-white font-bold text-[1.4rem]">
                                عقدك الموثق من شبكة ايجار خلال 30 دقيقة
                                مهما كان غرضك من العقد ، نحن خيارك الأكثر سرعة ومن أي مكان في المملكة ، سواء كنت تحتاجه لحساب المواطن أو الضمان الاجتماعي أو حافز أو لأي أغراض اخرى.
                            </p>


                        </div>

                    </div>
                    <div className="absolute z-20 w-[80%] bottom-0 left-[50%] translate-y-[50%] translate-x-[-50%] flex justify-center items-center gap-x-[2rem]">
                        <div onMouseEnter={() => { handleMouseEnter('office') }} onMouseLeave={() => { handleMouseLeave('office') }} className="flex flex-col justify-center items-center gap-y-[1rem] w-[180px] h-[180px] rounded-[15px] shadow-xl bg-white hover:bg-[#8c354e] hover:translate-y-[-30px] transition-all duration-300">
                            <img className="w-[50%]" src={isOfficeHover ? office2 : office}></img>
                            <p className={`${isOfficeHover ? 'text-white ' : 'text-[#8c354e]'}`}>تجاري</p>

                        </div>

                        <div onMouseEnter={() => { handleMouseEnter('plot') }} onMouseLeave={() => { handleMouseLeave('plot') }} className="flex flex-col justify-center items-center gap-y-[1rem] w-[180px] h-[180px] rounded-[15px] shadow-xl bg-white hover:bg-[#8c354e] hover:translate-y-[-30px] transition-all duration-300">
                            <img className="w-[50%]" src={isPlotHover ? plot2 : plot}></img>
                            <p className={`${isPlotHover ? 'text-white ' : 'text-[#8c354e]'}`}>اراضي</p>

                        </div>
                        <div onMouseEnter={() => { handleMouseEnter('Skyscrapers') }} onMouseLeave={() => { handleMouseLeave('Skyscrapers') }} className="flex flex-col justify-center items-center gap-y-[1rem] w-[180px] h-[180px] rounded-[15px] shadow-xl bg-white hover:bg-[#8c354e] hover:translate-y-[-30px] transition-all duration-300">
                            <img className="w-[50%]" src={isSkyscrapersHover ? skyscrapers2 : skyscrapers}></img>
                            <p className={`${isSkyscrapersHover ? 'text-white ' : 'text-[#8c354e]'}`}>شقق</p>
                        </div>
                        <div onMouseEnter={() => { handleMouseEnter('villa') }} onMouseLeave={() => { handleMouseLeave('villa') }} className="flex flex-col justify-center items-center gap-y-[1rem] w-[180px] h-[180px] rounded-[15px] shadow-xl bg-white hover:bg-[#8c354e] hover:translate-y-[-30px] transition-all duration-300">
                            <img className="w-[50%]" src={isVillaHover ? villa2 : villa}></img>
                            <p className={`${isVillaHover ? 'text-white ' : 'text-[#8c354e]'}`}>فلل</p>
                        </div>
                    </div>

                </div>


                {/* special  offer*/}
                <div className="flex flex-col gap-y-[1rem] w-[90%]  p-[40px] mt-[20vh]">
                    <div className="w-[100%] h-[40px] flex justify-between items-center px-[20px]">
                        <Link className="text-[#8c354e] flex gap-x-[0.7rem] items-center h-[30px]" to={'/explorer'}><FaArrowLeftLong className="h-[50%] text-[1.2rem] self-end"></FaArrowLeftLong><p className="text-[1rem]">تصفح المزيد</p> </Link>
                        <p className="text-[1.5rem] font-bold">شاهد أحدث العروض العقارية</p>
                    </div>
                    <div className="flex justify-center gap-x-[1rem] w-[100%]">


                        <div className="flex justify-center gap-x-[1rem] w-[calc(40vw+1rem)]">
                            {console.log(properties)}
                            {properties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    id={property.id}
                                    image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                    subtitle={property.city + ' , حي ' + property.neighborhood}
                                    title={property.title}
                                    location={property.location}
                                    price={property.price+' : ريال'}
                                    description={property.description}
                                ></PropertyCard>

                            ))}

                            {/*<PropertyCard
                                id={'1'}
                                image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                subtitle={'شقق للبيع جدة'}
                                title={'شقة بحي النرجس'}
                                location={'جدة حي النرجس'}
                                price={'2000 شهري'}
                                description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                            ></PropertyCard>*/}

                        </div>

                        
                    </div>
                    <div className="flex justify-center gap-x-[1rem] w-[100%]">
                        <PropertyCard
                            id={'1'}
                            image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            subtitle={'شقق للبيع جدة'}
                            title={'شقة بحي النرجس'}
                            location={'جدة حي النرجس'}
                            price={'2000 شهري'}
                            description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                        ></PropertyCard>
                        <PropertyCard
                            id={'1'}
                            image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            subtitle={'شقق للبيع جدة'}
                            title={'شقة بحي النرجس'}
                            location={'جدة حي النرجس'}
                            price={'2000 شهري'}
                            description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                        ></PropertyCard>
                        <PropertyCard
                            id={'1'}
                            image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            subtitle={'شقق للبيع جدة'}
                            title={'شقة بحي النرجس'}
                            location={'جدة حي النرجس'}
                            price={'2000 شهري'}
                            description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                        ></PropertyCard>
                        <PropertyCard
                            id={'1'}
                            image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            subtitle={'شقق للبيع جدة'}
                            title={'شقة بحي النرجس'}
                            location={'جدة حي النرجس'}
                            price={'2000 شهري'}
                            description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                        ></PropertyCard>


                    </div>

                </div>

                {/* special  offer*/}
                <div className="flex flex-col gap-y-[1rem] w-[90%]  p-[40px] mt-[20vh]">
                    <div className="w-[100%] h-[40px] flex justify-between items-center px-[20px] ">
                        <Link className="text-[#8c354e] flex gap-x-[0.7rem] items-center h-[30px]" to={'/explorer'}><FaArrowLeftLong className="h-[50%] text-[1.2rem] self-end"></FaArrowLeftLong><p className="text-[1rem]">تصفح المزيد</p> </Link>
                        <p className="text-[1.5rem] font-bold">عقارات مميزة في الرياض</p>
                    </div>
                    <div className="flex justify-center gap-x-[1rem] w-[100%]">


                        <div className="flex justify-center gap-x-[1rem] w-[100%]">
                            <PropertyCard
                                id={'1'}
                                image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                subtitle={'شقق للبيع جدة'}
                                title={'شقة بحي النرجس'}
                                location={'جدة حي النرجس'}
                                price={'2000 شهري'}
                                description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                            ></PropertyCard>
                            <PropertyCard
                                id={'1'}
                                image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                subtitle={'شقق للبيع جدة'}
                                title={'شقة بحي النرجس'}
                                location={'جدة حي النرجس'}
                                price={'2000 شهري'}
                                description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                            ></PropertyCard>
                            <PropertyCard
                                id={'1'}
                                image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                subtitle={'شقق للبيع جدة'}
                                title={'شقة بحي النرجس'}
                                location={'جدة حي النرجس'}
                                price={'2000 شهري'}
                                description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                            ></PropertyCard>
                            <PropertyCard
                                id={'1'}
                                image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                subtitle={'شقق للبيع جدة'}
                                title={'شقة بحي النرجس'}
                                location={'جدة حي النرجس'}
                                price={'2000 شهري'}
                                description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                            ></PropertyCard>

                        </div>

                    </div>
                    <div className="flex justify-center gap-x-[1rem] w-[100%]">
                        <PropertyCard
                            id={'1'}
                            image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            subtitle={'شقق للبيع جدة'}
                            title={'شقة بحي النرجس'}
                            location={'جدة حي النرجس'}
                            price={'2000 شهري'}
                            description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                        ></PropertyCard>
                        <PropertyCard
                            id={'1'}
                            image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            subtitle={'شقق للبيع جدة'}
                            title={'شقة بحي النرجس'}
                            location={'جدة حي النرجس'}
                            price={'2000 شهري'}
                            description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                        ></PropertyCard>
                        <PropertyCard
                            id={'1'}
                            image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            subtitle={'شقق للبيع جدة'}
                            title={'شقة بحي النرجس'}
                            location={'جدة حي النرجس'}
                            price={'2000 شهري'}
                            description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                        ></PropertyCard>
                        <PropertyCard
                            id={'1'}
                            image={'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            subtitle={'شقق للبيع جدة'}
                            title={'شقة بحي النرجس'}
                            location={'جدة حي النرجس'}
                            price={'2000 شهري'}
                            description={'غرفه وصاله,  غرفتين وصاله,  3 غرف وصاله,  بنتهاوس 3 غرف,  بنتهاوس 4 غرف'}
                        ></PropertyCard>


                    </div>

                </div>
            </div>


        </div>
    )
}

export default Home
