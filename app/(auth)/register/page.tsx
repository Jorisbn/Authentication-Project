import { RegisterForm } from "@/features/authentication/components/RegisterForm";

export default function Register() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <RegisterForm />
        </div>
    );
}
