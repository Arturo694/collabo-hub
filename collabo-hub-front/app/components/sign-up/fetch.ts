import axios from "axios";
import type { CreateUserRequest, CreateUserResponse } from '@collabo-hub/shared'

export default async function createUser(
    data: CreateUserRequest
): Promise<CreateUserResponse> {
    const res = await axios.post<CreateUserResponse>(
        "http://localhost:3000/api/auth/sign-up",
        data
    );

    return res.data;
}