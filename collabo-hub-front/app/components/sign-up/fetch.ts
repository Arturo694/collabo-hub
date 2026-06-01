import axios from "axios";
import { type SignUpData } from './validation'



export default async function registerUser(data: SignUpData) {
    const response = await axios.post(
        "http://localhost:3000/api/auth/sign-up",
        data
    );
}