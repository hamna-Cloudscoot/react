import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import MessageAPIs from '../../APIs/chat/index'
import { toast } from "react-toastify";


const DeletePopUp = (props) => {

    const deleteAPI = async () => {
        if (props?.type == 'chat') {
            await MessageAPIs.deleteAllMessages({ roomId: props?.roomId });
            toast.success("Deletd Successfully", {
                position: "top-right",
                autoClose: 2000,
            });
            props.getMessages(props?.roomId);
            props.onHide();            
        }
    }
    return (
        <div>
            <Modal
                show={props.show}
                size='medium'
                centered
            >
                <Modal.Body>
                    <p className='text-center'>{props.desc}</p>
                    <Button type="button" variant="outline-danger w-100" onClick={deleteAPI}>{props.text}</Button>
                    <Button onClick={props.onHide} variant="outline-cancel my-2 w-100" type="button">{props.text2}</Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DeletePopUp