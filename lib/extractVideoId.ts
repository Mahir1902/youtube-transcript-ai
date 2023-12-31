

export function extractVideoID(url:string) {
    try {
        const params = new URLSearchParams(new URL(url).search);
        return params.get('v');
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}