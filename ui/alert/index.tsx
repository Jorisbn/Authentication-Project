type AlertVariant = "error" | "success" | "warning" | "info";

interface AlertProps {
    variant?: AlertVariant;
    children: React.ReactNode;
}

const variants = {
    error: "bg-red-100 text-red-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-600",
};

export default function Alert({ variant = "info", children }: AlertProps) {
    return (
        <div
            className={`rounded-md px-4 py-2 text-sm ${variants[variant]}`}
            role="alert"
        >
            {children}
        </div>
    );
}
