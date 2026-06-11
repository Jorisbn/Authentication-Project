import { ChangePasswordForm } from "@/features/authentication/components/ChangePasswordForm";
import { Suspense } from "react";

export default function ResetPassword() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <Suspense>
                <ChangePasswordForm />
            </Suspense>
        </div>
    );
}
