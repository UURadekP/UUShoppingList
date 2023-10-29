import React from "react";
import {} from "react-bootstrap";
import { useState, useContext } from "react";
import listContext from "../listContext";

const SearchBar = ({item, index, onDelete}) => {

    const [search, setSearch] = useState("");
    const [searchParams] = useState(["name"]);
    const {list, setList, isOwner, setIsOwner, isMember ,setIsMember} = useContext(listContext);




return (
    <div className="wrapper">
        <div className="search-wrapper">
            <label htmlFor="search-form">
                <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </label>
        </div>

    </div>
);

} 

export default SearchBar;