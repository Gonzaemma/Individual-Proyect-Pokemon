import React from "react";
import HomeCSS from '../Styles/Home.module.css'

export default function PaginatorBar({cantPages, paginator}){

    var pageNumbers = [];
    for(let i=1; i<=cantPages; i++){
        pageNumbers.push(i);
    }
    return(
        <div>
            {
                pageNumbers.map(n=>(
                    <button key={n} onClick={()=>paginator(n)}
                    className={HomeCSS.paginationButton}> {n} </button>
                ))
            }
        </div>
    )
}