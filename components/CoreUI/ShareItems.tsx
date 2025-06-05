type ShareItemsProps = {
    url: string;
    title: string;
    description: string;
    media: string;
}

export default function ShareItems({ url, title, description, media }: ShareItemsProps) {
    return (
        <>
            <a
                href={`https://www.facebook.com/sharer.php?u=${url}`}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
            >
                <span className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Facebook
                </span>
            </a>
            <a
                href={`https://x.com/share?url=${url}`}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
            >
                <span className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X
                </span>
            </a>
            <a
                href={`https://www.pinterest.com/pin/create/button/?url=${url}&amp;media=${media}&amp;description=${description}`}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
            >
                <span className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.878-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                    </svg>
                    Pinterest
                </span>
            </a>
            <a
                href={`https://www.tumblr.com/share/link?url=${url}`}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
            >
                <span className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" />
                    </svg>
                    Tumblr
                </span>
            </a>
            <a
                href={`mailto:?subject=${title}&amp;body=${url}`}
                target="_blank"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
            >
                <span className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    Email
                </span>
            </a>
        </>
    );
}