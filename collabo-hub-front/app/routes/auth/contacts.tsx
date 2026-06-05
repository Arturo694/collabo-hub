import { type LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import { ContactStore } from "../../components/Contacts/contactStore";
import { ContactsView } from "../../components/Contacts/Contacts";
import { contactsFindAll } from "../../lib/api";
import { ROUTES } from "../../lib/routes";

const store = new ContactStore()

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("Cookie");
    if (cookie == null) throw new Error();

    try {
        const { contacts } = await contactsFindAll(cookie);
        store.init(contacts)
        return contacts;
    } catch (error) {
        return redirect(ROUTES.SIGNIN);
    }
}

export default function Contacts() {
    useLoaderData<typeof loader>();
    return <ContactsView store={store} />;
}
