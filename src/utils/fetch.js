import {isImmutable} from "immutable";

import globalConfig from './global';
import configApi from '../config/api';

/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 */
const get = (url, options = {}) => {
    return new Promise((resolve, reject) => {
            let baseURL = configApi.API_ENDPOINT + '/wp-json' + url;

            const isWC = url.indexOf('/wc') === 0;
            const isQuery = url.indexOf('?') >= 0;
            const isAuth = url.indexOf('/rnlab-app-control') === 0 || url.indexOf('/dokan') === 0;

            if (isWC) {
                baseURL = `${baseURL}${isQuery ? '&' : '?'}consumer_key=${configApi.CONSUMER_KEY}&consumer_secret=${configApi.CONSUMER_SECRET}`;
            }

            fetch(baseURL, {
                ...options,
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: isAuth && globalConfig.getToken() ? `Bearer ${globalConfig.getToken()}` : undefined,
                },
            })
                .then((res) => res.json())
                .then(data => {
                    if (data.code) {
                        reject(new Error(data.message));
                    } else {
                        resolve(data);
                    }
                })
                .catch((error) => {
                    return error;
                });
        },
    );

};

/**
 * Post method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */
const post = (url, data, method = 'POST') => {
    return new Promise((resolve, reject) => {

        // To JS Object
        if (isImmutable(data)) {
            data = data.toJS();
        }

        let baseURL = configApi.API_ENDPOINT + '/wp-json' + url;

        const isWC = url.indexOf('/wc') === 0;
        const isDigits = url.indexOf('/digits') === 0;
        const isQuery = url.indexOf('?') >= 0;
        const isAuth = url.indexOf('/rnlab-app-control') === 0 || url.indexOf('/dokan') === 0;

        if (isWC || isDigits) {
            baseURL = `${baseURL}${isQuery ? '&' : '?'}consumer_key=${configApi.CONSUMER_KEY}&consumer_secret=${configApi.CONSUMER_SECRET}`;
        }

        fetch(baseURL, {
            method: method,
            headers: {
                Accept: 'application/json',
                Authorization: isAuth && globalConfig.getToken() ? `Bearer ${globalConfig.getToken()}` : null,
                'Content-Type': isDigits ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json',
            },
            body: isDigits ? data : typeof data === 'object' ? JSON.stringify(data) : null,
        })
            .then((res) => res.json())
            .then(data => {
                if (data.code) {
                    if (isDigits && (data.code === "1" || data.code === 1)) {
                        resolve(data);
                    } else {
                        reject(new Error(data.message));
                    }
                } else {
                    resolve(data);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });

};

export default request = {
    get,
    post,
    put: (url, data) => post(url, data, 'PUT'),
};

