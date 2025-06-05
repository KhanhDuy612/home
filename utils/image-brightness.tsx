
export async function getImagKeBrightness(imageUrl: string): Promise<{color: string, backgroundColor: string}> {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Important if image is from a different origin
        img.src = imageUrl;

        img.onload = () => {
            // Create a canvas to analyze the image
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                let r = 0, g = 0, b = 0;
                let count = 0;

                for (let i = 0; i < imageData.length; i += 4) {
                    r += imageData[i];
                    g += imageData[i + 1];
                    b += imageData[i + 2];
                    count++;
                }

                r /= count;
                g /= count;
                b /= count;

                const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                const textColor = brightness > 186 ? 'black' : 'white';
                
                resolve({ color: textColor, backgroundColor: brightness > 186 ? 'white' : 'transparent' });
            }
        };
    });
}
