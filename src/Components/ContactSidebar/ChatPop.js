import React, { useEffect, useState, useRef } from "react";
import classes from "./index.module.scss";
import img01 from "../../Images/img14.jpg"
import { Button, Dropdown, Form } from "react-bootstrap";
import ChatMessageAPIs from "APIs/chat"
import doc from "../../Images/doc-basic.png"
import { API_URL } from '../../config/constants'
import FileAPIs from '../../APIs/file'
import newSocket from '../../config/socket'
import imsss from '../../Images/avatar.png'
import DeletePopUp from "Components/DeletePopUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmojiPicker, { Categories, Emoji } from "emoji-picker-react";


const ChatPop = ({ handleClick, selectedContact, userId, isClicked, setSocketChange }) => {
    const bottomRef = useRef(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [file, setFile] = useState([]);
    const [uploadFile, setUploadFile] = useState();
    const [socket, setSocket] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [msgArr, setMsgArr] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [crrRoomId, setCrrRoomId] = useState('');
    const [initialMsgDate, setInitialMsgDate] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleEmojiSelect = (emoji) => {
        setInputValue(prevString => prevString + emoji.emoji);
        setSelectedEmoji(emoji);
    };


    let customSocket = "";

    const handleImage = (e) => {
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        if (e.target.files[0].type === 'application/pdf') {
            setFile(['pdf']);
        } else if (e.target.files[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            setFile(['doc']);
        }
        else {
            setFile(ImagesArray);
        }
        setUploadFile(e.target.files[0])
    }

    function deleteFile(e) {
        const s = file.filter((item, index) => index !== e);
        setUploadFile(null);
        setFile(null);
    }
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
    const getMessages = async (id) => {
        const res = await ChatMessageAPIs.getRoomMessages(id);
        if (res) {
            setMsgArr(res.data.data?.messages || []);
            setInitialMsgDate(res.data.data?.messages[0]?.createdAt)
            socket.emit('unreadChatsCount', userId);
        }
        setCrrRoomId(selectedContact?.roomId);
    }

    function imageUrl(str, image = '') {
        if (!str) {
            return image;
        }
        return `${API_URL}${str}`
    }

    useEffect(() => {
        newSocket.on('connect', () => {
            customSocket = socket?.id
        })
        setSocket(newSocket);
        socket?.emit('joinRoom', { userId: userId, room: selectedContact?.roomId });
        if (selectedContact?.roomId) {
            getMessages(selectedContact?.roomId);
        }
        setTimeout(() => {
            socket?.emit('unreadChatsCount', userId);
        }, 200);

    }, [selectedContact, isClicked]);

    useEffect(() => {
        if (socket !== null) {
            const messageListener = (message) => {
                setMsgArr(prevMsgArr => [...prevMsgArr, message]);
            };

            const checkTyping = async (payload) => {
                if (selectedContact) {
                    if (payload.isTyping && payload.roomId == selectedContact?.roomId) {
                        setIsTyping(true);
                    }
                    setTimeout(() => {
                        setIsTyping(false);
                    }, [2000])
                }

            }

            socket.on('message', messageListener);
            socket.on('typing', checkTyping)
            return () => {
                socket.off('message', messageListener);
            };
        }
    }, [socket, selectedContact]);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgArr]);

    const send = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        if (uploadFile) {
            const fileData = new FormData()
            fileData.append('file', uploadFile);
            const uploaded = await FileAPIs.uploadFile(fileData);
            if (uploaded) {
                var fileId = uploaded.data.data.id
                var filePath = uploaded.data.data.path
                var fileType = uploaded.data.data.mimeType
                var fileName = uploaded.data.data.fileName
            }
            if (socket !== null && socket.connected) {
                socket.emit('createChatSocket',
                    {
                        userId: userId,
                        roomId: selectedContact?.roomId,
                        message: inputValue,
                        attachment: { id: fileId, path: filePath, mimeType: fileType, fileName: fileName },
                        createdAt: new Date
                    });
            }
        } else {

            if (socket !== null && socket.connected) {
                console.log("Mesage == ", inputValue)
                socket.emit('createChatSocket', { userId: userId, roomId: selectedContact?.roomId, message: inputValue, createdAt: new Date });
            }
        }
        setFile(null)
        setUploadFile(null);
        setInputValue('');

        setTimeout(() => {
            socket?.emit('unreadChatsCount', userId);
        }, 300);
        setIsLoading(false);
    };

    let timeout;
    const emitTyping = async () => {
        socket.emit('typing', { roomId: selectedContact?.roomId, isTyping: true });

        timeout = setTimeout(() => {
            socket.emit('typing', { roomId: selectedContact?.roomId, isTyping: false });
        }, 5000);
    }

    function setTimeFormate(time) {
        const date = new Date(time);
        const formattedDate = date
            .toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            })
            .replace(",", " -");
        return formattedDate;
    }

    const shortenName = (name) => {
        if (name.length > 10) {
            const startStr = name.substr(0, 5);
            const endStr = name.substring(name.length - 5);
            return `${startStr}...${endStr}`;
        }
        return name;
    };

    var mydate = initialMsgDate;
    var msgToday = false
    const showMessageDatec = (date, msg) => {
        const targetDate = new Date(date);
        targetDate.setHours(0);
        targetDate.setMinutes(0);
        targetDate.setSeconds(0);
        targetDate.setMilliseconds(0);

        if (mydate) {
            const oldDate = new Date(mydate);
            oldDate.setHours(0);
            oldDate.setMinutes(0);
            oldDate.setSeconds(0);
            oldDate.setMilliseconds(0);
            const crrDate = new Date();
            crrDate.setHours(0);
            crrDate.setMinutes(0);
            crrDate.setSeconds(0);
            crrDate.setMilliseconds(0);

            if (targetDate.toDateString() == crrDate.toDateString()) {
                if (msgToday == false) {
                    msgToday = true;
                    return 'Today'
                } else {
                    return ''
                }

            } else if (targetDate > oldDate) {
                mydate = date;
                return targetDate.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })
            }
        }
    }

    const dateAtTop = () => {
        const crrDate = new Date();
        crrDate.setHours(0);
        crrDate.setMinutes(0);
        crrDate.setSeconds(0);
        crrDate.setMilliseconds(0);

        if (initialMsgDate) {
            const oldDate = new Date(initialMsgDate);
            oldDate.setHours(0);
            oldDate.setMinutes(0);
            oldDate.setSeconds(0);
            oldDate.setMilliseconds(0);

            if (oldDate.toLocaleDateString() == crrDate.toLocaleDateString()) {
                msgToday = true;
                return 'Today'
            } else {
                return oldDate.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })
            }
        }
    }

    return (
        <>
            <div className={`${classes.chatPopup} chatPop`}>
                <div className={classes.chatHeader}>
                    <div className={classes.imgBox}>
                        <img src={selectedContact?.imgUrl ? selectedContact?.imgUrl : imsss} alt={"#"} />
                    </div>
                    <div className={classes.description}>
                        <h5>{selectedContact?.name}</h5>
                        {selectedContact?.isOnline ? <div className={'d-flex align-items-center'}><span className={classes.status}></span>Active now</div> : ''}
                    </div>
                    <Dropdown align="end" className={`action-dropdown ${classes.dropdown}`}>
                        <Dropdown.Toggle variant="action">
                            <i className={"fas fa-ellipsis-v fa-fw"}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Start a meeting</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={() => setModalShow(true)}>Delete Message</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant={`link ${classes.btnClose}`} onClick={() => { handleClick(true) }}><i className={'fal fa-times'}></i> </Button>
                </div>

                <div className={classes.mesgs}>
                    <div id={'msgHistory'} className={classes.msgHistory}>
                        <p className={classes.chatDate}>{dateAtTop()}</p>
                        {msgArr?.map((msg) => {
                            if (msg?.userId === userId) {
                                return (
                                    <>
                                        <><p className={classes.chatDate}>{showMessageDatec(msg.createdAt, msg.message)}</p></>
                                        {msg.attachment?.path ?
                                            <div className={classes.outgoing}>
                                                <div className={classes.description}>
                                                    <div className={`p-0 ${classes.text}`}>
                                                        <div className={classes.text}>
                                                            <div>
                                                                <div className={classes.fileImg}>
                                                                    <p>{msg?.message}</p>
                                                                    <div className="d-flex align-items-center">
                                                                        {msg?.attachment?.mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                                                                            <div className={classes.imgBox}>
                                                                                <img src={doc} alt="doc" style={{ maxWidth: '100px', }} />
                                                                                <h6>DOC</h6>
                                                                                <p>{shortenName(msg?.attachment?.fileName)}</p>
                                                                            </div>

                                                                        }
                                                                        {msg?.attachment?.mimeType === "application/pdf" &&
                                                                            <div className={classes.imgBox}>
                                                                                <img style={{ maxWidth: '100px', }} src={doc} alt="img" />
                                                                                <h6>PDF</h6>
                                                                                <p> {shortenName(msg?.attachment?.fileName)}</p>
                                                                            </div>
                                                                        }
                                                                        {msg?.attachment?.mimeType !== "application/pdf" && msg?.attachment?.mimeType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                                                                            <img key={"54534"} src={msg?.attachment?.path} style={{ maxWidth: '100px', }} alt="username" />
                                                                        }
                                                                        <Button type={"button"} variant={'btnDownload'} onClick={() => downloadImage(msg?.attachment?.path)}><i className={'fal fa-download'}></i> </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className={classes.time}> {new Date(data.createdDate).toLocaleString('en-US', {hour:'numeric', minute: 'numeric', hour12: true })}</div> */}
                                                        </div>
                                                        <div className={classes.time}>{setTimeFormate(msg.createdAt)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className={classes.outgoing}>
                                                <div className={classes.description}>
                                                    <div className={classes.text} >{msg?.message}
                                                        <div className={classes.time}>{setTimeFormate(msg.createdAt)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <><p className={classes.chatDate}>{showMessageDatec(msg.createdAt, msg.message)}</p></>
                                        <div className={classes.incoming} >
                                            <div className={classes.userImg}>
                                                <img src={selectedContact?.imgUrl ? selectedContact?.imgUrl : imsss} style={{ maxWidth: '100px', }} alt={"#"} />
                                            </div>

                                            {msg?.attachment?.path ?
                                                <div className={classes.description}>
                                                    <div className={`p-0 ${classes.text}`}>
                                                        <div className={classes.text}>
                                                            <div>
                                                                <div className={classes.fileImg}>
                                                                    <p>{msg?.message}</p>
                                                                    <div className="d-flex align-items-center">
                                                                        {msg?.attachment?.mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                                                                            <div className={classes.imgBox}>
                                                                                <img src={doc} alt="doc" style={{ maxWidth: '100px', }} />
                                                                                <h6>DOC</h6>
                                                                                <p>{shortenName(msg?.attachment?.fileName)}</p>
                                                                            </div>
                                                                        }
                                                                        {msg?.attachment?.mimeType === "application/pdf" &&
                                                                            <div className={classes.imgBox}>
                                                                                <img src={doc} alt="pdf" style={{ maxWidth: '100px', }} />
                                                                                <h6>PDF</h6>
                                                                                <p>{shortenName(msg?.attachment?.fileName)}</p>
                                                                            </div>
                                                                        }
                                                                        {msg?.attachment?.mimeType !== "application/pdf" && msg?.attachment?.mimeType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                                                                            <img key={"54534"} src={msg?.attachment?.path} style={{ maxWidth: '100px', }} alt="username" />
                                                                        }
                                                                        <Button type={"button"} variant={'btnDownload'} onClick={() => downloadImage(msg?.attachment?.path)}><i className={'fal fa-download'}></i> </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className={classes.time}> {new Date(data.createdDate).toLocaleString('en-US', {hour:'numeric', minute: 'numeric', hour12: true })}</div> */}
                                                        </div>
                                                        <div className={classes.time}>{setTimeFormate(msg.createdAt)}</div>
                                                    </div>
                                                </div>
                                                :
                                                <div className={classes.description}>
                                                    <div className={classes.text}>{msg?.message}
                                                        <div className={classes.time}>{setTimeFormate(msg.createdAt)}</div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </>
                                )
                            }

                        })}
                        <div className="form-group previewBox">
                            {file?.length > 0 &&
                                file?.map((item, index) => {
                                    return (
                                        <div className={`preview ${classes.previewImg}`} key={item}>
                                            {item === 'pdf' || item === 'doc' ?
                                                <div className={classes.imgBox}>
                                                    <img src={doc} alt="img" style={{ maxWidth: "100px" }} />
                                                    <h6>{item.toUpperCase()}</h6>
                                                    <p>{uploadFile?.name.slice(0, 15)}</p>
                                                </div>
                                                :
                                                <img src={item} alt="img" style={{ maxWidth: "100px" }} />
                                            }

                                            <Button
                                                type="button"
                                                onClick={() => deleteFile(index)}
                                            >
                                                <i className={"fal fa-times"}></i>
                                            </Button>
                                        </div>
                                    );
                                })}
                        </div>
                        {showPicker && (
                            <EmojiPicker onEmojiClick={handleEmojiSelect}>
                                <Emoji />
                            </EmojiPicker>
                        )}
                        <div ref={bottomRef}></div>
                    </div >

                    {isLoading ? <p>Loading....</p> :
                        <>                      {isTyping ? <p>typing ...</p> : ''}
                            <div className={classes.typeMsg}>
                                <div className={classes.btnGroup}>
                                    <button type="button" className={classes.btn} onClick={togglePicker}><i className="far fa-smile"></i></button>
                                    <Form.Label htmlFor={'inputAttach'} className={classes.inputAttach}>
                                        <Form.Control id={'inputAttach'} type={'file'} accept={".pdf,.jpg,.jpeg,.png"} onChange={handleImage} />
                                    </Form.Label>
                                </div>
                                <div className={classes.userImg}>
                                    <img src={selectedContact?.imgUrl ? selectedContact?.imgUrl : imsss} alt={"#"} />
                                </div>
                                <Form onSubmit={send}>
                                    {uploadFile ?
                                        <input type="text" className={classes.formControl} placeholder="Type a message" value={inputValue} onChange={(e) => { setInputValue(e.target.value); emitTyping() }} />
                                        :
                                        <input type="text" className={classes.formControl} placeholder="Type a message" value={inputValue} onChange={(e) => { setInputValue(e.target.value); emitTyping(); }} required />
                                    }
                                </Form>
                            </div> </>

                    }

                </div>
            </div >
            <DeletePopUp
                type={"chat"}
                roomId={selectedContact?.roomId}
                getMessages={getMessages}
                show={modalShow}
                onHide={() => setModalShow(false)}
                desc={'Are you sure you want to delete all message?'}
                text={'Delete messages'}
                text2={'Cancel'}
            />
        </>
    )
}

export default ChatPop;