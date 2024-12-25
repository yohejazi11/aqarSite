import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
function AdsItems(props) {
    return (
        <div className='w-[100%] h-[30vh] flex flex-col border-b-[1px] border-black'>

            <div>{props.title}</div>
            <div>{props.city}</div>
            <div>{props.offer}</div>
            <div>{props.description}</div>

            <Link to={`/reviewads/${props.id}`}>التفاصيل</Link>
        </div>
    )
}

export default AdsItems
