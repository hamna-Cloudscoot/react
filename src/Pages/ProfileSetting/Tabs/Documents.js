import React, { useEffect, useState } from "react";
import DocumentsList from "../../../Components/DocumentsList";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const documents = [
    {
        id: "1",
        name: "pitchdeck.pdf",
        description: "A boutique investment firm with a global reach Indendent investment solutions for private and institutional clients",
        downloadUrl: "abc.con",
        size: "1.5MB",
        type: 'pdf'
    },
    {
        id: "1",
        name: "Marketing Startegy.doc",
        description: "A boutique investment firm with a global reach Indendent investment solutions for private and institutional clients",
        downloadUrl: "abc.con",
        size: "1.5MB",
        type: 'doc'
    },
    {
        id: "1",
        name: "CaseStudies.xls",
        description: "A boutique investment firm with a global reach Indendent investment solutions for private and institutional clients",
        downloadUrl: "abc.con",
        size: "1.5MB",
        type: 'xls'
    },
]



const Documents = (props) => {

    const { user } = useSelector((state) => state.user);
    const [allDocuments, setAllDocuments] = useState([]);

    console.log("User on documents = ", user);

    const mapDocuments = async () => {
        const arr = [];

        if (user.pitchDeckDocument) {
            const pitchDeck = {
                id: user.pitchDeckDocument?.id,
                name: user.pitchDeckDocument?.fileName,
                description: "A boutique investment firm with a global reach Indendent investment solutions for private and institutional clients",
                downloadUrl: user.pitchDeckDocument?.path,
                size: user.pitchDeckDocument?.size,
                type: user.pitchDeckDocument?.mimeType
            }
            arr.push(pitchDeck);
        }

        if (user.businessProfileDocument) {
            const bussinessDocument = {
                id: user.businessProfileDocument?.id,
                name: user.businessProfileDocument?.fileName,
                description: "A boutique investment firm with a global reach Indendent investment solutions for private and institutional clients",
                downloadUrl: user.businessProfileDocument?.path,
                size: user.businessProfileDocument?.size,
                type: user.businessProfileDocument?.mimeType
            }
            arr.push(bussinessDocument);
        }

        if (user.otherDocuments[0]) {
            const otherDocuments = {
                id: user.otherDocuments[0]?.id,
                name: user.otherDocuments[0]?.fileName,
                description: "A boutique investment firm with a global reach Indendent investment solutions for private and institutional clients",
                downloadUrl: user.otherDocuments[0]?.path,
                size: user.otherDocuments[0]?.size,
                type: user.otherDocuments[0]?.mimeType
            }
            arr.push(otherDocuments);
        }

        setAllDocuments(arr);
    }

    useEffect(() => {
        mapDocuments();
    }, [user])


    return (
        <>
            <Card>
                <Card.Body>
                    <DocumentsList data={allDocuments} />
                </Card.Body>
            </Card>
        </>
    )
}

export default Documents;