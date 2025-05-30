export const config = {
    NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',
    SERVER_URL: import.meta.env.VITE_API_URL,
    ANONYMIZE_URL: import.meta.env.VITE_ANONYMIZE_URL,
    IA_SERVICE_URL: import.meta.env.VITE_IA_SERVICE_URL
}