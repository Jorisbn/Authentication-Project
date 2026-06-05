import { PasswordResetForm } from "@/features/authentication/components/PasswordResetForm";

export default function ForgotPassword() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <PasswordResetForm />
        </div>
    );
}
