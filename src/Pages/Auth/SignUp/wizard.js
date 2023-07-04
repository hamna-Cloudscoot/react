import React from "react";
import { Button, Form } from "react-bootstrap";
import classes from '../index.module.scss';
import validator from "validator";

const Wizard = ({ children, isValid, handleSubmit }) => {
    const [activePageIndex, setActivePageIndex] = React.useState(0);
    const pages = React.Children.toArray(children);
    const currentPage = pages[activePageIndex];

    const goNextPage = () => {
        setActivePageIndex(index => index + 1);
    };

    const validateFormSteps = () => {
        if (currentPage.props.componentName.toString().trim() === 'PersonalDetails') {
            if (
                validator.isEmpty(currentPage.props.userState.firstName) ||
                validator.isEmpty(currentPage.props.userState.lastName) ||
                validator.isEmpty(currentPage.props.userState.email) ||
                !validator.isEmail(currentPage.props.userState.email) ||
                validator.isEmpty(currentPage.props.userState.password) ||
                validator.isEmpty(currentPage.props.userState.repeatPassword) ||
                currentPage.props.userState.repeatPassword !== currentPage.props.userState.password
            ) {
                currentPage.props.setUserState({ ...currentPage.props.userState, hasErrors: true })
                return false
            }
            else {
                currentPage.props.setUserState({ ...currentPage.props.userState, hasErrors: false })
                return true
            }
        }
        else if (currentPage.type.name.toString().trim() === 'MoreInfo') {
            if (
                validator.isEmpty(currentPage.props.userState.linkedInProfile) ||
                validator.isEmpty(currentPage.props.userState.skills.toString()) ||
                validator.isEmpty(currentPage.props.userState.city)
            ) {
                currentPage.props.setUserState({ ...currentPage.props.userState, hasErrors: true })
                return false
            }
            else {
                currentPage.props.setUserState({ ...currentPage.props.userState, hasErrors: false })
                return true
            }
        }
        else {
            currentPage.props.setUserState({ ...currentPage.props.userState, hasErrors: false })
            return true
        }
    }

    const goPrevPage = () => {
        setActivePageIndex(index => index - 1);
    };

    const ButtonPrev = () =>
        activePageIndex > 0 ? (
            <Form.Group className={"mb-3 text-center"}>
                <Button type={"button"} onClick={goPrevPage} variant={"transparent"}>back</Button>
            </Form.Group>
        ) : null;
    const ButtonNext = () =>
        activePageIndex < pages.length - 1 ? (
            <>
                <Form.Group className={"mb-3"}>
                    <Button type={"button"} onClick={goNextPage} variant={"secondary w-100"}>Next</Button>
                </Form.Group>
            </>
        ) : null;

    const ButtonLast = () =>
        activePageIndex === pages.length ? (
            <>
                <Form.Group className={"mb-3"}>
                    <Button type={"button"} onClick={goNextPage} variant={"secondary w-100"}>Submit</Button>
                </Form.Group>
            </>
        ) : null;

    return (
        <div className="wizard">
            <div className="wizard__content">{currentPage}</div>
            <div className={classes.wizardButtons}>
                {/*<ButtonPrev />*/}
                <ButtonNext />
                {/* <ButtonLast /> */}
            </div>
        </div>
    );
};

export default Wizard;
