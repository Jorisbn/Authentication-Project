export type Verify2FAUser = {
    transId: string;
    code: number;
};

export type ChangePasswordUser = {
    resetToken: string;
    password: string;
};

export type AuthStep = "LOGIN" | "VERIFY_2FA" | "SETUP_2FA";
