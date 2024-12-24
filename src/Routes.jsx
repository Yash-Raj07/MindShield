import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import Slok from "./components/slok.jsx";
import EditProfile from "./pages/EditProfile.jsx";

// Lazy load the components
const Layout = lazy(() => import('./Layout.jsx'));
const RegisterForm = lazy(() => import("./components/Register.jsx"));
const Contact = lazy(() => import("./pages/SOSAlerts/Contact/contact.jsx"));
const SendAlerts = lazy(() => import("./pages/SOSAlerts/SendAlerts/sendAlerts.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Journal = lazy(() => import("./pages/Journal/Journal.jsx"));
const SingleJournal = lazy(() => import("./pages/Journal/SingleJournal.jsx"));
const App = lazy(() => import('./App.jsx'));
const ErrorPage = lazy(() => import('./components/ErrorPage.jsx'));
const Login = lazy(() => import("./components/Login.jsx"));
const ForgotPassword = lazy(() => import("./components/forgotPassword.jsx"));
const ResetPassword = lazy(() => import("./components/resetPassword.jsx"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sos-alert" element={<SendAlerts />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path={"/edit-profile"} element={<EditProfile />} />
            <Route path="/journals" element={<Journal />} />
            <Route path="/journal/:journalId" element={<SingleJournal />} /> {/* Dynamic route for single journal */}
            <Route path="/shlok/:shlokId" element={<Slok />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />

        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Suspense fallback={<div className="loading"><img src="/loading.svg" alt="loading..." /></div>}>
        <RouterProvider router={router} />
    </Suspense>
);
