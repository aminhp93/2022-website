import React from "react";
import { connect } from "react-redux";
import { Table, Menu, Dropdown } from "antd";
import axios from "axios";
import { keyBy, get } from "lodash";
import moment from "moment";

import {
    listStock,
} from '../reducers/stock';
import { formatNumber, BILLION_UNIT } from "../utils/common";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import News from "./News";


interface IProps {
    listStock: any;
}

interface IState {
    listStock: any;
    listWatchlists: any;
    modal: string;
    newsUrl: string;
    selectedWatchlist: string;
}

class StockDashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            listStock: [],
            listWatchlists: [],
            modal: "",
            newsUrl: "",
            selectedWatchlist: null
        }
    }

    async componentDidMount() {
        this.getWatchlist()
    }

    fetchAll = async () => {
        const res = await this.props.listStock();
        if (res && res.data) {
            this.setState({
                listStock: res.data
            }, () => {
                const listSymbols = res.data.map((i: any) => i.symbol)

                this.getFinancialIndicatorsAll(listSymbols)
                this.getFinancialReportsAll(listSymbols)
            })
            
        }
    }

    getFinancialIndicatorsAll = (listSymbols: any) => {
        const listPromises: any = [];
        listSymbols.map((j: any) => {
            listPromises.push(this.getFinancialIndicators(j))
        })
        Promise.all(listPromises).then(res => {
            const mappedRes: any = keyBy(res, 'symbol');
            const newStockList = this.state.listStock.map((i: any) => {
                i.ROE = mappedRes[i.symbol].ROE
                i.EPS = mappedRes[i.symbol].EPS
                return i
            })
            this.setState({
                listStock: newStockList
            })
        })
    }

    getFinancialReportsAll = (listSymbols: any) => {
        const listPromises: any = [];
        listSymbols.map((j: any) => {
            listPromises.push(this.getFinancialReports(j))
        })
        Promise.all(listPromises).then(res => {
            const mappedRes: any = keyBy(res, 'symbol');
            const newStockList = this.state.listStock.map((i: any) => {
                i.financialReports = mappedRes[i.symbol].financialReports
                return i
            })
            this.setState({
                listStock: newStockList
            })
        })
    }

    getNewsAll = (listSymbols: any) => {
        const listPromises: any = [];
        listSymbols.map((j: any) => {
            listPromises.push(this.getPosts(j, 1))
        })
        Promise.all(listPromises).then(res => {
            const mappedRes: any = keyBy(res, 'symbol');
            const newStockList = this.state.listStock.map((i: any) => {
                i.newsPosts = mappedRes[i.symbol].posts
                return i
            })
            this.setState({
                listStock: newStockList
            })
        })
    }

    getCommunityAll = (listSymbols: any) => {
        const listPromises: any = [];
        listSymbols.map((j: any) => {
            listPromises.push(this.getPosts(j, 0))
        })
        Promise.all(listPromises).then(res => {
            const mappedRes: any = keyBy(res, 'symbol');
            const newStockList = this.state.listStock.map((i: any) => {
                i.communityPosts = mappedRes[i.symbol].posts
                return i
            })
            this.setState({
                listStock: newStockList
            })
        })
    }

    getPosts = (symbol: string, type: number) => {
        if (!symbol) return;
        return axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            },
            url: `https://restv2.fireant.vn/posts?symbol=${symbol}&type=${type}&offset=0&limit=20`
        }).then((res: any) => {

            const posts = res.data
            return { symbol, posts }
        }).catch((e: any) => {
            console.log(e)
        })
    }

    getFinancialIndicators = (symbol: string) => {
        if (!symbol) return;
        return axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            },
            url: `https://restv2.fireant.vn/symbols/${symbol}/financial-indicators`            ,
        }).then((res: any) => {
            const ROE = (res.data.filter((i: any) => i.symbol === "ROE")[0] || {}).value
            const EPS = (res.data.filter((i: any) => i.symbol === "EPS")[0] || {}).value
            return { symbol, ROE, EPS }
        }).catch((e: any) => {
            console.log(e)
        })
    }

    getFinancialReports = (symbol: string) => {
        if (!symbol) return;
        return axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            },
            url: `https://restv2.fireant.vn/symbols/${symbol}/financial-reports?type=IS&period=Q&compact=true&offset=0&limit=5`
        }).then((res: any) => {

            const financialReports = res.data
            return { symbol, financialReports }
        }).catch((e: any) => {
            console.log(e)
        })
    }

    renderListStock = () => {
        const { listStock } = this.state;
        const dataSource = listStock
          
        const columns = [
            {
                title: 'symbol',
                sorter: (a: any, b: any) => a.symbol.localeCompare(b.symbol),
                render: (data: any) => {
                    return data.symbol
                }
            },
            {
                title: 'ROE',
                sorter: (a: any, b: any) => a.ROE - b.ROE,
                render: (data: any) => {
                    const ROE = data && data.ROE
                    return ROE && formatNumber(ROE.toFixed(0))
                }
            },
            {
                title: 'EPS',
                sorter: (a: any, b: any) => a.EPS - b.EPS,
                render: (data: any) => {
                    const EPS = data && data.EPS
                    return EPS && formatNumber(EPS.toFixed(0))
                }
            },
            {
                title: 'LN Sau thue',
                className: "lnst-column",
                render: (data: any) => {
                    const columns = get(data, 'financialReports.columns')
                    const rows = get(data, 'financialReports.rows')
                    
                    const data2: any = [];
                    if (columns && columns.length) {
                        columns.map((i: any, index: number) => {
                            if (index > 1 && rows[3][1] === "NetProfit") {
                                data2.push({
                                    name: i,
                                    value: Number((rows[3][index] / BILLION_UNIT).toFixed(0))
                                })
                            }
                        })
                    }
                    return (
                        <BarChart width={250} height={100} data={data2}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" style={{ fontSize: "7px"}} />
                            <YAxis />
                            <Tooltip />
                                {/* <Legend /> */}
                            <Bar dataKey="value" barSize={15}>
                                {
                                    data2.map((entry: any, index: any) => (
                                        <Cell key={index} fill={entry.value > 0 ? 'green' : 'red'} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    )
                }
            },
            {
                title: 'DT thuan',
                className: "dt-thuan-column",
                render: (data: any) => {
                    const columns = get(data, 'financialReports.columns')
                    const rows = get(data, 'financialReports.rows')
                    
                    const data2: any = [];
                    if (columns && columns.length) {
                        columns.map((i: any, index: number) => {
                            if (index > 1 && rows[0][1] === "Sales") {
                                data2.push({
                                    name: i,
                                    value: Number((rows[0][index] / BILLION_UNIT).toFixed(0))
                                })
                            }
                        })
                    }
                    return (
                        <BarChart width={250} height={100} data={data2}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" style={{ fontSize: "7px"}} />
                            <YAxis />
                            <Tooltip />
                                {/* <Legend /> */}
                            <Bar dataKey="value" barSize={15}>
                            {
                                data2.map((entry: any, index: any) => (
                                    <Cell key={index} fill={entry.value > 0 ? 'green' : 'red'} />
                                ))
                            }
                            </Bar>
                        </BarChart>
                    )
                }
            },
            {
                title: "News",
                render: (data: any) => {
                    return <div style={{ height: "120px", overflow: "auto"}}>
                        <div>
                            {data.newsPosts && data.newsPosts.map((i: any, index: any) => {
                                return <div 
                                className="flex"
                                style={{
                                    justifyContent: "space-between"
                                }}
                                onClick={() => this.setState({ 
                                    modal: "news", 
                                    newsUrl: `https://restv2.fireant.vn/posts/${i.postID}/`
                                })}>
                                    <div style={{ width: "250px" }} className="ellipsis">{`${index + 1} - ${i.title}`}</div>
                                    <div>{moment(i.date).format("MM-DD")}</div>
                                </div>
                            })}
                        </div>
                    </div>
                }
            },
            {
                title: "News",
                className: "news-column",
                render: (data: any) => {
                    const data2: any = [];
                    
                    for (let i=0; i < 7; i++) {
                        const name = moment().add(-i, "days").format("MM-DD")
                        const value = data.newsPosts && data.newsPosts.filter((i: any) => moment(i.date).format("MM-DD") === name).length
                        data2.push({
                            name,
                            value
                        })
                    }
                    return <div style={{ height: "120px", overflow: "auto" }}>
                        <div>
                            <BarChart width={250} height={100} data={data2}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" style={{ fontSize: "7px"}} />
                                <YAxis />
                                <Tooltip />
                                {/* <Legend /> */}
                                <Bar dataKey="value" barSize={15}>
                                    {
                                        data2.map((entry: any, index: any) => (
                                            <Cell key={index} fill={entry.value > 0 ? 'green' : 'red'} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </div>
                        
                    </div>
                }
            },
            {
                title: "Community",
                className: "community-column",
                render: (data: any) => {
                    const data2: any = [];
                    
                    for (let i=0; i < 7; i++) {
                        const name = moment().add(-i, "days").format("MM-DD")
                        const value = data.communityPosts && data.communityPosts.filter((i: any) => moment(i.date).format("MM-DD") === name).length
                        data2.push({
                            name,
                            value
                        })
                    }
                    return (
                        <div>
                            <BarChart width={250} height={100} data={data2}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" style={{ fontSize: "7px"}} />
                                <YAxis />
                                <Tooltip />
                                {/* <Legend /> */}
                                <Bar dataKey="value" barSize={15}>
                                    {
                                        data2.map((entry: any, index: any) => (
                                            <Cell key={index} fill={entry.value > 0 ? 'green' : 'red'} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </div>   
                    )
                }
            },

        ];
          
        return <Table 
            className="StockDashboard-table"
            dataSource={dataSource}
            columns={columns}
            pagination={false}/>;
          
    }

    getWatchlist = () => {
        axios({
            method: "GET",
            url: "https://restv2.fireant.vn/me/watchlists",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            }
        }).then(res => {
            if (res && res.data) {
                this.setState({
                    listWatchlists: res.data
                })
            }
        }).catch(e => {

        })
    }

    handleClick = (data: any) => {
        if (data.key === "all") {
            // this.fetchAll()
        } else {
            const { listWatchlists } = this.state;
            const listWatchlistsObj = keyBy(listWatchlists, "watchlistID")
            const listSymbols = listWatchlistsObj[Number(data.key)].symbols
            const newList = listSymbols.map((i: any) => {
                return {
                    symbol: i
                }
            })
            this.setState({
                listStock: newList,
                selectedWatchlist: data.key
            }, () => {
                this.getFinancialIndicatorsAll(listSymbols)
                this.getFinancialReportsAll(listSymbols)
                this.getNewsAll(listSymbols)
                this.getCommunityAll(listSymbols)

            })
        }
    }

    render() {
        const { listWatchlists, modal, newsUrl, selectedWatchlist } = this.state;
        const watchlistObj = keyBy(listWatchlists, 'watchlistID')
        const menu = <Menu onClick={this.handleClick}>
                {
                    listWatchlists.map((i: any) => {
                        return  <Menu.Item key={i.watchlistID}>
                            {i.name}
                        </Menu.Item>
                    })
                }     
                {/* <Menu.Item key="all">All</Menu.Item>           */}
            </Menu>
        return <div>
            <div>
            <Dropdown overlay={menu} trigger={['click']} >
                <div>{selectedWatchlist ? watchlistObj[selectedWatchlist].name : 'Watchlist'}</div>
            </Dropdown>
            </div>
            {this.renderListStock()}
            {modal === "news" && <News close={() => this.setState({ modal: "" })} url={newsUrl} />}
        </div>
    }
}

const mapDispatchToProps = {
    listStock,
}

export default connect(null,mapDispatchToProps)(StockDashboard);
