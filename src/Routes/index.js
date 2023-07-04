import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ElementControl from "Components/ElementControl";
import routes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionPayment from "../Pages/SubscriptionPayment";
import mainLayout from "Layout/MainLayout";
import UserAPIs from 'APIs/user'
import { setPaymentVerifiedStore } from "redux/reducers/paymentVerified";

const ClientRoutes = () => {

  const [paymentVerified, setPaymentVerified] = useState();
  const { accessToken } = useSelector((state) => state.auth);
  const { isVerified } = useSelector((state) => state.paymentVerified);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setPaymentVerified(isVerified);
  }, [isVerified])

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
          setPaymentVerified(true);
          dispatch(
            setPaymentVerifiedStore({
              isVerified: true
            })
          )
        }
      }
    }
  }

  const getElementControl = (path, authenticated, component, layout) => {
    if (!authenticated) {
      if (accessToken) {
        if (
          path === '/forgetpassword' ||
          path === '/change-pass' ||
          path === '/newpassword'
        ) {
          return <Navigate to="/dashboard" />
        }
      }
      return <ElementControl Component={component} Layout={layout} />;
    }
    if (authenticated) {
      if (path === '/dashboard') {
        getUpdatedUser();
      }
      if (accessToken && paymentVerified == false) {
        // Payment Routes secured
        return <ElementControl Component={SubscriptionPayment} Layout={mainLayout} />;
      }
      if (accessToken) {
        return <ElementControl Component={component} Layout={layout} />;
      } else {
        return <Navigate to="/login" />;
      }
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const { path, subRoutes, component, layout, authenticated } = route;
          if (subRoutes && subRoutes.length > 0) {
            return (
              <Route key={`route_${index}`}>
                {subRoutes.map((subRoute, subIndex) => {
                  return (
                    <Route
                      key={`subroute_${subIndex}`}
                      exact
                      path={`${route.path}${subRoute.path}`}
                      element={getElementControl(path, authenticated, subRoute.component, layout)}
                    />
                  );
                })}
              </Route>
            );
          }
          return (
            <Route
              key={`route_${index}`}
              exact
              path={path}
              element={getElementControl(path, authenticated, component, layout)}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default ClientRoutes;
