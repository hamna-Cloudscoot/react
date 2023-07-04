import React, {useState} from "react";
import classes from "../../Pages/Auth/index.module.scss";
import Cards from "react-credit-cards";
import {Form} from "react-bootstrap";


const CredeitCards=()=>{
    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [month, SetMonth] = useState("");
    let [expiry, SetExpiry] = useState("");
    const [cvc, SetCvc] = useState("");
    const [focus, SetFocus] = useState("");
    const handleDate = (e) => {
        SetMonth(e.target.value);
        SetExpiry(e.target.value);
    };
    const handleExpiry = (e) => {
        SetExpiry(month.concat(e.target.value));
    };


    return(
        <>
            <div className={`${classes.cardImg} mb-3`}>
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focus}
                />
            </div>
            <Form.Group className={"form-group"}>
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                    type="tel"
                    className="form-control"
                    value={number}
                    name="number"
                    maxlength="16"
                    pattern="[0-9]+"
                    onChange={(e) => {
                        SetNumber(e.target.value);
                    }}
                    onFocus={(e) => SetFocus(e.target.name)}

                />
            </Form.Group>
            <Form.Group className={"form-group"}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    className="form-control"
                    value={name}
                    name="name"
                    onChange={(e) => {
                        SetName(e.target.value);
                    }}
                    onFocus={(e) => SetFocus(e.target.name)}

                />
            </Form.Group>
            <Form.Group className={"form-group"}>
                <Form.Label>Expiry Date</Form.Label>
                <select
                    className="form-selectm "
                    name="expiry"
                    onChange={handleDate}

                >
                    <option value=" ">Month</option>
                    <option value="01">Jan</option>
                    <option value="02">Feb</option>
                    <option value="03">Mar</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">Aug</option>
                    <option value="09">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                </select>
            </Form.Group>
            <Form.Group className={"form-group"}>
                <Form.Label>Expiry Date</Form.Label>
                <select
                    className="form-select"
                    name="expiry"
                    onChange={handleExpiry}

                >
                    <option value=" ">Year</option>
                    <option value="21">2021</option>
                    <option value="22">2022</option>
                    <option value="23">2023</option>
                    <option value="24">2024</option>
                    <option value="25">2025</option>
                    <option value="26">2026</option>
                    <option value="27">2027</option>
                    <option value="28">2028</option>
                    <option value="29">2029</option>
                    <option value="30">2030</option>
                </select>
            </Form.Group>
            <Form.Group className={"form-group"}>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                    type="tel"
                    name="cvc"
                    maxLength="3"
                    className=" form-control card"
                    value={cvc}
                    pattern="\d*"
                    onChange={(e) => {
                        SetCvc(e.target.value);
                    }}
                    onFocus={(e) => SetFocus(e.target.name)}

                />
            </Form.Group>
        </>
    )
}

export default CredeitCards;