import React from "react";
import { Input, Tooltip } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { keyBy } from 'lodash';

import { formatNumber, DATE_FORMAT } from "../utils/common";

interface IProps {

}

interface IState {
    buyDate: string;
    sellDate: string;
    listData: any;
}

class Sell extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            buyDate: "2021-05-11T00:00:00",
            sellDate: "2021-05-14T00:00:00",
            listData: []
        }
    }

    async componentDidMount() {
        const res1 = await this.getPriceStock('DGW')
        const res2 = await this.getPriceStock('DGW', 20)
        if (res1.data && res2.data) {
            const res = res1.data.concat(res2.data);
            
            this.setState({
                listData: res
            })
        }
        
        
    }

    getPriceStock = (symbol: string, offset=0) => {
        if (!symbol) return;
        let startCount = -30;
        let endCount = 0;
        if (moment().format('ddd') === "Sat") {
            // startCount = -2
            endCount = -1
        } else if (moment().format("ddd") === "Sun") {
            // startCount = -3
            endCount = -2
        } else if (moment().format("ddd") === "Mon") {
            // startCount = -3
            endCount = 0
        }
        // startCount = -5
        // endCount = 0
        const startDate = moment().add(startCount, 'days').format(DATE_FORMAT)
        const endDate = moment().add(endCount, 'days').format(DATE_FORMAT)
        
        return axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            },
            url: `https://restv2.fireant.vn/symbols/${symbol}/historical-quotes?startDate=${startDate}&endDate=${endDate}&offset=${offset}&limit=20`,
        }).then((res: any) => {
            return res
        }).catch((e: any) => {
            console.log(e)
        })
    }

    getLowestFromBuy = () => {
        const { listData, buyDate, sellDate } = this.state;
        const listDataObj = keyBy(listData, "date")
        const buyData = listDataObj[buyDate]
        const buyClose = buyData && buyData.priceClose

        let result = buyClose;
        let date = buyDate
        const filterList = listData.filter((i: any) => i.date > buyDate && i.date <= sellDate)
        filterList.map((i: any) => {
            if (i.priceLow < result) {
                result = i.priceLow
                date = i.date
            }
        })
        return {
            price: result,
            date
        }
    }

    render() {
        const { listData, buyDate, sellDate } = this.state;
        const listDataObj = keyBy(listData, "date")
        const buyData = listDataObj[buyDate]
        const buyClose = buyData && buyData.priceClose
        const lowestFromBuy = this.getLowestFromBuy()
        const percentLowestFromBuy = lowestFromBuy && Number(((lowestFromBuy.price - buyClose) * 100 / buyClose).toFixed(1))
        console.log(lowestFromBuy)
        return <div>
            <Input placeholder="Symbol" onPressEnter={() => {}}/>
            <div>
                <div>
                    <div>{`% gia hien tai`}</div>
                    <div>{`% KL hien tai (so vs trung binh 15 phien)`}</div>
                </div>
                <div>
                    <Tooltip title={`Thoi gian da mua: Neu gia (va gia thap nhat) khong giam > 3% tu diem cao nhat ngay mua trong vong 5 ngay, khong ban`}>
                        <div className="flex sp-bt">
                            <div>{`Check lowest price`}</div>
                            <div style={{ width: "200px", textAlign: "right" }} className={`${percentLowestFromBuy < -3 ? 'red' : 'green'}`}>{percentLowestFromBuy}</div>
                        </div>
                    </Tooltip>
                    
                    
                </div>
            </div>
        </div>
    }
}

export default Sell
