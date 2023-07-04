import React from "react";
import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import { isTextLong, sliceLongText } from "GlobalHelperFunctions";

const BlogCard = (props) => {

    const MAX_TEXT_LENGTH_TITLE = 25;

    const isTitleLong = (text) => {
        if (text?.length > MAX_TEXT_LENGTH_TITLE) return true
        return false
    }

    const sliceLongTitle = (text) => {
        if (isTitleLong(text)) {
            return `${text.slice(0, MAX_TEXT_LENGTH_TITLE)}...`
        }
        return text
    }


    function PlainText(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        const plainText = div.innerText;

        return (
            <div>{sliceLongText(plainText)}</div>
        );
    }

    return (
        <div className={`col ${classes.col}`}>
            <div className={classes.box}>
                <div className={classes.imgBox}>
                    <img src={props.data.thumbnail?.path} alt={props.data.title} />
                </div>
                <div className={classes.description}>
                    <h3 className={`font-18 ${props.blogs ? 'fw-semibold' : null} ${classes.title}`}>{sliceLongTitle(props.data.title)}</h3>
                    <>{PlainText(props.data.description)}</>
                    {props.blogs ? <>
                        <Link to={`/blogs/blog-detail/${props.data.id}`} className={"text-green"}>Show More</Link>
                    </> : <>
                        <Link to={`#`} className={"text-green"}>Show More</Link>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default BlogCard;