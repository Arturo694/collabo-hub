import axios from "axios";
import type { IamSignInRequest, IamSignInResponse } from '@collabo-hub/shared';

export class ValidationIamSignIn extends Error {
    constructor(public readonly tokenError: string) {
        super(tokenError);
        this.name = "ValidationIamSignIn";
    }
}

export default async function iamSignIn(
    data: IamSignInRequest
): Promise<IamSignInResponse> {
    const res = await axios.post<IamSignInResponse>(
        "http://localhost:3000/iam/signin",
        data
    )

    if (!res.data.success) throw new ValidationIamSignIn(res.data.token);

    return res.data;
}