import React from "react";

export default function PaginatorBar({cantPages, paginator}){

    var pageNumbers = [];
    for(let i=1; i<=cantPages; i++){
        pageNumbers.push(i);
    }
    return(
        <div>
            {
                pageNumbers.map(n=>(
                    <button key={n} onClick={()=>paginator(n)}> {n} </button>
                ))
            }
        </div>
    )
}