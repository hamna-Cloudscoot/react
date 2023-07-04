import React, { useState, useEffect } from "react";
import Banner from "../../Components/Banner";
import { Container } from "react-bootstrap";
import SearchBar from "../../Components/SearchBar";
import BlogAPIs from "APIs/blogs"
import BlogCard from "Components/BlogCard";
import { isAsyncThunkAction } from "@reduxjs/toolkit";

const Blogs = (props) => {

    const [blogs, setBlogs] = useState([])
    const [searchedBlog, setSearchedBlog] = useState('')

    const getBlogs = async () => {
        const res = await BlogAPIs.getBlogs();
        if (res) {
            setBlogs(res.data.data)
            return res.data.data
        }
    }

    const searchBlogs = async (searchString) => {
        const search = {
            s: JSON.stringify({
                title: {
                    $contL: searchString
                }
            })
        }
        const res = await BlogAPIs.getSearchedBlogs(search);
        if (res) {
            setBlogs(res.data.data)
            return res.data.data
        }
    }

    useEffect(() => {
        getBlogs();
    }, [])

    return (
        <>
            <Banner
                title={"Blogs"}
                description={"Browse exciting articles and blogs that will help you gain insights regarding Openadvisor."}
            />
            <section className={"section"}>
                <Container>
                    <SearchBar placeholder={"Search Article"} searchFor={'blogs'} getDataMethod={getBlogs} getSearchedMethod={searchBlogs} searchedValue={searchedBlog} setSearchedValue={setSearchedBlog} state={blogs} setState={setBlogs} />
                    <div className={`colList`}>
                        {blogs.map((data) => (
                            <BlogCard
                                blogs
                                data={data}
                            />
                        ))}
                    </div>

                </Container>
            </section>
        </>
    )
}

export default Blogs;