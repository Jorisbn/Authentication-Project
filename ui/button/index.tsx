type ButtonProps = React.ComponentProps<"button"> & {
    loading?: boolean;
    loadingText?: string;
};

export default function Button({ children, loading, loadingText = "Loading...", disabled, ...props }: ButtonProps) {
    return (
        <button
            className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled || loading}
            {...props}
        >
            {loading ? loadingText : children}
        </button>
    );
}
