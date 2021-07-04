import React, { useState } from 'react'

export default function SearchField({list,setSearch,search}) {
    const handleChange=(e)=>{
        const filteredByKeyWord = list.filter(
            (data) =>
              JSON.stringify(data)
                .toLowerCase()
                .indexOf(e.target.value.toLowerCase()) !== -1
          );
          setSearch(filteredByKeyWord)
        }
    return (
        <div>
            <input placeholder="search by keyword" onChange={handleChange}></input>
        </div>
    )
}
