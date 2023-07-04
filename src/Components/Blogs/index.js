import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SectionTitle from "../SectionHeader";
import ColSlider from "../ColSlider";
import img08 from "../../Images/img08.jpg";
import img09 from "../../Images/img09.jpg";
import img10 from "../../Images/img10.jpg";
import BlogAPIs from "APIs/blogs"

const Blogs = (props) => {

    const [blogs, setBlogs] = useState([])

    const getBlogs = async () => {
        const res = await BlogAPIs.getBlogs();
        if (res) {
            setBlogs(res.data.data)
        }
    }

    useEffect(() => {
        getBlogs();
    }, [])
    const data = [
        {
            title: "Making mentorship work out",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim...",
            imgURL: img08,
            linkText: "Read More",
            url: "/blogs/blog-detail"
        },
        {
            title: "Ask questions to your advisors",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim...",
            imgURL: img09,
            linkText: "Read More",
            url: "/blogs/blog-detail"
        },
        {
            title: "Improvement in stats",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim...",
            imgURL: img10,
            linkText: "Read More",
            url: "/blogs/blog-detail"
        },

    ]

    return (
        <>
            <section className={"section"}>
                <Container>
                    <SectionTitle title={"Blogs"} description={"Interesting and informative reading about entrepreneurship, advisors and startups."} />
                    <ColSlider
                        BLogSlider
                        slidesScroll={1}
                        arrows={true}
                        dots={false}
                        slidesShow={3}
                        buttonText="View all Blogs"
                        btnUrl="/blogs"                        
                        linkText={"Read More..."}
                        data={blogs}
                    />
                </Container>
            </section>
        </>
    )
}

export default Blogs;