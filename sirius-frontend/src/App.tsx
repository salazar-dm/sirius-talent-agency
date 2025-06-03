import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import Registration from './pages/Registration/Registration.tsx';
import VerificationRequest from './pages/VerificationRequest/VerificationRequest.tsx';
import Footer from "./components/Footer/Footer.tsx";
import "./App.css";
import VerificationResponse from "./pages/VerificationResponse/VerificationResponse.tsx";
import AdminGetAllPerformers from "./pages/Admin/GetAllPerformers/GetAllPerformers.tsx";
import Performer from "./pages/Performer/Home/Performer.tsx";
import Commissions from "./pages/Performer/Commissions/Commissions.tsx";
import Emergency from "./pages/Performer/Emergency/Emergency.tsx";
import Support from "./pages/Performer/Support/Support.tsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UpdateProfile from "./pages/Performer/Home/UpdateProfile/UpdateProfile.tsx";
import {jwtDecode} from "jwt-decode";
import Header from "./components/Header/Header.tsx";
import OldCastingHome from "./pages/OldCastingHome.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import OldCastingCreate from "./pages/OldCastingCreate.tsx";
import OldCastingProductionDay from "./pages/OldCastingProductionDay.tsx";
import {ContactUs} from "./pages/ContactUs.tsx";
import {AboutUs} from "./pages/AboutUs.tsx";
import { LoadingProvider } from "./context/LoadingContext";
import {BasicDocuments} from "./pages/Information/Actors/BasicDocuments.tsx";
import {AgencyRequiredAndRulesBeforeSet} from "./pages/Information/Actors/AgencyRequiredAndRulesBeforeSet.tsx";
import {OnSetRulesAndTips} from "./pages/Information/Actors/OnSetRulesAndTips.tsx";
import {VoucherCommissionAndPayment} from "./pages/Information/Actors/VoucherCommissionAndPayment.tsx";
import {Minors} from "./pages/Information/Actors/Minors.tsx";
import {
    NonUnionAABPActraApprenticeActraFullExplanation
} from "./pages/Information/Actors/NonUnionAABPActraApprenticeActraFullExplanation.tsx";
import {Test} from "./templates/Test/Test.tsx";
import {TestPage} from "./pages/TestPage.tsx";
import {Terms101} from "./pages/Information/Actors/Terms101.tsx";
import {QuickGuide} from "./pages/Information/Actors/QuickGuide.tsx";
import { usePageTitle } from './hooks/usePageTitle.ts';
import {PageTitleHandler} from "./utils/PageTitleHandler.tsx";
import {AdminHomepage} from "./pages/AdminHomepage.tsx";
import AdminUser from "./pages/AdminUser.tsx";
import AdminUpdateUser from "./pages/AdminUpdateUser.tsx";
import AdminUserCreate from "./pages/AdminUserCreate.tsx";
import {ProjectCreate} from "./pages/Project/ProjectCreate.tsx";
import {Project} from "./pages/Project/Project.tsx";
import ProjectAll from "./pages/Project/ProjectAll.tsx";
import {ProjectNewDays} from "./pages/Project/ProjectNewDays.tsx";
import ProjectDay from "./pages/Project/ProjectDay.tsx";
import {AdminProjects} from "./pages/AdminProjects.tsx";
import {TokenJwtPayload} from "./components/LoginForm/LoginForm.tsx";
import {adminNavigation} from "./templates/adminNavigation.ts";
import {AdminNavigation} from "./components/AdminNavigation/AdminNavigation.tsx";
import {AdminSendEmailToUser} from "./pages/AdminSendEmailToUser.tsx";

const stripePromise = loadStripe("pk_test_51QIxe6IxjNMd7TsUlPkempTxyhiwUjYk87cSKNGs0QKjzEMzhhDYPLkfnyFhFIYE8HHBgmVrZaT0WGw22ptXApKa00u0XaCa1Z");

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [decodedToken, setDecodedToken] = useState<TokenJwtPayload | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (window.location.pathname.toLowerCase().startsWith("/performer") && !checkAuthentication()) {
            localStorage.setItem("redirectUrl", window.location.pathname);
            window.location.href = "/login";
            return;
        }

        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (token) {
            setDecodedToken(jwtDecode(token));
        }
    }, [token]);

    return (
        <LoadingProvider>

            <QueryClientProvider client={queryClient}>
                <Router>
                    <Header isDesktop={isDesktop} />
                    <PageTitleHandler/>

                    <main>
                        <Elements stripe={stripePromise}>
                            {decodedToken && decodedToken.role === "Admin" && <AdminNavigation navigation={adminNavigation} />}
                            <Routes>
                                <Route path="/" element={<Home isDesktop={isDesktop} />} />
                                <Route path="/verification" element={<VerificationRequest />} />
                                <Route path="/verify" element={<VerificationResponse />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/registration" element={<Registration />} />
                                <Route path="/contact" element={<ContactUs />} />
                                <Route path="/about-us" element={<AboutUs />} />

                                <Route path="/performer" element={<Performer />} />
                                <Route path="/performer/update-profile" element={<UpdateProfile />} />
                                <Route path="/performer/commissions" element={<Commissions />} />
                                <Route path="/performer/emergency" element={<Emergency />} />
                                <Route path="/performer/support" element={<Support />} />
                                <Route path="/performer/test" element={<TestPage/>} />
                                <Route path="/old-casting" element={<OldCastingHome />} />
                                <Route path="/old-casting/create" element={<OldCastingCreate />} />
                                <Route path="/old-casting/production-days/:id" element={<OldCastingProductionDay />} />

                                <Route path="/information/actors/basic-documents" element={<BasicDocuments />} />
                                <Route path="/information/actors/non-union-aabp-actra-apprentice-actra-full-explanation" element={<NonUnionAABPActraApprenticeActraFullExplanation />} />
                                <Route path="/information/actors/agency-required-and-rules-before-set" element={<AgencyRequiredAndRulesBeforeSet />} />
                                <Route path="/information/actors/on-set-rules-and-tips" element={<OnSetRulesAndTips     />} />
                                <Route path="/information/actors/voucher-commission-and-payment" element={<VoucherCommissionAndPayment />} />
                                <Route path="/information/actors/minors" element={<Minors />} />
                                <Route path="/information/actors/terms-101" element={<Terms101 />} />
                                <Route path="/information/actors/quick-guide" element={<QuickGuide />} />


                                <Route path="/admin/performers" element={<AdminGetAllPerformers />} />
                                <Route path="/admin" element={<AdminHomepage />} />
                                <Route path="/admin/user/:id" element={<AdminUser />} />
                                <Route path="/admin/user-update/:id" element={<AdminUpdateUser />} />
                                <Route path="/admin/user-create" element={<AdminUserCreate />} />
                                <Route path="/admin/projects" element={<AdminProjects />} />
                                <Route path="/admin/user/email-to/:id" element={<AdminSendEmailToUser />} />

                                <Route path="/project/create/:castingId" element={<ProjectCreate />} />
                                <Route path="/project/:id" element={<Project />} />
                                <Route path="/project/all" element={<ProjectAll />} />
                                <Route path="/project/:id/day/:dayId" element={<ProjectDay />} />

                                <Route path="/project/:id/new-days" element={<ProjectNewDays />} />
                            </Routes>
                        </Elements>
                    </main>
                    <Footer />
                </Router>
            </QueryClientProvider>
        </LoadingProvider>
    );
};

function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp > currentTime : false;
}

export default App;
