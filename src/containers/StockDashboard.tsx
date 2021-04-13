import React from "react";
import { connect } from "react-redux";
import { Button, Input, Table, Menu, Dropdown } from "antd";
import axios from "axios";
import { keyBy, get } from "lodash";
import moment from "moment";

import {
    listStock,
    createStock
} from '../reducers/stock';
import { formatNumber } from "../utils/common";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IProps {
    listStock: any;
    createStock: any;
}

interface IState {
    symbolCreate: any;
    listStock: any;
    listWatchlists: any;
}

class StockDashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            symbolCreate: '',
            listStock: [],
            listWatchlists: []
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

    handleChangeInput = (e: any) => {
        this.setState({
            symbolCreate: e.target.value
        })
    }

    create = (symbol="") => {
        if (!symbol) return;
        const data = {
            symbol
        }
        this.props.createStock(data)
    }

    updateListStock = () => {
        const string = "AAAABBACBACVADGAGGAGRAMVANVAPHASMBCCBCGBCMBFCBIDBMIBMPBSIBSRBVBBVHBVSBWEC4GCCLCEOCIICKGCRECSVCTDCTFCTGCTICTRCTSD2DDBCDCLDCMDDVDGCDGWDHCDIGDPGDPMDRCDRHDVNDXGEIBELCEVFEVGFCNFITFLCFMCFPTFRTFTSG36GASGEGGEXGILGMDGTNGVRHAGHAHHAXHBCHCMHDBHDCHDGHHSHIIHNDHNGHPGHPXHSGHT1HTNHUTHVNIBCIDCIDIIDJIJCILBIMPITAKBCKDCKDHKOSKSBL14LASLCGLDGLHGLIXLPBLSSLTGMBBMBSMIGMPCMSBMSNMSRMWGNAFNDNNHANHHNKGNLGNRCNT2NTCNTLNVBNVLOCBOGCOILPANPC1PDRPETPGCPHRPLCPLXPNJPOMPOWPPCPSHPTBPVCPVDPVMPVPPVSPVTQCGQNSQTPREES99SABSAMSBSSBTSCISCRSGPSGTSHBSHISHSSIPSJSSMCSSISTBSTKSZCTARTCBTCHTCMTDCTDHTDMTDPTHDTIDTIGTIPTLHTNGTNHTPBTTATTFTV2TVNVC3VCBVCGVCIVCRVCSVDSVEAVGCVGIVGSVGTVHCVHMVIBVICVIPVIXVJCVNDVNGVNMVOCVPBVPGVPIVREVTP"
        const listSymbols: any = string.match(/.{1,3}/g);
        listSymbols.map((i: string) => this.create(i))
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

    getPostsAll = (listSymbols: any) => {
        const listPromises: any = [];
        listSymbols.map((j: any) => {
            listPromises.push(this.getPosts(j))
        })
        Promise.all(listPromises).then(res => {
            const mappedRes: any = keyBy(res, 'symbol');
            const newStockList = this.state.listStock.map((i: any) => {
                i.posts = mappedRes[i.symbol].posts
                return i
            })
            this.setState({
                listStock: newStockList
            })
        })
    }

    getPosts = (symbol: string) => {
        if (!symbol) return;
        return axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            },
            url: `https://restv2.fireant.vn/posts?symbol=${symbol}&type=1&offset=0&limit=20`
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
                sorter: (a: any, b: any) => a.symbol - b.symbol,
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
                render: (data: any) => {
                    const columns = get(data, 'financialReports.columns')
                    const rows = get(data, 'financialReports.rows')
                    
                    const data2: any = [];
                    if (columns && columns.length) {
                        columns.map((i: any, index: number) => {
                            if (index > 1 && rows[3][1] === "NetProfit") {
                                data2.push({
                                    name: i,
                                    value: rows[3][index]
                                })
                            }
                        })
                    }
                    return (
                        <BarChart width={500} height={100} data={data2}>
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                            <Bar dataKey="value">
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
                render: (data: any) => {
                    const columns = get(data, 'financialReports.columns')
                    const rows = get(data, 'financialReports.rows')
                    
                    const data2: any = [];
                    if (columns && columns.length) {
                        columns.map((i: any, index: number) => {
                            if (index > 1 && rows[0][1] === "Sales") {
                                data2.push({
                                    name: i,
                                    value: rows[0][index]
                                })
                            }
                        })
                    }
                    return (
                        <BarChart width={500} height={100} data={data2}>
                            <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                            <Bar dataKey="value">
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
                    console.log(data);
                    const data2: any = [];
                    
                    for (let i=0; i < 7; i++) {
                        const name = moment().add(-i, "days").format("MM-DD")
                        const value = data.posts && data.posts.filter((i: any) => moment(i.date).format("MM-DD") === name).length
                        data2.push({
                            name,
                            value
                        })
                    }
                    console.log(data2)
                    return <div style={{ height: "120px", overflow: "auto", justifyContent: "space-between" }} className="flex">
                        <div>
                            {data.posts && data.posts.map((i: any) => {
                                return <div>{i.title} - {moment(i.date).format("MM-DD")}</div>
                            })}
                        </div>
                        <div>
                            <BarChart width={500} height={100} data={data2}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value">
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
            }
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
            this.fetchAll()
        } else {
            const { listWatchlists } = this.state;
            const listWatchlistsObj = keyBy(listWatchlists, "watchlistID")
            const listSymbols = listWatchlistsObj[Number(data.key)].symbols
            console.log(listSymbols)
            const newList = listSymbols.map((i: any) => {
                return {
                    symbol: i
                }
            })
            this.setState({
                listStock: newList
            }, () => {
                this.getFinancialIndicatorsAll(listSymbols)
                this.getFinancialReportsAll(listSymbols)
                this.getPostsAll(listSymbols)
        
            })
        }
    }

    render() {
        const { symbolCreate, listWatchlists } = this.state;

        const menu = <Menu onClick={this.handleClick}>
                {
                    listWatchlists.map((i: any) => {
                        return  <Menu.Item key={i.watchlistID}>
                            {i.name}
                        </Menu.Item>
                    })
                }     
                <Menu.Item key="all">All</Menu.Item>          
            </Menu>
        return <div>
            <Input onChange={this.handleChangeInput} onPressEnter={() => this.create(symbolCreate)}/>
            <Button disabled onClick={() => this.create(symbolCreate)}>Create</Button>
            <Button disabled onClick={() => this.updateListStock()}>Update list stock</Button>
            <div>
            <Dropdown overlay={menu} trigger={['click']} >
                <div>Click me</div>
            </Dropdown>
            </div>
            {this.renderListStock()}
        </div>
    }
}

const mapDispatchToProps = {
    listStock,
    createStock
}

export default connect(null,mapDispatchToProps)(StockDashboard);
