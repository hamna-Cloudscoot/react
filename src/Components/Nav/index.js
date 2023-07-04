import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import user1 from "../../Images/user1.svg";
import { Dropdown, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Notifications from "../Notifications";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "redux/reducers/auth";
import avatar from "Images/avatar.png";
import { userSuccess } from "redux/reducers/user";
import Socket from "../../config/socket";
import UserAPIs from 'APIs/user'
import NotificationAPIs from 'APIs/notification'
import { toast } from "react-toastify";
import { setPaymentVerifiedStore } from "redux/reducers/paymentVerified";

const Navigation = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState();
  const { user } = useSelector((state) => state.user);
  const [msgCount, setMsgCount] = useState(0);
  const [userData, setUserData] = useState({});
  const { count } = useSelector(state => state.messageNotification);
  const [paymentVerified, setPaymentVerified] = useState(true);

  useEffect(() => {
    Socket.on('unreadChatsCountNav', (count) => {
      if (count) {
        setIsLoading(true);
        setMsgCount(count);
      }
      setIsLoading(false)
    })

  }, [socket])

  const logoutUser = () => {
    dispatch(
      authSuccess({
        userId: null,
        user: null,
        accessToken: null,
        refreshToken: null,
      })
    );

    dispatch(
      userSuccess({
        user: null,
      })
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };

  useEffect(() => {
    if (user) {
      Socket.emit('unreadChatsCount', user?.id);
      setUserData(user);
    }
    const getUpdatedUser = async () => {
      if (user) {
        const updatedUser = await UserAPIs.getOneUser(user.id);
        if (updatedUser) {
          if (updatedUser.data.data?.paymentVerified === false) {
            setPaymentVerified(false)
            dispatch(
              setPaymentVerifiedStore({
                isVerified: false
              })
            )
          } else {
            dispatch(
              setPaymentVerifiedStore({
                isVerified: true
              })
            )
          }
        }
      }
    }

    getUpdatedUser();
  }, [user]);

  const showError = () => {
    toast.error("Subscription Required to Access Dashboard", {
      position: "top-right",
      autoClose: 2000,
    });
  }

  return (
    <>
      <nav id={`${classes.nav}`} className={`${props.dashboard ? `${classes.dashboardNav}` : ""}`}>
        <Nav as="ul">
          {props.dashboard ? (
            <>
              <Nav.Item as="li">
                <NavLink to="/dashboard">
                  <i className={"dashboard"}></i>
                  Dashboard
                </NavLink>
              </Nav.Item>
              <Nav.Item as="li">
                <NavLink to={"/meeting_room"}>
                  <i className={"cam"}></i>
                  Virtual Board Room
                </NavLink>
              </Nav.Item>
              <Nav.Item as="li">
                <NavLink to={"/request"}>
                  <i className={"usergroup"}></i>
                  Requests
                </NavLink>
              </Nav.Item>
              <Nav.Item as="li">
                <NavLink to={"/schedules"}>
                  <i className={"calendar"}></i>
                  Calendar
                </NavLink>
              </Nav.Item>
            </>
          ) : (
            <>
              {!user ?
                <Nav.Item as="li">
                  <NavLink to="/">Home</NavLink>
                </Nav.Item> :
                <>
                  <Nav.Item as="li">
                    {paymentVerified ? <NavLink to="/dashboard">Dashboard</NavLink> : <NavLink className={"inacitve"} to="/subscription-payment" onClick={showError}>Dashboard</NavLink>}
                  </Nav.Item>
                </>
              }
              <Nav.Item as="li">
                <NavLink to={"/blogs"}>Blogs</NavLink>
              </Nav.Item>
              <Nav.Item as="li">
                <NavLink to={"/terms-of-use"}>Terms of Use</NavLink>
              </Nav.Item>
              <Nav.Item as="li">
                <NavLink to={"/terms-conditions"}>Terms & Conditions</NavLink>
              </Nav.Item>
              <Nav.Item as="li">
                <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
              </Nav.Item>
              <Nav.Item as="li">
                <NavLink to={"/support"}>Contact Us</NavLink>
              </Nav.Item>
            </>
          )}
        </Nav>

        {props.dashboard ? (
          <div className={`${classes.btnList} ${classes.actionBtn}`}>
            <Link to={"/messages"} className={"btnNoti"}>
              <i className={"envelop"}></i>
              {count == 0 ? ' ' : <span className={classes.counter}>{count}</span>}
            </Link>
            <Notifications />
            <Dropdown align={"end"} className={classes.userDropdown}>
              <Dropdown.Toggle>
                <div className={classes.userImg}>
                  <img src={userData.profilePic?.path || avatar} alt={"img"} />
                </div>
                {userData.firstName?.length > 7 ? `${userData.firstName.slice(0, 7)}...` : userData.firstName} <i className={`fas fa-caret-down ${classes.profile_icon}`} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className={classes.header}>
                  <div className={classes.userImg}>
                    <img src={userData.profilePic?.path || avatar} alt={"img"} />
                  </div>
                  <div className={classes.name}>
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div>{userData.email}</div>
                </div>
                <Dropdown.Item href="/profile-setting" className={"text-blue"}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="" onClick={logoutUser} className={"text-danger"}>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          user ? <>
            <div className={classes.btnList}>
              <Link to={"#"} onClick={logoutUser} className={"btn btn-secondary fw-bold"}>
                Logout
              </Link>
            </div>
          </> : <>
            <div className={classes.btnList}>
              <Link to={"/login"} className={"btn btn-link text-white"}>
                Login
              </Link>
              <Link to={"/signup"} className="btn btn-secondary fw-bold">
                Sign Up
              </Link>
            </div>
          </>
        )}
      </nav >
    </>
  );
};

export default Navigation;
