import { type LoaderFunctionArgs, redirect, useLoaderData, type MetaFunction } from "react-router";
import { ContactStore } from "~/components/Contacts/contactStore";
import { ContactsView } from "~/components/Contacts/Contacts";
import { contactsFindAll } from "~/lib/api";
import { ROUTES } from "~/lib/routes";

export const meta: MetaFunction = () => {
    return [
        { title: "Contacts | Collabo-Hub" },
        { name: "description", content: "Manage your contacts and stay connected with your team." },
    ];
};

const store = new ContactStore()

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get("Cookie");
    if (cookie == null) throw new Error();

    try {
        const { contacts } = await contactsFindAll(cookie);
        return contacts;
    } catch (error) {
        return redirect(ROUTES.SIGNIN);
    }
}

export default function Contacts() {
    const data = useLoaderData<typeof loader>();
    store.init(data);
    return <ContactsView store={store} />;
}
