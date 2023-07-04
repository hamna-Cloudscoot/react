import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import PageTitle from "../../Components/PageTitle";
import { Card, Container } from "react-bootstrap";
import classes from "./index.module.scss";
import SectionTitle from "../../Components/SectionHeader";
import ColSlider from "../../Components/ColSlider";
import SocialLinks from "../../Components/SocialLinks";
import BlogAPIs from "APIs/blogs"

const BLogDetail = (props) => {
    const { id } = useParams()
    const [blogs, setBlogs] = useState([]);
    const [oneBlog, setOneBlog] = useState({});

    const getBlogs = async () => {
        const res = await BlogAPIs.getBlogs();
        if (res) {
            const relatedBlogs = res.data.data.filter(obj => obj.id !== id)
            setBlogs(relatedBlogs)
        }
    }

    const getOneBlog = async (id) => {
        const blog = await BlogAPIs.getOneBlog(id);
        if (blog) {
            setOneBlog(blog.data.data);
        }

    }
    useEffect(() => {
        getBlogs();
        getOneBlog(id);
    }, [useParams(id)])

    const changeDateFormate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options).replace(/\//g, '.');
        return formattedDate;
    }

    return (
        <>
            <PageTitle title={oneBlog.title} date={changeDateFormate(oneBlog.createdAt)} />
            <section className={"p-0"}>
                <Container>
                    <Card>
                        <div className={classes.imgBox}>
                            <img src={oneBlog.thumbnail?.path} alt={oneBlog.title} />
                        </div>
                        <SocialLinks blogs />
                        <Card.Body className={classes.cardBody}>
                            <div dangerouslySetInnerHTML={{ __html: oneBlog.description }} />
                            {/* <div className={classes.imgBox}>
                                <img src={bd2} alt={"#"} />
                            </div>
                            <p>Most businesses are not profitable at first, and it could take quite a while to break through and earn a steady stream of income. While the costs of an online business aren’t exorbitant as they might be for more traditional businesses, they can still be a drain, especially if you’re also working on it full time and have no other sources of income. You do not want to make business decisions based on short-term personal financial needs.</p>

                            <p>When starting out, you need to make sure you either have a reliable stream of income or enough in the bank to keep full operating costs going for at least one year and up to three years, if you think your platform or idea might take a while to take off.</p> */}
                        </Card.Body>
                    </Card>
                </Container>
            </section>
            <section className={"section"}>
                <Container>
                    <SectionTitle title={"Related Blogs"} description={"Interesting and informative reading about entrepreneurship, advisors and startups."} />
                    <ColSlider
                        BLogSlider
                        slidesScroll={1}
                        arrows={true}
                        dots={false}
                        slidesShow={3}
                        buttonText="View all Blogs"
                        btnUrl="/blogs"
                        blogDetailUrl="/blogs/blog-detail"
                        linkText={"Read More..."}
                        data={blogs}
                    />
                </Container>
            </section>
        </>
    )
}

export default BLogDetail;