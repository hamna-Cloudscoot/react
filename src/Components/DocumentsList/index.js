import React from "react";
import classes from "./index.module.scss";
import { Button } from "react-bootstrap";
import doc from "../../Images/doc.svg";
import pdf from "../../Images/pdf.svg";
import xls from "../../Images/xls.svg";

const DocumentsList = ({ data }) => {

    const downloadImage = (url) => {
        var filename = url.substring(url.lastIndexOf('/') + 1);
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            })
            .catch(console.error);
    }

    return (
        <>
            <div className={classes.colList}>
                {data.map((data) => (
                    <div className={classes.col}>
                        <div className={classes.box}>
                            <div className={classes.imgBox}>
                                {
                                    (() => {
                                        if (data.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                                            return (
                                                <img src={doc} alt={"name"} />
                                            )
                                        } else if (data.type === 'application/pdf') {
                                            return (
                                                <img src={pdf} alt={"name"} />
                                            )
                                        } else {
                                            return (
                                                <img src={xls} alt={"name"} />
                                            )
                                        }
                                    })()
                                }
                            </div>
                            <Button className={classes.star}><i className={'fal fa-star'}></i> </Button>
                            <div className={classes.title}>{data.name}</div>
                            <p className={'text-muted'}>{data.description}</p>
                            <div className={classes.colFooter}>
                                <div className={'my-2'}>{(Math.round(data.size / 1048576) + 1)} MB</div>
                                <div className={classes.actionList}>
                                    <Button variant={"bgLight action"} onClick={() => window.open(data.downloadUrl, "_blank")}><i className={'fal fa-eye'} ></i> </Button>
                                    <Button variant={"dark action"} onClick={() => { downloadImage(data.downloadUrl) }}><i className={'fal fa-download'}></i> </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default DocumentsList;