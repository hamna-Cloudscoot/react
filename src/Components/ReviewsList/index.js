import React, {useState, useMemo} from "react";
import classes from "./index.module.scss";
import {Link} from "react-router-dom";
import { Rating } from 'react-simple-star-rating'
import Pagination from "../Pagination/Pagination";

let PageSize = 10;


const ReviewsList = (props) => {
    const data = [
        {
            name: "Andrew Parker",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "A",
            rating: "4",
        },
        {
            name: "George Bill",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "G",
            rating: "3",
        },
        {
            name: "Peter Mark",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "P",
            rating: "2",
        },
        {
            name: "Andrew Parker",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "A",
            rating: "4",
        },
        {
            name: "George Bill",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "G",
            rating: "3",
        },
        {
            name: "Peter Mark",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "P",
            rating: "2",
        },
        {
            name: "Andrew Parker",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "A",
            rating: "4",
        },
        {
            name: "George Bill",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "G",
            rating: "3",
        },
        {
            name: "Peter Mark",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "P",
            rating: "2",
        },
        {
            name: "Andrew Parker",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "A",
            rating: "4",
        },
        {
            name: "George Bill",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "G",
            rating: "3",
        },
        {
            name: "Peter Mark",
            date: "22. 10. 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in urna sollicitudin, laoreet arcu dapibus, auctor enim. Curabitur tempor ut erat id sagittis",
            symble: "P",
            rating: "2",
        },

    ]

    const [blogPosts, setBlogPosts] = useState([]);
    const [ratingValue, setRatingValue] = useState(0)

    const handleRating = (rate: number) => {
        setRatingValue(rate)
    }

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);



    return(
        <>
            {blogPosts ? (
                <div className="blog-content-section">
                    <ul className={classes.reviewsList}>
                        {currentTableData.map((data) => (
                            <li>
                                <div className={classes.iconBox}>
                                    {data.symble}
                                </div>
                                <div className={classes.description}>
                                    <div className={classes.title}>
                                        {data.name}
                                        <Rating
                                            onClick={handleRating}
                                            allowHover={false}
                                            size={20}
                                        />
                                    </div>
                                    <time className={"d-block text-muted"}>{data.date}</time>
                                    <p>{data.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {props.noPaging ? '' :
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={data.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    }
                    {props.Page ? '' :
                        <div className={"text-right"}>
                            <Link className={'btn btn-light'} to={"/reviews"}>View More</Link>
                        </div>
                    }

                </div>
            ) : (
                <div className="loading">Loading...</div>
            )}


        </>
    )
}

export default ReviewsList;