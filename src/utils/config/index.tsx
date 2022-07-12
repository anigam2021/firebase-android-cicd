const API_DEV_HOST = 'https://api.acc.eatch.me';
const API_PRO_HOST = 'https://api.acc.eatch.me';

const Config = {
    // 0 => Devlopment env,1 ===> Production
    // APP_MODE : APP_MODE,
    APP_MODE: 1,
    DEVELOPMENT: {
        API_HOST: `${API_DEV_HOST}`,
        API_ACCESS_POINT: `${API_DEV_HOST}`,
    },
    PRODUCTION: {
        API_HOST: `${API_PRO_HOST}`,
        API_ACCESS_POINT: `${API_PRO_HOST}`,
    },
};

export default function getBaseUrl() {
    let config = {
        apihost: '',
        accesspoint: '',
    };
    // App mode==0 for dev

    if (Config.APP_MODE === 0) {
        config = {
            ...config,
            apihost: Config.DEVELOPMENT.API_HOST,
            accesspoint: Config.DEVELOPMENT.API_ACCESS_POINT,
        };
    }
    else if (Config.APP_MODE === 1) {
        config = {
            ...config,
            apihost: Config.PRODUCTION.API_HOST,
            accesspoint: Config.PRODUCTION.API_ACCESS_POINT,
        };
    }

    return config;
}
