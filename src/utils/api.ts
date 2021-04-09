import moment from 'moment';

const today = moment().format("YYYY-MM-DD");
const lastMonth = moment().add("-1", "months").format("YYYY-MM-DD")

const baseUrl = "http://localhost:8001" 

export const AccountUrls = {
    postAuthToken: 'https://auth-api.vndirect.com.vn/v3/auth',
    fetchAccount: 'https://trade-api.vndirect.com.vn/accounts/0001069456',
    fetchAccountPortfolio: 'https://trade-api.vndirect.com.vn/accounts/v3/0001069456/portfolio',
    fetchAccountAssets: 'https://trade-api.vndirect.com.vn/accounts/v2/0001069456/assets',
    fetchAccountStocks: 'https://trade-api.vndirect.com.vn/accounts/v3/0001069456/stocks',
    fetchOrdersHistory: `https://trade-report-api.vndirect.com.vn/accounts/0001069456/orders_history/?fromDate=${lastMonth}&toDate=${today}&pageSize=1000`
}

export const StockUrls = {
    list: `${baseUrl}/api/stock/`,
    retrieve: (id: number) => `${baseUrl}/api/stock/${id}`,
    create: `${baseUrl}/api/stock/`,
    update: (id: number) => `${baseUrl}/api/stock/${id}`,
    delete: (id: number) => `${baseUrl}/api/stock/${id}`,
}
