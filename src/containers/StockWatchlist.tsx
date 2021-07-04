import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table, Tooltip, Button } from 'antd';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip as TooltipChart } from 'recharts';
import { formatNumber, DATE_FORMAT } from "../utils/common";
import { get, meanBy } from 'lodash';

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
        // setInterval(() => {
        //     this.getWatchlist()
        // }, TIMEOUT_TIME)
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
            if (moment().format('HH') < '09' && moment().format('HH') > '00' ) {
                startCount = -4
                endCount = -3
            } else {
                startCount = -3
                endCount = 0
            }
        } else if (moment().format("ddd") === "Tue") {
            if (moment().format('HH') < '09' && moment().format('HH') > '00' ) {
                startCount = -4
                endCount = -1
            } 
        } else {
            if (moment().format('HH') < '09' && moment().format('HH') > '00' ) {
                startCount = -2
                endCount = -1
            } 
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
            percentChange = Number(((((res.data[0] || {}).priceClose - (res.data[1] || {}).priceClose) / (res.data[1] || {}).priceClose)*100).toFixed(2))
            return { symbol, percentChange }
        }).catch((e: any) => {
            console.log(e)
        })
    }

    renderTitle = (index: number, i: any) => {
        if (i.name === '8355_ngan_hang') {
            return 'NH'
        } else if (i.name === '8781_chung_khoan') {
            return 'CK'
        } else if (i.name === '8633_dau_co_va_BDS') {
            return 'BDS'
        } else if (i.name === '2357_xay_dung_xay_lap') {
            return 'XD'
        } else {
            return index
        }   
    }

    renderMarketAnalysis = () => {
        const { listData } = this.state;
        const thanh_khoan_lon_t6 = (listData.filter((i: any) => i.name === "thanh_khoan_lon_t6") || [])[0]
        if (!thanh_khoan_lon_t6 || !thanh_khoan_lon_t6.value) return
        const increase = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange > 0).length;
        const total = thanh_khoan_lon_t6.value.length;
        const greater_0 = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange > 0 && i.percentChange < 1).length;
        const greater_1 = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange === 1 || (i.percentChange > 1 && i.percentChange < 2)).length;
        const greater_2 = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange === 2 || (i.percentChange > 2 && i.percentChange < 3)).length;
        const greater_3 = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange === 3 || (i.percentChange > 3 && i.percentChange < 4)).length;
        const greater_4 = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange === 4 || (i.percentChange > 4 && i.percentChange < 5)).length;
        const greater_5 = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange === 5 || i.percentChange > 5 ).length;
        const total_greater_0 = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange > 0 || i.percentChange === 0 ).length;
        const less_0 = thanh_khoan_lon_t6.value.filter((i: any) => i.percentChange < 0 ).length;
        const dataChart = [
            {
                name: '>=5',
                value: greater_5
            },
            {
                name: '>=4',
                value: greater_4
            },
            {
                name: '>=3',
                value: greater_3
            },
            {
                name: '>=2',
                value: greater_2
            },
            {
                name: '>=1',
                value: greater_1
            },
            {
                name: '>=0',
                value: greater_0
            },
            {
                name: 'T>=0',
                value: total_greater_0
            },
            {
                name: 'T<0',
                value: -less_0
            },
        ]
        return <div>
            <div>
                {`Count: ${increase}/${total}`}
            </div>
            <div>
                {`>=5: ${greater_5}`}
            </div>
            <div>
                {`>=4: ${greater_4}`}
            </div>
            <div>
                {`>=3: ${greater_3}`}
            </div>
            <div>
                {`>=2: ${greater_2}`}
            </div>
            <div>
                {`>=1: ${greater_1}`}
            </div>
            <div>
                {`>=0: ${greater_0}`}
            </div>
            <div>
                <BarChart width={400} height={200} data={dataChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{ fontSize: "10px"}} />
                    <YAxis />
                    <TooltipChart />
                    <Bar dataKey="value" barSize={20}>
                        {
                            dataChart.map((entry: any, index: any) => (
                                <Cell key={index} fill={entry.value > 0 ? 'green' : 'red'} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    }

    render() {
        const { listData, showAll } = this.state;
        console.log(listData)
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

        const columns3 = [
            {
                title: 'NH',
                render: (data: any) => {
                    console.log(data)
                    
                    return <div>{data.name}</div>
                    
                }
            }
        ]

        const sortList1 = [ 'vn30', 'aim_to_buy', 'watching', 'da_mua']
        const sortList2 = [ '2357_xay_dung_xay_lap', '8633_dau_co_va_BDS', '8781_chung_khoan', '8355_ngan_hang']
        
        return <div style={{  height: "100%" }}>
                <div style={{ height: "50%", overflow: "auto" }} className="flex">
                    <div style={{ width: "50%"}} className="flex">
                        {
                            listData
                                .filter((i: any) => ['da_mua', 'watching', 'aim_to_buy', 'vn30'].includes(i.name) && i.value && i.value.length > 0)
                                .sort((a: any, b: any) => sortList1.indexOf(b.name) - sortList1.indexOf(a.name))
                                .map((i: any, index: number) => {
                                return <div style={{ borderTop: '1px solid black', marginRight: "10px" }}>
                                    <div style={{  }}>{i.name}</div>
                                    <div>
                                        <Table pagination={false} size="small" dataSource={i.value} columns={columns} showHeader={false}/>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    {this.renderMarketAnalysis()}
                </div>
             
                <div style={{ height: "50%" }} className="flex">                    
                    {
                        listData
                            .filter((i: any) => !['da_mua', 'watching', 'aim_to_buy', 'vn30', 'thanh_khoan_lon_t6'].includes(i.name) && i.value && i.value.length > 0)
                            .sort((a: any, b: any) => sortList2.indexOf(b.name) - sortList2.indexOf(a.name))
                            .map((i: any, index: number) => {
                            const dataSource2 = showAll ? i.value : i.value.filter((j: any) => j.percentChange > 0)
                            if (!dataSource2 || (dataSource2 && dataSource2.length === 0)) return null
                            return <div style={{ borderTop: '1px solid black', marginRight: "20px" }}>
                                <div>
                                    {meanBy(i.value, 'percentChange').toFixed(2)}
                                </div>
                                <Tooltip title={i.name}>
                                    <div>{this.renderTitle(index, i)}</div>
                                </Tooltip>
                                
                                <div>
                                    <Table pagination={false} size="small" dataSource={dataSource2} columns={columns2} showHeader={false}/>
                                </div>
                            </div>
                        })
                    }
                    {/* <Button onClick={() => this.setState({ showAll: !showAll})}>
                        {showAll ? 'Hide' : 'Show'}
                    </Button> */}
                </div>
        </div>
    }
}

export default StockWatchlist