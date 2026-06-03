import axios from "axios";
import type { IamSignInRequest, IamSignInResponse } from '@collabo-hub/shared';

export default async function iamSignIn(
    data: IamSignInRequest
): Promise<IamSignInResponse> {
    const res = await axios.post<IamSignInResponse>(
        "http://localhost:3000/iam/signin",
        data
    )

    if (!res.data.success) throw new Error("Invalid credentials");

    return res.data;
}