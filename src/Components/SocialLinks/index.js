import React from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { toast } from "react-toastify";
import classes from "./index.module.scss";



const SocialLinks = (props) => {
    const data = [
        {
            title: "twitter",
            url: "https://twitter.com/"
        },
        {
            title: "facebook-f",
            url: "https://www.facebook.com/"
        },
        {
            title: "youtube",
            url: "https://www.youtube.com/"
        },
        {
            title: "linkedin",
            url: "https://www.linkedin.com/"
        },
        {
            title: "instagram",
            url: "https://www.instagram.com/accounts/login/"
        },
    ]

    const copyToClip = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Url copied to clipboard", {
            position: "top-right",
            autoClose: 2000,
        });
    }

    return (
        <>
            <ul className={`${classes.socialLinks} ${props.blogs ? `${classes.yellow}` : null}`}>

                {props.blogs ? <li className={"mx-3 font-16 fw-bold"}>Share on </li> : null}
                {!props.footer ? <>
                    <li>
                        <TwitterShareButton
                            url={"https://www.example.com"}     //eg. https://www.example.com
                            quotes={"quotes"}  //"Your Quotes"
                            hashtag={"hashtag"} // #hashTag
                        >
                            <TwitterIcon
                                bgStyle={{ background: "#FFDB43", fill: "#FFDB43" }}
                                iconFillColor={"#000"}
                                size={30}
                                round={true}
                            />
                        </TwitterShareButton>
                    </li>
                    <li>
                        <FacebookShareButton
                            url={"https://www.example.com"}     //eg. https://www.example.com
                            quotes={"quotes"}  //"Your Quotes"
                            hashtag={"hashtag"} // #hashTag
                        >
                            <FacebookIcon
                                bgStyle={{ background: "#FFDB43", fill: "#FFDB43" }}
                                iconFillColor={"#000"}
                                size={30}
                                round={true}
                            />
                        </FacebookShareButton>
                    </li>
                    <li>
                        <LinkedinShareButton
                            url={"https://www.example.com"}     //eg. https://www.example.com
                            quotes={"quotes"}  //"Your Quotes"
                            hashtag={"hashtag"} // #hashTag
                        >
                            <LinkedinIcon
                                bgStyle={{ background: "#FFDB43", fill: "#FFDB43" }}
                                iconFillColor={"#000"}
                                size={30}
                                round={true}
                            />
                        </LinkedinShareButton>
                    </li>
                </> : <></>}
                {props.footer ? <>
                    {data.map((data, index) => (
                        <li key={index}>
                            <a onClick={()=>{window.open(data.url,'_blank')}}> <i className={`fab fa-${data.title}`}></i> </a>
                        </li>
                    ))}
                </> : <></>}
            </ul>
        </>
    )
}

export default SocialLinks;