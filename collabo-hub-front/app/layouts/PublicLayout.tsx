import { Outlet, Link } from "react-router";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
    return (
        <main>
            <PublicNavbar />
            <Outlet />
            <Footer />
        </main>
    );
}