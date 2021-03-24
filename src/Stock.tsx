import React from 'react';
import axios from 'axios';
import { get } from 'lodash';

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

class Stock extends React.Component<IProps, IState> {
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
                                da_mua: j
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
                                nganh_ck: j
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
                                nganh_BDS_XD: j
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
                                vn30: j
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
                                nganh_phan_bon: j
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
                                nganh_thep: j
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
                                nganh_dau_khi: j
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
                                nganh_ngan_hang: j
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
                                watching: j
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
        return axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            },
            url: `https://restv2.fireant.vn/symbols/${symbol}/historical-quotes?startDate=2021-03-22&endDate=2021-03-23&offset=0&limit=20`,
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
        
        return <div className="flex">
                <div>
                <div className="flex">
                    <div style={{ width: "200px" }}>da_mua</div>
                    <div>
                        {da_mua.map((i: any) => {
                            return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div style={{ width: "200px" }}>nganh_ck</div>
                    <div>
                        {nganh_ck.map((i: any) => {
                            return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div style={{ width: "200px" }}>nganh_BDS_XD</div>
                    <div>
                        {nganh_BDS_XD.map((i: any) => {
                            return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div style={{ width: "200px" }}>nganh_phan_bon</div>
                    <div>
                        {nganh_phan_bon.map((i: any) => {
                            return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div style={{ width: "200px" }}>nganh_thep</div>
                    <div>
                        {nganh_thep.map((i: any) => {
                            return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div style={{ width: "200px" }}>nganh_dau_khi</div>
                    <div>
                        {nganh_dau_khi.map((i: any) => {
                            return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div style={{ width: "200px" }}>nganh_ngan_hang</div>
                    <div>
                        {nganh_ngan_hang.map((i: any) => {
                            return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div style={{ width: "200px" }}>watching</div>
                    <div>
                        {watching.map((i: any) => {
                            return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                        })}
                    </div>
                </div>
                </div>
                <div>
                     <div className="flex">
                        <div style={{ width: "200px" }}>vn30</div>
                        <div>
                            {vn30.map((i: any) => {
                                return <div>{i.symbol} <span className={i.percentChange > 0 ? 'green' : 'red'}>{i.percentChange}</span></div>
                            })}
                        </div>
                    </div>
                </div>
        </div>
    }
}

export default Stock