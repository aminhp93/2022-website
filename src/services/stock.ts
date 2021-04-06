import request from '../utils/request';
import { StockUrls } from '../utils/api';

const StockService = {
    listStock() {
        return request({            
            method: 'GET',
            url: StockUrls.list,
        });
    },
    retrieveStock(id: number) {
        return request({
            method: 'GET',
            url: StockUrls.retrieve(id),
        });
    },
    createStock(data: any) {
        return request({
            data,
            method: 'POST',
            url: StockUrls.create,
        });
    },
    updateStock(id: number, data: any) {
        return request({
            data,
            method: 'POST',
            url: StockUrls.update(id),
        });
    },
    deleteStock(id: number) {
        return request({
            method: 'POST',
            url: StockUrls.delete(id),
        });
    },

};

export default StockService;
