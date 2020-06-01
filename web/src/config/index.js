import dotenv from 'dotenv';

dotenv.config();

const config = {
    baseUrl: process.env.REACT_APP_BASE_URL,
}

export default config;