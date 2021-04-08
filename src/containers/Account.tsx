import React from "react";
import { connect } from 'react-redux';
import { Table } from 'antd';

import {
    postAuthToken,
    fetchAccount,
    fetchAccountAssets,
    fetchAccountPortfolio,
    fetchAccountStocks
} from '../reducers/account';
import { formatNumber } from "../utils/common";


interface IProps {
    postAuthToken: any;
    fetchAccount: any;
    fetchAccountAssets: any;
    fetchAccountPortfolio: any;
    fetchAccountStocks: any;
}

interface IState {
    accountObj: any,
    accountAssetsObj: any,
    accountPortfolioObj: any,
    accountStocksObj: any,
    columns: any,
}

class Account extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            accountObj: {},
            accountAssetsObj: {},
            accountPortfolioObj: {},
            accountStocksObj: [],
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

        this.setState({
            accountObj: res1.data.account,
            accountAssetsObj: res2.data,
            accountPortfolioObj: res3.data,
            accountStocksObj: res4.data.stocks
        })
    }

    render() {
        const {
            accountObj,
            accountAssetsObj,
            accountPortfolioObj,
            accountStocksObj,
            columns
        } = this.state;

        const {
            profit,
            ratio,
            stocks,
            totalCost,
            totalCurrentValue
        } = accountPortfolioObj;

        const dataSource = (stocks || []).filter((i: any) => i.symbol !== "VRE" && i.symbol !== "IDI" ).sort((a: any, b: any) => b.currentValue - a.currentValue)

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
            </div>
        )
    }
}

const mapDispatchToProps = {
    postAuthToken,
    fetchAccount,
    fetchAccountAssets,
    fetchAccountPortfolio,
    fetchAccountStocks
}

export default connect(null,mapDispatchToProps)(Account);
