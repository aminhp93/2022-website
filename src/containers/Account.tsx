import React from "react";
import { connect } from 'react-redux';
import { Table } from 'antd';
import { keyBy } from 'lodash';
import moment from 'moment';
import axios from 'axios';

import {
    postAuthToken,
    fetchAccount,
    fetchAccountAssets,
    fetchAccountPortfolio,
    fetchAccountStocks,
    fetchOrdersHistory,
    fetchCashStatement
} from '../reducers/account';
import { formatNumber, DATE_FORMAT } from "../utils/common";
import CashStatement from "./CashStatement";

interface IProps {
    postAuthToken: any;
    fetchAccount: any;
    fetchAccountAssets: any;
    fetchAccountPortfolio: any;
    fetchAccountStocks: any;
    fetchOrdersHistory: any;
    fetchCashStatement: any;
}

interface IState {
    accountObj: any;
    accountAssetsObj: any;
    accountPortfolioObj: any;
    accountStocksObj: any;
    columns: any;
    historyBuyList: any;
    cashStatementList: any;
}

class Account extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            accountObj: {},
            accountAssetsObj: {},
            accountPortfolioObj: {},
            accountStocksObj: [],
            historyBuyList: [],
            cashStatementList: [],
            columns: [
                {
                    title: 'symbol',
                    render: (data: any) => {
                        return <div>{data.symbol}</div>
                    },
                },
                {
                    title: 'currentPrice',
                    render: (data: any) => {
                        return <div>{formatNumber(data.currentPrice)}</div>
                    },
                },
                {
                    title: 'costPrice',
                    render: (data: any) => {
                        return <div>{formatNumber(data.costPrice)}</div>
                    },
                },
                {
                    title: 'quantity',
                    render: (data: any) => {
                        return <div>{formatNumber(data.quantity)}</div>
                    },
                },
                {
                    title: 'currentValue',
                    render: (data: any) => {
                        return <div>{formatNumber(data.currentValue)}</div>
                    },
                },
                {
                    title: 'cost',
                    render: (data: any) => {
                        return data && data.cost && <div>{formatNumber(Number(data.cost.toFixed(0)))}</div>
                    },
                },
                {
                    title: 'gainLoss',
                    render: (data: any) => {
                        return data && data.gainLoss && <div>{formatNumber(Number(data.gainLoss.toFixed(0)))}</div>
                    },
                },
                {
                    title: 'gainLossRatio',
                    render: (data: any) => {
                        return data && data.gainLossRatio && <div>{Number(data.gainLossRatio * 100).toFixed(1)}</div>
                    },
                },
                {
                    title: 'Date',
                    render: (data: any) => {
                        const today = moment();
                        const transactionDate = moment(data.transactionDate)
                        return data && data.transactionDate && (
                            <div>
                                {today.diff(transactionDate, 'days')} days - {transactionDate.format(DATE_FORMAT)}
                            </div>
                        )
                    }
                }
            ]
        }
    }

    async componentDidMount() {
        const res = await this.props.postAuthToken()
        const res1 = await this.props.fetchAccount(res.data.token)
        const res2 = await this.props.fetchAccountAssets(res.data.token)
        const res3 = await this.props.fetchAccountPortfolio(res.data.token)
        const res4 = await this.props.fetchAccountStocks(res.data.token)
        const res5 = await this.props.fetchOrdersHistory(res.data.token)
        // const res6 = await this.props.fetchCashStatement(res.data.token)
        // console.log(res6)

        this.setState({
            accountObj: res1.data.account,
            accountAssetsObj: res2.data,
            accountPortfolioObj: res3.data,
            accountStocksObj: res4.data.stocks,
            historyBuyList: res5.data,
            // cashStatementList: res6.data
            // .filter((i: any) => 
            // i.orsStatus === "Filled" && 
            // i.execType === "NB")
        })
    }

    fetchCashStatement = () => {
        const url = "https://trade-report-api.vndirect.com.vn/accounts/0001069456/cashStatement?index=1&offset=50&types="

    }

    render() {
        const {
            accountObj,
            accountAssetsObj,
            accountPortfolioObj,
            accountStocksObj,
            columns,
            historyBuyList
        } = this.state;

        const {
            profit,
            ratio,
            stocks,
            totalCost,
            totalCurrentValue
        } = accountPortfolioObj;
        
        const dataSource = (stocks || [])
            .filter((i: any) => i.symbol !== "VRE" && i.symbol !== "IDI" )
            .sort((a: any, b: any) => b.currentValue - a.currentValue)

        const temp: any = [];
        const filteredHistoryBuyList: any = []
        historyBuyList.map((i: any) => {
            if (i && i.symbol) {
                if (!temp.includes(i.symbol)) {
                    temp.push(i.symbol)
                    filteredHistoryBuyList.push(i)
                }
            }
        })
        const historyBuyListObj = keyBy(filteredHistoryBuyList, "symbol")
        dataSource.map((i: any) => {
            i.transactionDate = ((historyBuyListObj[i.symbol]) || {}).transactionDate
            return i
        })

        const cashObj = {
            symbol: "Cash",
            currentPrice: "",
            costPrice: "",
            quantity: "",
            currentValue: "",
            cost: "",
            gainLoss: accountAssetsObj && accountAssetsObj.cashAvailable,
            gainLossRatio: "",
        }

        const navObj = {
            symbol: "NAV",
            currentPrice: "",
            costPrice: "",
            quantity: "",
            currentValue: "",
            cost: "",
            gainLoss: accountAssetsObj && accountAssetsObj.nav,
            gainLossRatio: "",
        }

        const profitObj = {
            symbol: "profit",
            currentPrice: "",
            costPrice: "",
            quantity: "",
            currentValue: "",
            cost: "",
            gainLoss: accountPortfolioObj && accountPortfolioObj.profit,
            gainLossRatio: "",
        }

        dataSource.push(cashObj)
        dataSource.push(navObj)
        dataSource.push(profitObj)

        return (
            <div>
                <Table pagination={false} size="small" dataSource={dataSource} columns={columns} />
                {/* <Table pagination={false} size="small" dataSource={dataSource2} columns={columns} showHeader={false}/> */}
                <CashStatement />
                {/* <VCBFAccount/> */}
                {/* <TPBankAccount/> */}
                {/* <TCBAccount /> */}
                <div>{`VCBFAccount: 43,732,418 `}</div>
                <div>{`TPBankAccount: 27,859,650`}</div>
                <div>{`Tiet kiem: 37,000,000`}</div>
                <div>{`Cash: 34,000,000`}</div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    postAuthToken,
    fetchAccount,
    fetchAccountAssets,
    fetchAccountPortfolio,
    fetchAccountStocks,
    fetchOrdersHistory,
    fetchCashStatement
}

export default connect(null,mapDispatchToProps)(Account);


class VCBFAccount extends React.Component {
    componentDidMount() {
        // axios({
        //     url: "https://trading.vcbf.com/fund/getSoDuCCQ",
        //     method: "POST",
        //     data: {
        //         OBJNAME: "BALANCE",
        //         custodycd: "979C002755",
        //         keySearch: [],
        //         language: "vie",
        //         page: 1,
        //         pagesize: 1,
        //         sortSearch: []
        //     },
        //     headers: {
        //         Cookie: "_gcl_au=1.1.613294862.1618883847; _ga=GA1.2.1968515218.1618883847; _fbp=fb.1.1618883847451.2003889446; _gcl_aw=GCL.1618989504.CjwKCAjwmv-DBhAMEiwA7xYrd63Jywmt6JW7wrNIoJCbp8MdmZWihjSBSqR52sXOWDBFtn1F5mTEKRoCV-kQAvD_BwE; _gid=GA1.2.1339681051.1618989504; _gac_UA-48131653-1=1.1618989504.CjwKCAjwmv-DBhAMEiwA7xYrd63Jywmt6JW7wrNIoJCbp8MdmZWihjSBSqR52sXOWDBFtn1F5mTEKRoCV-kQAvD_BwE; _gac_UA-44051993-1=1.1618989504.CjwKCAjwmv-DBhAMEiwA7xYrd63Jywmt6JW7wrNIoJCbp8MdmZWihjSBSqR52sXOWDBFtn1F5mTEKRoCV-kQAvD_BwE; __tawkuuid=e::vcbf.com::RlQKcn0PfvO/zU60z2U59g+mqAZgGTTbL1S28Pu/IgHiAmJUSvLoNj8YPVgu4C2l::2; sessionid=s%3AmT4ASYVyZHaUbSzHIj5cQ6QYYlvAuf-A.nwW36HOy%2BBt4Vv0FV7Bc2GEhRWlnQ5mmP1For6peJOQ; sails.sid=s%3AaT156JDRzMKjHq1TeaCoJT4FKEdF6Uq1.pFG3H4mq0nS3hL4xiJKSclL820L3C7ncOIdkUJb0bNc; io=fAo6e0AgbLz0GO97APHN"
        //     }
        // }).then(res => {
        //     console.log(res)
        // }).catch(e => {
        //     console.log(e)
        // })
    }

    render() {
        return <div>{`VCBFAccount: 43,732,418 `}</div>
    }
}

class TPBankAccount extends React.Component {
    componentDidMount() {
        // axios({
        //     url: "https://ebank.tpb.vn/gateway/api/common-presentation-service/v1/bank-accounts?function=home",
        //     method: "GET",
        //     headers: {
        //         Authorization: "Bearer eyJraWQiOiJNYmV1VmVVWlhVT2FJcDgwYmx1XC9sanFOQjNKZE9aSDgxQ3JGU0tpMmVcL2M9IiwiY3R5IjoiSldUIiwiZW5jIjoiQTEyOENCQy1IUzI1NiIsImFsZyI6ImRpciJ9..OksPtD7G53uhHeztH_SrrQ.V5q54_KtSYdA9hPmqHwlfuqHTdmVNs927EaGkUpySVEMssHFNSMeEvMNIhWsH59h5Rln-FJGRb-5-S4rZkWFoa9N5e90fj9Gzktnop3mTxhXHsfdsGEt2xtO-6C8qqs2faHc-VnyYgAVqv1D6lXr1_LS5x-fNN6owjLtpol5Vnpr_JxDlaJWIM3Pkj1_hYWHwMDK-HThc3CSrx2oLY6Vc60J3zOQOOI5r5trUhOBW4cNp1H5LRTB-WIuoldmCbcA4hLjlwzb60QbWIcf0WX3w4a3xM5fhUnALuxt6cBmEwUSbsJjfYKJ8TFmMRWwc5AyZ6dGrNB1gfC6hZy3dhCY5IqAuaR2uM-pckRScKd0H1lpQ0OEnSfjhW--itPwKreFkhiZHxr8MvfA1s6Ere10HRlU4B4jxIlFPdnGyw5_6T-Anznibw33BdOl5nxSJliMhoCzK4bIvYkc9s-VfzCYTAPt5dm0dZFQvGCTI7lUBdKjrF51k8nfO9nD0z-ZTt7l.2xiTM0_XRRoxYsXizJmi_Q",
        //         "Access-Control-Allow-Origin": "*"
        //     }
        // }).then(res => {
        //     console.log(res)
        // }).catch(e => {
        //     console.log(e)
        // })
    }

    render() {
        return <div>
            TPBankAccount: {`27,859,650`}
        </div>
    }
}

class TCBAccount extends React.Component {
    componentDidMount() {
        // axios({
        //     url: "https://ebank.tpb.vn/gateway/api/common-presentation-service/v1/bank-accounts?function=home",
        //     method: "GET",
        //     headers: {
        //         Authorization: "Bearer eyJraWQiOiJNYmV1VmVVWlhVT2FJcDgwYmx1XC9sanFOQjNKZE9aSDgxQ3JGU0tpMmVcL2M9IiwiY3R5IjoiSldUIiwiZW5jIjoiQTEyOENCQy1IUzI1NiIsImFsZyI6ImRpciJ9..OksPtD7G53uhHeztH_SrrQ.V5q54_KtSYdA9hPmqHwlfuqHTdmVNs927EaGkUpySVEMssHFNSMeEvMNIhWsH59h5Rln-FJGRb-5-S4rZkWFoa9N5e90fj9Gzktnop3mTxhXHsfdsGEt2xtO-6C8qqs2faHc-VnyYgAVqv1D6lXr1_LS5x-fNN6owjLtpol5Vnpr_JxDlaJWIM3Pkj1_hYWHwMDK-HThc3CSrx2oLY6Vc60J3zOQOOI5r5trUhOBW4cNp1H5LRTB-WIuoldmCbcA4hLjlwzb60QbWIcf0WX3w4a3xM5fhUnALuxt6cBmEwUSbsJjfYKJ8TFmMRWwc5AyZ6dGrNB1gfC6hZy3dhCY5IqAuaR2uM-pckRScKd0H1lpQ0OEnSfjhW--itPwKreFkhiZHxr8MvfA1s6Ere10HRlU4B4jxIlFPdnGyw5_6T-Anznibw33BdOl5nxSJliMhoCzK4bIvYkc9s-VfzCYTAPt5dm0dZFQvGCTI7lUBdKjrF51k8nfO9nD0z-ZTt7l.2xiTM0_XRRoxYsXizJmi_Q"
        //     }
        // }).then(res => {
        //     console.log(res)
        // }).catch(e => {
        //     console.log(e)
        // })
    }

    render() {
        return <div>
            TCBAccount
        </div>
    }
}

