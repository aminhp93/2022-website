import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
  
interface IProps {

}

interface IState {
    da_mua: any;
    nganh_ck: any;
    nganh_BDS_XD: any;
    vn30: any;
    nganh_phan_bon: any;
    nganh_thep: any;
    nganh_dau_khi: any;
    nganh_ngan_hang: any;
    watching: any;
}

class StockWatchlist extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            nganh_ck: [],
            da_mua: [],
            nganh_BDS_XD: [],
            vn30: [],
            nganh_phan_bon: [],
            nganh_thep: [],
            nganh_dau_khi: [],
            nganh_ngan_hang: [],
            watching: [],
        }
    }
    componentDidMount() {
        this.getWatchlist()
    }

    getWatchlist = () => {
        axios({
            method: "GET",
            url: "https://restv2.fireant.vn/me/watchlists",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            }
        }).then(res => {
            console.log(res)
            if (res.data) {
               
                res.data.map((i: any) => {
                    if (i.name === 'da_mua') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                da_mua: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
                            })
                        })
                    } else if (i.name === 'nganh_ck') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                nganh_ck: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
                            })
                        })
                    } else if (i.name === 'nganh_BDS_XD') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                nganh_BDS_XD: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
                            })
                        })
                    } else if (i.name === 'vn30') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                vn30: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
                            })
                        })
                    } else if (i.name === 'nganh_phan_bon') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                nganh_phan_bon: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
                            })
                        })
                    } else if (i.name === 'nganh_thep') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                nganh_thep: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
                            })
                        })
                    } else if (i.name === 'nganh_dau_khi') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                nganh_dau_khi: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
                            })
                        })
                    } else if (i.name === 'nganh_ngan_hang') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                nganh_ngan_hang: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
                            })
                        })
                    } else if (i.name === 'watching') {
                        const listPromises: any = [];
                        i.symbols.map((j: any) => {
                            listPromises.push(this.getPriceStock(j))
                        })
                        Promise.all(listPromises).then((j: any) => {
                            console.log(j)
                            this.setState({
                                watching: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
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
        const endDate = moment().format('YYYY-MM-DD')
        const startDate = moment().add(-1, 'days').format('YYYY-MM-DD')
        return axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            },
            url: `https://restv2.fireant.vn/symbols/${symbol}/historical-quotes?startDate=${startDate}&endDate=${endDate}&offset=0&limit=20`,
        }).then((res: any) => {
            // console.log(res.data)
            let percentChange = 0;
            percentChange = Number((((res.data[0].priceClose - res.data[1].priceClose) / res.data[1].priceClose)*100).toFixed(2))
            return { symbol, percentChange }
        }).catch((e: any) => {
            console.log(e)
        })
    }

    render() {
        const { 
            da_mua, nganh_ck, nganh_BDS_XD,
            vn30, nganh_phan_bon, nganh_thep,
            nganh_dau_khi, nganh_ngan_hang, watching
        } = this.state;

          
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
        
        return <div className="flex">
                <div>
                    <div className="flex">
                        <div style={{ width: "160px" }}>da_mua</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={da_mua} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                    <div className="flex" style={{ borderTop: '1px solid black' }}>
                        <div style={{ width: "160px" }}>nganh_ck</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={nganh_ck} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                    <div className="flex" style={{ borderTop: '1px solid black' }}>
                        <div style={{ width: "160px" }}>nganh_BDS_XD</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={nganh_BDS_XD} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                    <div className="flex" style={{ borderTop: '1px solid black' }}>
                        <div style={{ width: "160px" }}>nganh_phan_bon</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={nganh_phan_bon} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                    <div className="flex" style={{ borderTop: '1px solid black' }}>
                        <div style={{ width: "160px" }}>nganh_thep</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={nganh_thep} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                    <div className="flex" style={{ borderTop: '1px solid black' }}>
                        <div style={{ width: "160px" }}>nganh_dau_khi</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={nganh_dau_khi} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                    <div className="flex" style={{ borderTop: '1px solid black' }}>
                        <div style={{ width: "160px" }}>nganh_ngan_hang</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={nganh_ngan_hang} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                </div>
                <div>
                     <div className="flex" style={{ borderLeft: '1px solid black', borderRight: '1px solid black' }}>
                        <div style={{ width: "100px" }}>vn30</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={vn30} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                </div>
                <div>
                     <div className="flex">
                        <div style={{ width: "100px" }}>watching</div>
                        <div>
                            <Table pagination={false} size="small" dataSource={watching} columns={columns} showHeader={false}/>
                        </div>
                    </div>
                </div>
        </div>
    }
}

export default StockWatchlist