import { Link } from "react-router";
import { ROUTES } from "../../lib/routes";


export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to={ROUTES.AUTH_CONTACTS}>Contacts</Link>
        </div>
    );
}