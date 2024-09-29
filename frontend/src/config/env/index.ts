import { localConfig } from './local';

export type EnvConfigurationType = {
    ENV_NAME: 'production' | 'development' | 'local';
    API_URL: string;
    MAPBOX_ACCESS_KEY?: string;
};
const runConfig = () => {
    return localConfig;
};

export const envConfig = runConfig();
