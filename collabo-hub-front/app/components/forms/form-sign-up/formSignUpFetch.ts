import axios from "axios";
import type { IamSignupRequest, IamSignupResponse } from '@collabo-hub/shared'

export class ValidationError extends Error {
    constructor(public readonly messages: Array<string>) {
        super("Validation Error");
        this.name = "ValidationError";
    }
}

export default async function iamSignup(
    data: IamSignupRequest
): Promise<IamSignupResponse> {

    const res = await axios.post<IamSignupResponse>(
        "http://localhost:3000/iam/signup",
        data
    );

    if (!res.data.success)
        throw new ValidationError(res.data.messages);

    return res.data;
}
