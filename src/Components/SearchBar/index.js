import React from "react";
import classes from "./index.module.scss";
import { Form } from "react-bootstrap";

const SearchBar = (props) => {

    const handleSearch = async (event) => {
        event.preventDefault();
        if (props.searchFor === 'blogs') {
            props.setSearchedValue(event.target.value);

            if (!event.target.value.trim()) {
                props.getDataMethod()
            }
            const searchedResult = await props.getSearchedMethod(event.target.value.toLowerCase())
            props.setState(searchedResult)
        }

        if (props.searchFor === 'professionals') {
            props.setSearchedValue(event.target.value);

            if (!event.target.value.trim()) {
                props.getDataMethod()
            }
            const searchedResult = await props.getSearchedMethod(event.target.value.toLowerCase())
            // props.setState(searchedResult)
        }       

    };

    return (
        <>
            <Form className={`${classes.searchBar} ${props.custClass}`}>
                <Form.Control type={"search"} value={props.searchedValue} placeholder={props.placeholder} onChange={(e) => { props.setSearchedValue(e.target.value); handleSearch(e) }} />
            </Form>
        </>
    )
}

export default SearchBar;