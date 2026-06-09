interface FieldProps {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
}

export default function Field({ label, htmlFor, children }: FieldProps) {
    return (
        <div className="flex flex-col gap-2 text-zinc-700">
            <label
                htmlFor={htmlFor}
                className="text-sm font-medium"
            >
                {label}
            </label>

            {children}
        </div>
    );
}
