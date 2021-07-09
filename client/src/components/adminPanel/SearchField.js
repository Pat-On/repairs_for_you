import React, { useState } from 'react'
import classes from './AdminPage.module.css'
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
        <div className={classes.searchField}>
            <input placeholder="search by keyword" onChange={handleChange}></input>
      <span>{search.length}  result(s) found.</span>

        </div>
    )
}
