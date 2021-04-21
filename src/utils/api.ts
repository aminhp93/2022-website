import moment from 'moment';
import { formatNumber, DATE_FORMAT } from "../utils/common";


const today = moment().format(DATE_FORMAT);
const lastMonth = moment().add("-1", "months").format(DATE_FORMAT)

const baseUrl = "http://localhost:8001" 

export const AccountUrls = {
    postAuthToken: 'https://auth-api.vndirect.com.vn/v3/auth',
    fetchAccount: 'https://trade-api.vndirect.com.vn/accounts/0001069456',
    fetchAccountPortfolio: 'https://trade-api.vndirect.com.vn/accounts/v3/0001069456/portfolio',
    fetchAccountAssets: 'https://trade-api.vndirect.com.vn/accounts/v2/0001069456/assets',
    fetchAccountStocks: 'https://trade-api.vndirect.com.vn/accounts/v3/0001069456/stocks',
    fetchOrdersHistory: `https://trade-report-api.vndirect.com.vn/accounts/0001069456/orders_history/?fromDate=${lastMonth}&toDate=${today}&pageSize=1000`,
    fetchCashStatement: (index: number) => `https://trade-report-api.vndirect.com.vn/accounts/0001069456/cashStatement?fromDate=2017-01-01&index=${index}&offset=50&types=`
}

export const StockUrls = {
    list: `${baseUrl}/api/stock/`,
    retrieve: (id: number) => `${baseUrl}/api/stock/${id}`,
    create: `${baseUrl}/api/stock/`,
    update: (id: number) => `${baseUrl}/api/stock/${id}`,
    delete: (id: number) => `${baseUrl}/api/stock/${id}`,
}
