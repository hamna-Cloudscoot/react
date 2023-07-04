import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import img01 from "../../Images/img14.jpg";
import avatar from "Images/Avatar-icon.png";
import FileAPIs from "APIs/file"
import classes from 'Pages/Auth/index.module.scss'
import Loader from "Components/Loader";
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from "react-toastify";

const UploadProfilePicture = ({
    currentStep,
    setCurrentStep,
    userState,
    setUserState,
    disabled,
    skip,
    signUp,
}) => {

    const [imgFile, setImgFile] = useState();
    const [imgId, setImgId] = useState();
    const [isLoading, setIsLoading] = useState(false);

    let user = {

        profilePic: userState?.profilePic || {},
        profilePicId: userState?.profilePicId || '',
        profilePicSrc: userState?.profilePicSrc || '',
    }

    const schema = yup.object().shape({
        profilePic: yup.mixed().test("fileSize", "The file is too large", (value) => {
            if (!value.length) return true // attachment is optional
            return value[0].size <= 2000000
        }).optional(),
    });

    const userImageSrc = () => {
        if (!imgFile && userState?.profilePicSrc) {
            setImgFile(userState?.profilePicSrc)
        }
        if (!imgFile !== userState.profilePicSrc)
            setImgFile(userState?.profilePicSrc)
    }

    function uploadProfilePic(e, setFieldValue) {
        if (e.target.files[0]?.type === 'image/png' || e.target.files[0]?.type === 'image/jpeg') {
            console.log(e.target.files[0]);
            setImgFile(e.target.files[0]);
            setFieldValue('profilePic', e.target.files[0])
            setUserState({ ...userState, profilePic: e.target.files[0] })
            uploadToAPI(e.target.files[0], setFieldValue)
        } else {
            toast.error("Unsupported file format", {
                position: "top-right",
                autoClose: 2000,
            });
        }

    }

    const uploadToAPI = async (img, setFieldValue) => {
        try {
            setIsLoading(true)
            const dataArray = new FormData();
            dataArray.append("file", img);
            const res = await FileAPIs.uploadFile(dataArray)
            if (res) {
                setImgId(res.data.data.id)
                setImgFile(res.data.data.path)
                setFieldValue('profilePicId', res.data.data.id)
                setFieldValue('profilePicSrc', res.data.data.path)
                setUserState({
                    ...userState,
                    profilePicId: res.data.data.id,
                    profilePicSrc: res.data.data.path
                })
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
        setIsLoading(false);
    }

    const moveToNextPage = (data) => {
        console.log('data', data);
        setUserState({ ...userState, ...data })
        setCurrentStep(1)
    }

    useEffect(() => {
        if (userState)
            userImageSrc()
    }, [userState])

    const skipClick = async () => {
        console.log("skip Click");
        setImgFile(null);
    };

    return (
        <>
            <Loader isLoading={isLoading} />
            <Formik
                validationSchema={schema}
                onSubmit={(data) => { moveToNextPage(data) }}
                initialValues={user}
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
                        {signUp ? <>
                            <h1 className={classes.formTitle}>Sign Up to Open Founder</h1>
                            <p>Upload your profile photo</p>
                        </> : <></>}
                        <div className={'text-center mb-5 photoUploader'}>
                            <div className={"imgUpload"}>
                                {disabled ? '' :
                                    <Form.Label htmlFor={"imgUpload"}>
                                        <input type="file" id={"imgUpload"} name={'profilePic'} className={'fw-bold'} onChange={(e) => { uploadProfilePic(e, setFieldValue) }} />
                                        <i className={"fal fa-plus"}></i>
                                    </Form.Label>
                                }
                                <div className={"previewImg"}>
                                    <img src={imgFile ? imgFile : avatar} alt={"#"} />
                                </div>

                            </div>
                            {disabled ? '' :
                                <p>Upload your profile photo</p>
                            }
                        </div>

                        {currentStep === 0 ? <>
                            <Form.Group className={"mb-3"}>
                                {imgFile ? <Button type={"submit"} variant={"secondary w-100"}>Next</Button> : <Button type={"submit"} variant={"secondary w-100"} disabled>Next</Button>}

                            </Form.Group>
                        </> : <></>}
                        {skip ? <Button type={"submit"} className={"skip_btn"} onClick={skipClick}>Skip this one</Button> :
                            ""
                        }
                    </Form>
                )}
            </Formik>

        </>
    )
}

export default UploadProfilePicture;