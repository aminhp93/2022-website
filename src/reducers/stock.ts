

import { createSlice } from '@reduxjs/toolkit';

import { ThunkActionType } from '../store';
import StockService from '../services/stock';

const stockSlice = createSlice({
    name: 'stock',
    initialState: {},
    reducers: {},
});

// export const {} = accountSlice.actions;

export default stockSlice.reducer;

export const listStock = (): ThunkActionType => async () => {
    const res = await StockService.listStock()
    return res
}

export const createStock = (data: any): ThunkActionType => async () => {
    const res = await StockService.createStock(data)
    return res
}
