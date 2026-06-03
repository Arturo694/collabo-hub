import { Link } from "react-router";
import { ROUTES } from "../../lib/routes";


export default function Contacts() {
    return (
        <div>
            <h1>Contacts</h1>
            <Link to={ROUTES.AUTH_DASHBOARD}>Dashboard</Link>
        </div>
    );
}