/**
 * this file is to keep track of environment variables that can go outside of a .env file
 */
export const environment = {
    /**
     * the root url of app
     */
    location: !import.meta.env.DEV ? 
        'https://carepollo.github.io/portfolio/' : 
        'http://127.0.0.1:5173/',
}
