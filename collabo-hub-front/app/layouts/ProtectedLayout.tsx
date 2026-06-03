import { Outlet } from "react-router";

export default function ProtectedLayout() {

    console.log('hola');


    return (
        <main>
            <Outlet />
        </main>
    );
}