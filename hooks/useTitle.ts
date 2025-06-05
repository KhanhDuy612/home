export const useTitle = () => {
    const setTitle = async (title?: string) => {
        try {
            setTimeout(() => {
                document.title = title || "";
            }, 200);
        } catch (error) {
            console.error('Error setting favicon:', error);
        }
    };

    const setFavicon = async (fav: string) => {
        const faviconUrl = fav || "";
        if (faviconUrl) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
                link.href = faviconUrl;
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = faviconUrl;
                document.head.appendChild(newLink);
            }
        }
    };

    return { setTitle, setFavicon };
}
