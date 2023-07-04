import React from "react";
import PostCol from "../PostCol";
import postimg1 from "../../Images/img11.jpg";
import postimg2 from "../../Images/img12.jpg";
import postimg3 from "../../Images/img13.jpg";


const PostSection=(props)=>{
    const data = [
        {
            title: "Opportunities",
            description: "As industry veterans and leaders, advisors can open doors for your startup to take full advantage of.",
            imageUrl: postimg1,
            buttonOneUrl: "/All-profession",
            buttonTwoUrl: "/signup",
        },
        {
            title: "Networking ",
            description: "Find the relevant people to help your business grow. Advisors can help you connect with industry leaders and effective individuals in your given field. You can build relationships with them and even initiate projects together in the future.",
            imageUrl: postimg2,
        },
        {
            title: "Intuitive Knowledge ",
            description: "With a myriad of advisors on our roster, the platform offers a colossal collective of experienced minds. When you consult someone who has crafted and worked with dozens of successful business strategies, it keeps you from the process of trial and error where your business runs the collateral damage.",
            imageUrl: postimg3,
            buttonOneUrl: "/All-profession",
            buttonTwoUrl: "/signup",
            videoUrl: "abc.com"
        },
    ]
    return(
        <>
            <PostCol
                buttonOneText={"Find your Advisor"}
                buttonTwoText={"Become an Advisor"}
                data={data}
            />
        </>
    )
}

export default PostSection;