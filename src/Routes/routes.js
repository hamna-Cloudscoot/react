import LandingPage from "Pages/LandingPage";
import NotFound from "Pages/NotFound/loadable";
import MainLayout from "Layout/MainLayout";
import mainLayout from "Layout/MainLayout";
import Profile from "../Pages/Profile";
import AllFounder from "../Pages/AllFounder";
import Reviews from "../Pages/Reviews";
import Login from "../Pages/Auth/Login/Login";
import AuthLayout from "../Layout/AuthLayout";
import ForgetPassword from "../Pages/Auth/Login/ForgetPassword";
import NewPassword from "../Pages/Auth/Login/NewPassword";
import SignUp from "../Pages/Auth/SignUp/signup";
import SubscriptionPayment from "../Pages/SubscriptionPayment";
import Payemnt from "../Pages/SubscriptionPayment/payemnt";
import Blogs from "../Pages/Blogs";
import BLogDetail from "../Pages/Blogs/BLogDetail";
import TermsofUse from "../Pages/TermsofUse/TermsofUse";
import TermsConditions from "../Pages/TermsConditions/TermsConditions";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import Support from "../Pages/Support/Support";
import FAQs from "../Pages/FAQs/FAQs";
import Dashboard from "../Pages/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import Request from "../Pages/Request";
import Messages from "../Pages/Messages";
import Schedules from "../Pages/Schedules";
import ProfileSetting from "../Pages/ProfileSetting";
import OpenFounderLandingPage from "Pages/OpenFounder/Pages/LandingPage";
import OpenFounderMainLayout from "Pages/OpenFounder/Layout/MainLayoutOpenAdvice";
import OpenAdviceLandingPage from "Pages/OpenAdvice/Pages/LandingPage";
import OpenAdviceMainLayout from "Pages/OpenAdvice/Layout/MainLayoutOpenAdvice";
import MeetingRoom from "Pages/MeetingRoom";

const routes = [
  {
    path: "/",
    authenticated: false,
    component: LandingPage,
    layout: mainLayout,
  },
  {
    path: "/reviews",
    authenticated: false,
    component: Reviews,
    layout: mainLayout,
  },
  {
    path: "/login",
    authenticated: false,
    component: Login,
    layout: AuthLayout,
  },
  {
    path: "/forgetpassword",
    authenticated: false,
    component: ForgetPassword,
    layout: AuthLayout,
  },
  {
    path: "/change-pass",
    authenticated: false,
    component: NewPassword,
    layout: AuthLayout,
  },
  {
    path: "/newpassword",
    authenticated: false,
    component: NewPassword,
    layout: AuthLayout,
  },
  {
    path: "/signup",
    authenticated: false,
    component: SignUp,
    layout: AuthLayout,
  },
  {
    path: "/terms-of-use",
    authenticated: false,
    component: TermsofUse,
    layout: MainLayout,
  },
  {
    path: "/terms-conditions",
    authenticated: false,
    component: TermsConditions,
    layout: MainLayout,
  },
  {
    path: "/privacy-policy",
    authenticated: false,
    component: PrivacyPolicy,
    layout: MainLayout,
  },
  {
    path: "/support",
    authenticated: false,
    component: Support,
    layout: MainLayout,
  },
  {
    path: "/faq",
    authenticated: false,
    component: FAQs,
    layout: MainLayout,
  },

  {
    path: "/profile",
    authenticated: false,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: "/All-profession",
    layout: MainLayout,
    authenticated: false,
    component: AllFounder,
    subRoutes: [
      {
        path: "/",
        authenticated: false,
        component: AllFounder,
      },
      {
        path: "/profile/:id",
        authenticated: false,
        component: Profile,
      },
    ],
  },
  {
    path: "/subscription-payment",
    authenticated: true,
    component: SubscriptionPayment,
    layout: MainLayout,
    subRoutes: [
      {
        path: "/",
        authenticated: false,
        component: SubscriptionPayment,
      },
      {
        path: "/payment",
        authenticated: false,
        component: Payemnt,
      },
    ],
  },
  {
    path: "/blogs",
    authenticated: false,
    component: Blogs,
    layout: MainLayout,
    subRoutes: [
      {
        path: "/",
        authenticated: false,
        component: Blogs,
      },
      {
        path: "/blog-detail/:id",
        authenticated: false,
        component: BLogDetail,
      },
    ],
  },
  {
    path: "/dashboard",
    authenticated: true,
    component: Dashboard,
    layout: DashboardLayout,
  },
  {
    path: "/meeting_room",
    authenticated: true,
    component: MeetingRoom,
    layout: DashboardLayout,
  },
  {
    path: "/request",
    authenticated: true,
    component: Request,
    layout: DashboardLayout,
  },
  {
    path: "/messages",
    authenticated: true,
    component: Messages,
    layout: DashboardLayout,
  },
  {
    path: "/schedules",
    authenticated: true,
    component: Schedules,
    layout: DashboardLayout,
  },
  {
    path: "/profile-setting",
    authenticated: true,
    component: ProfileSetting,
    layout: DashboardLayout,
  },
  {
    path: "/open-founder",
    component: OpenFounderLandingPage,
    layout: OpenFounderMainLayout,
  },
  {
    path: "/open-advice",
    component: OpenAdviceLandingPage,
    layout: OpenAdviceMainLayout,
  },

  { path: "*", component: NotFound, layout: MainLayout },
];

export default routes;
