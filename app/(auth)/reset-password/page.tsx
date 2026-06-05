import { ChangePasswordForm } from "@/features/authentication/components/ChangePasswordForm";

export default function ResetPassword() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <ChangePasswordForm />
        </div>
    );
}
