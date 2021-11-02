import Button from "@restart/ui/esm/Button";
import { Link, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { response } from "express";

function SearchPublication() {
    
    useEffect(() => {
        const Search= async () => {
            var rawResponse = await fetch(`/searchPublication`);
            const response = await rawResponse.json();
            console.log(response)}
            Search();
        }, []);
return (
    <div>
        <Button> <Link to="/"> Accueil </Link> </Button>

    </div>
)}

export default SearchPublication;
