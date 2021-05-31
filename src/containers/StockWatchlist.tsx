import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table, Tooltip, Button } from 'antd';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { formatNumber, DATE_FORMAT } from "../utils/common";
import { get } from 'lodash';

interface IProps {

}

interface IState {
    listData: any;
    showAll: boolean;
}

const TIMEOUT_TIME = 1000 * 60
class StockWatchlist extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            listData: [],
            showAll: true,
        }
    }
    componentDidMount() {
        this.getWatchlist()
        setInterval(() => {
            this.getWatchlist()
        }, TIMEOUT_TIME)
    }

    getWatchlist = () => {
        axios({
            method: "GET",
            url: "https://restv2.fireant.vn/me/watchlists",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            }
        }).then(res => {
            if (res.data) {
                const listData: any = []
                res.data.map((i: any) => {
                    if (i.name !== 'thanh_khoan_lon') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        
                        Promise.all(listPromises).then((j: any) => {
                            
                            const item: any = {}
                            item.name = i.name
                            item.watchlistID = i.watchlistID
                            item.value = j.sort((a: any, b: any) => b.percentChange - a.percentChange) 
                            listData.push(item)
                            
                            this.setState({
                                listData
                            })
                        })
                    }
                })
            }
            
        }).catch(e => {
            console.log(e)
        })
    }

    getPriceStock = (symbol: string) => {
        if (!symbol) return;
        let startCount = -1;
        let endCount = 0;
        if (moment().format('ddd') === "Sat") {
            startCount = -2
            endCount = -1
        } else if (moment().format("ddd") === "Sun") {
            startCount = -3
            endCount = -2
        } else if (moment().format("ddd") === "Mon") {
            startCount = -3
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
            url: `https://restv2.fireant.vn/symbols/${symbol}/historical-quotes?startDate=${startDate}&endDate=${endDate}&offset=0&limit=20`,
        }).then((res: any) => {
            let percentChange = 0;
            percentChange = Number((((res.data[0].priceClose - res.data[1].priceClose) / res.data[1].priceClose)*100).toFixed(2))
            return { symbol, percentChange }
        }).catch((e: any) => {
            console.log(e)
        })
    }

    render() {
        const { listData, showAll } = this.state;
          
        const columns = [
            {
              title: 'symbol',
              dataIndex: 'symbol',
              key: 'symbol',
            },
            {
              title: 'percentChange',
              dataIndex: 'percentChange',
              key: 'percentChange',
              render: (data: any) => {
                let className = 'red';
                if (data > 0) {
                    className = 'green'
                }
                return <span className={className}>{data}</span>
              }
            },
        ];
        
        const columns2 = [
            {
              title: 'percentChange',
              render: (data: any) => {
                  console.log(data)
                let className = 'red';
                const percentChange = get(data, 'percentChange')
                if (percentChange > 0) {
                    className = 'green'
                }
                
                return <Tooltip title={data.symbol}>
                    <span className={className}>{percentChange}</span>
                </Tooltip>
                
              }
            },
        ];
        
        return <div style={{  height: "100%" }}>
                <div style={{ height: "50%", overflow: "auto" }} className="flex">
                    {
                        listData.filter((i: any) => ['da_mua', 'watching', 'aim_to_buy', 'vn30'].includes(i.name) && i.value && i.value.length > 0).map((i: any, index: number) => {
                            return <div style={{ borderTop: '1px solid black', marginRight: "10px" }}>
                                <div style={{  }}>{i.name}</div>
                                <div>
                                    <Table pagination={false} size="small" dataSource={i.value} columns={columns} showHeader={false}/>
                                </div>
                            </div>
                        })
                    }
                </div>
             
                <div style={{ height: "50%", overflow: "auto"}} className="flex">
                    <Button onClick={() => this.setState({ showAll: !showAll})}>
                        {showAll ? 'Hide' : 'Show'}
                    </Button>
                    {
                        listData.filter((i: any) => !['da_mua', 'watching', 'aim_to_buy', 'vn30'].includes(i.name) && i.value && i.value.length > 0).map((i: any, index: number) => {
                            const dataSource2 = showAll ? i.value : i.value.filter((j: any) => j.percentChange > 0)
                            if (!dataSource2 || (dataSource2 && dataSource2.length === 0)) return null
                            return <div style={{ borderTop: '1px solid black', marginRight: "20px" }}>
                                <Tooltip title={i.name}>
                                    <div style={{  }}>{index}</div>
                                </Tooltip>
                                
                                <div>
                                    <Table pagination={false} size="small" dataSource={dataSource2} columns={columns2} showHeader={false}/>
                                </div>
                            </div>
                        })
                    }
                </div>
        </div>
    }
}

export default StockWatchlist