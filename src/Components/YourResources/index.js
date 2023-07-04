import React, { useState, useEffect } from "react";
import classes from 'Pages/Auth/index.module.scss'
import { Button, Form, } from "react-bootstrap";
import "react-credit-cards/es/styles-compiled.css";

import { Formik } from 'formik';
import * as yup from 'yup';

const FILE_SIZE = 10 * 1024 * 1024; // 2MB in bytes

const YourResources = ({
    currentStep,
    setCurrentStep,
    userState,
    setUserState
}) => {

    let user = {
        pitchDeckDocument: userState.pitchDeckDocument || {},
        pitchDeckDocumentId: userState.pitchDeckDocumentId || '',
        pitchDeckDocumentSrc: userState.pitchDeckDocumentSrc || '',
        businessProfileDocument: userState.businessProfileDocument || {},
        businessProfileDocumentId: userState.businessProfileDocumentId || '',
        businessProfileDocumentSrc: userState.businessProfileDocumentSrc || '',
        otherDocuments: userState.otherDocuments || [],
        otherDocumentSrc: userState.otherDocumentSrc || [],
    }

    const schema = yup.object().shape({
        pitchDeckDocument: yup.mixed()
            .test('fileSize', 'File too large or not present', function (value) {
                if (!value || (!value.size)) {
                    return this.createError({ message: 'A file is required' });
                }
                if (value.size > FILE_SIZE) {
                    console.log(value.size)
                    return this.createError({ message: 'File size too large' });
                }
                // Validate file type
                const allowedFileTypes = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.ms-excel",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel.sheet.macroenabled.12" // XLSX
                ];
                if (value.type && !allowedFileTypes.includes(value.type)) {
                    return this.createError({ message: 'Invalid file type. PDF, XLS, and DOC files are allowed.' });
                }
                return true;
            }),
        businessProfileDocument: yup.mixed().test("fileSize", "The file is too large", function (value) {
            // Validate file type
            const allowedFileTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel.sheet.macroenabled.12" // XLSX
            ];
            if (value.type && !allowedFileTypes.includes(value.type)) {
                return this.createError({ message: 'Invalid file type. PDF, XLS, and DOC files are allowed.' });
            }

            if (!value.length) return true // attachment is optional

            return value[0].size <= FILE_SIZE
        }).optional(),
        otherDocuments: yup.array().of(yup.mixed().test("fileSize", "The file is too large", function (value) {
            // Validate file type
            const allowedFileTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel.sheet.macroenabled.12" // XLSX
            ];
            if (value.type && !allowedFileTypes.includes(value.type)) {
                return this.createError({ message: 'Invalid file type. PDF, XLS, and DOC files are allowed.' });
            }

            if (!value.length) return true // attachment is optional
            return value[0].size <= FILE_SIZE
        })).optional(),
    });

    const [filePitch, setFilePitch] = useState();
    const [filePitchName, setFilePitchName] = useState();
    const [businessProfileDocument, setBusinessProfileDocument] = useState();
    const [otherDocuments, setOtherDocuments] = useState();
    const [otherDocumentsName, setOtherDocumentsName] = useState();

    const uploadPitchDocument = (e, setFieldValue) => {
        user.pitchDeckDocument = e.target.files[0]
        setFilePitch(e.target.files[0]);
        setFieldValue('pitchDeckDocument', user.pitchDeckDocument)
        // props.setUserState({ ...props.userState, pitchDeckDocument: user.pitchDeckDocument })
    }

    const uploadBusinessDocument = (e, setFieldValue) => {
        user.businessProfileDocument = e.target.files[0]
        setBusinessProfileDocument(e.target.files[0]);
        setFieldValue('businessProfileDocument', user.businessProfileDocument)
        // props.setUserState({ ...props.userState, businessProfileDocument: user.businessProfileDocument })
    }

    const uploadOtherDocuments = (e, setFieldValue) => {
        let files = e.target.files
        user.otherDocuments = files
        let namesArr = []
        for (let index = 0; index < files.length; index++) {
            const element = files[index].name;
            namesArr.push(element)
        }
        setOtherDocuments(files);
        setOtherDocumentsName(namesArr.toString())
        setFieldValue('otherDocuments', [...user.otherDocuments])
        // props.setUserState({ ...props.userState, otherDocuments: [...user.otherDocuments] })
    }

    const moveToNextPage = (data) => {
        console.log('data', data);
        setUserState({ ...userState, ...data })
        setCurrentStep(4)
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { moveToNextPage(data) }}
                initialValues={user}
                validateOnChange={false}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    setFieldValue,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <h1 className={classes.formTitle}>Your Resources</h1>
                        <p>We need additional resources from you</p>
                        <p className={'fw-semibold'}>Fill in</p>
                        <Form.Group className={"mb-3"}>
                            <Form.Label>Pitch Deck <span style={{ color: 'red' }}>*</span></Form.Label>
                            <div className={classes.fileUpload}>
                                <Form.Label htmlFor={"fileUpload"}>
                                    <input
                                        type="file"
                                        id={"fileUpload"}
                                        name={"fileUpload"}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                        onChange={(e) => { uploadPitchDocument(e, setFieldValue) }}
                                        required
                                        isInvalid={!!errors.pitchDeckDocument}
                                    />
                                    {filePitch ? <>{filePitch.name}</> : "Upload here"}
                                </Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {/* Pitch deck document is required. */}
                                    {errors.pitchDeckDocument}
                                </Form.Control.Feedback>
                                {errors.pitchDeckDocument ? <p style={{ color: 'red' }}>{errors.pitchDeckDocument}</p> : <></>}
                            </div>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Form.Label>Business Plan</Form.Label>
                            <div className={classes.fileUpload}>
                                <Form.Label htmlFor={"fileUpload1"}>
                                    <input
                                        type="file"
                                        id={"fileUpload1"}
                                        name={"fileUpload1"}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                        onChange={(e) => { uploadBusinessDocument(e, setFieldValue) }}
                                        isInvalid={!!errors.businessProfileDocument}
                                    />
                                    {businessProfileDocument ? <>{businessProfileDocument.name}</> : "Upload here"}
                                </Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {/* Business profile document is required. */}
                                    {errors.businessProfileDocument}
                                </Form.Control.Feedback>
                                {errors.businessProfileDocument ? <p style={{ color: 'red' }}>{errors.businessProfileDocument}</p> : <></>}
                            </div>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Form.Label>Other Documents</Form.Label>
                            <div className={classes.fileUpload}>
                                <Form.Label htmlFor={"fileUpload2"}>
                                    <input
                                        type="file"
                                        multiple
                                        id={"fileUpload2"}
                                        name={'fileUpload2'}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                        onChange={(e) => { uploadOtherDocuments(e, setFieldValue) }}
                                        isInvalid={!!errors.otherDocuments}
                                    />
                                    {otherDocuments ? <>{otherDocumentsName}</> : "Upload here"}
                                </Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {/* Other document is required. */}
                                    {errors.otherDocuments}
                                </Form.Control.Feedback>
                                {errors.otherDocuments ? <p style={{ color: 'red' }}>{errors.otherDocuments}</p> : <></>}
                            </div>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Button type={"submit"} variant={"secondary w-100"}>Next</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default YourResources