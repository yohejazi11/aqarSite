import { Link } from "react-router-dom"

function PropertyCard(props) {
    return (
        <div className="flex flex-col w-[20vw] h-[70vh] rounded-[15px] border-[1px] ,border-black shadow-2xl">
            {/* image div */}
            <div className="w-[100%] h-[45%] rounded-t-[15px]">
                <img className="w-[100%] h-[100%] rounded-t-[15px]" src={props.image}></img>
            </div>
            {/* info div */}
            <div className="w-[100%] h-[45%] flex flex-col items-end p-[15px] text-right gap-y-[0.5rem]">
                <p className="text-[16px] text-gray-400 font-bold">{props.subtitle}</p>
                <p className="text-[22px] font-bold">{props.title}</p>
                <p className="text-[14px] text-gray-500 font-bold">{props.location}</p>
                <p className="text-[14px] text-gray-500 font-bold">{props.price}</p>
                <p className="text-[16px] text-gray-800 font-bold">{props.description}</p>
            </div>

            {/* more details button div */}
            <div className="flex justify-end w-[100%] h-[10%]">
                <button className="w-[50%] h-[50px] rounded-tl-[15px] rounded-br-[15px] text-center bg-[#8c354e] text-white"><Link to={`/propertydetails/${props.id}`}>شاهد التفاصيل</Link></button>
            </div>
        </div>
    )
}

export default PropertyCard
