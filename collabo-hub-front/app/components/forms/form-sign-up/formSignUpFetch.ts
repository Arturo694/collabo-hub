import axios from "axios";
import type { IamSignUpRequest, IamSignUpResponse } from '@collabo-hub/shared'

export class ValidationIamSignUp extends Error {
    constructor(public readonly messages: Array<string>) {
        super("Validation Error");
        this.name = "ValidationIamSignUp";
    }
}

export default async function iamSignUp(
    data: IamSignUpRequest
): Promise<IamSignUpResponse> {

    const res = await axios.post<IamSignUpResponse>(
        "http://localhost:3000/iam/signup",
        data
    );

    if (!res.data.success)
        throw new ValidationIamSignUp(res.data.messages);

    return res.data;
}
