import axios from "axios";
import type { IamSignupRequest, IamSignupResponse } from '@collabo-hub/shared'

export default async function iamSignup(
    data: IamSignupRequest
): Promise<IamSignupResponse> {
    const res = await axios.post<IamSignupResponse>(
        "http://localhost:3000/api/iam/signup",
        data
    );

    return res.data;
}