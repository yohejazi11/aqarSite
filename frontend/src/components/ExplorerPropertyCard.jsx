import { Link } from "react-router-dom"

function ExplorerPropertyCard(props) {
    return (
        <div className='w-[60%] h-[35vh] flex rounded-[5px] border-[1px] border-[#8c354e] shadow-md bg-gray-100 hover:bg-gray-200 transition-all duration-200'>
            {/* info container */}
            <div className="w-[70%] h-[100%] flex flex-col items-end gap-y-[1rem] p-[15px]">
                <p className="text-[12px] text-gray-400 font-bold">{props.subtitle}</p>
                <p className="text-[22px] font-bold">{props.title}</p>
                <p className="text-[13px] text-gray-500 font-bold">{props.location}</p>
                <p className="text-[13px] text-gray-500 font-bold">{props.description}</p>
                <div className="w-[100%] flex justify-between items-center">
                    <button className="w-[150px] h-[40px] rounded-[10px] border-[1px] border-[#8c354e] text-[#8c354e] text-[1.2rem] hover:bg-[#8c354e] hover:text-white font-bold"><Link to={`/propertydetails/${props.id}`}>شاهد التفاصيل</Link></button>
                    <p className="text-[1.5rem]  text-gray-900 font-bold">{props.price}</p>
                </div>
            </div>

            {/* image container */}
            <div className="w-[30%] h-[100%]">
                <img className="w-[100%] h-[100%] rounded-r-[5px]" src={props.image}></img>
            </div>

        </div>
    )
}

export default ExplorerPropertyCard
