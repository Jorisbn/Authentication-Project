import { LogoutForm } from "@/features/authentication/components/LogoutForm";

export default function Dashboard() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex items-center justify-center bg-zinc-100 p-8">
                <LogoutForm />
            </div>
        </div>
    );
}
