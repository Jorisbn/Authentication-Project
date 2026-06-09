type InputProps = React.ComponentProps<"input">;

export default function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={`w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${className ?? ""}`}
            {...props}
        />
    );
}
