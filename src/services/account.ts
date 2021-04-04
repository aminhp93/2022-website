import request from '../utils/request';
import { AccountUrls } from '../utils/api';

const AccountService = {
    postAuthToken(data: any) {
        return request({
            method: 'POST',
            url: AccountUrls.postAuthToken,
            data
        });
    },
    fetchAccount(headers: any) {
        return request({
            headers,
            method: 'GET',
            url: AccountUrls.fetchAccount,
        });
    },
    fetchAccountPortfolio(headers: any) {
        return request({
            headers,
            method: 'GET',
            url: AccountUrls.fetchAccountPortfolio,
        });
    },
    fetchAccountAssets(headers: any) {
        return request({
            headers,
            method: 'GET',
            url: AccountUrls.fetchAccountAssets,
        });
    },
    fetchAccountStocks(headers: any) {
        return request({
            headers,
            method: 'GET',
            url: AccountUrls.fetchAccountStocks,
        });
    },

};

export default AccountService;