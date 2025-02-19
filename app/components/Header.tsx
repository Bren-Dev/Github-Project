export default function Header() {
    return (
        <header className="bg-gray-900 text-white py-4 px-6 flex items-center">
            <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.23-.01-.84-.01-1.65-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.63.07-.62.07-.62 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.8c.85 0 1.71.11 2.5.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.83-2.34 4.68-4.57 4.92.36.31.68.91.68 1.83 0 1.32-.01 2.39-.01 2.72 0 .27.16.58.67.48A10.004 10.004 0 0022 12c0-5.52-4.48-10-10-10z"
                />
            </svg>
            <span className="ml-2 text-gray-300">GitHub</span>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-gray-400">Profile</span>
        </header>
    );
}
