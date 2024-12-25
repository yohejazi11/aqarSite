import React from 'react'
import { useNavigate } from 'react-router-dom'
function ContractItems(props) {

    const navigate = useNavigate();
    return (
        <div className='w-[100%] h-[30vh] flex flex-col border-b-[1px] border-black'>
        
        <div>{props.contractType}</div>
        <div>{props.title}</div>

        <div>{props.PropertyType}</div>

        <div>{props.LessorName}</div>

        <button 
        onClick={()=>{navigate(`/reviewcontractrequist/${props.id}/${props.contractType}`)}}
        >تفاصيل</button>
    </div>
    )
}

export default ContractItems
