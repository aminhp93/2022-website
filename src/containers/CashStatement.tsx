import React from "react";
import { connect } from 'react-redux';
import { Table, Modal } from 'antd';
import { sumBy } from 'lodash';
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
import { formatNumber, DATE_FORMAT, MILLION_UNIT } from "../utils/common";

interface IProps {
    postAuthToken?: any;
    fetchCashStatement?: any;
}

interface IState {
    cashStatementList: any;
    modal: string;
    modalData: any;
}

class CashStatement extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            cashStatementList: [],
            modal: null,
            modalData: null
        }
    }

    async componentDidMount() {
        const res = await this.props.postAuthToken()
        const res1 = await this.props.fetchCashStatement(res.data.token)
        this.setState({
            cashStatementList: res1
        })
    }

    render() {
        const { cashStatementList, modal, modalData } = this.state;
        
        const columns = [
            {
                title: 'transDate',
                render: (data: any) => {
                    return <div>{moment(data.transDate).format(DATE_FORMAT)}</div>
                },
            },
            {
                title: 'amount',
                className: "amount-column",
                render: (data: any) => {
                    return <div>{formatNumber(Number((data.amount/MILLION_UNIT).toFixed(2)))}</div>
                },
            },
            {
                title: 'transDesc',
                render: (data: any) => {
                    return <div>{data.transDesc}</div>
                },
            },
            {
                title: 'typeCode',
                render: (data: any) => {
                    return <div>{data.typeCode}</div>
                },
            },
            {
                title: 'typeCodeDesc',
                render: (data: any) => {
                    return <div>{data.typeCodeDesc}</div>
                },
            },
        ]

        const dataSource = cashStatementList.filter((i: any) => !["8865", "8866", "8855", "8856", "8861", "2490", "1162", "0066", "1151", "1101"].includes(i.typeCode))

        const dataSource2 = cashStatementList.filter((i: any) => ["8865", "8866"].includes(i.typeCode))
        const dataSource2_total = (sumBy(dataSource2, "amount") / MILLION_UNIT).toFixed(2)

        const dataSource3 = cashStatementList.filter((i: any) => ["8855", "8856"].includes(i.typeCode))
        const dataSource3_total = (sumBy(dataSource3, "amount") / MILLION_UNIT).toFixed(2)

        const dataSource4 = cashStatementList.filter((i: any) => ["8861"].includes(i.typeCode))
        const dataSource4_total = (sumBy(dataSource4, "amount") / MILLION_UNIT).toFixed(2)

        const dataSource5 = cashStatementList.filter((i: any) => ["2490"].includes(i.typeCode))
        const dataSource5_total = (sumBy(dataSource5, "amount") / MILLION_UNIT).toFixed(2)

        const dataSource6 = cashStatementList.filter((i: any) => ["1162"].includes(i.typeCode))
        const dataSource6_total = (sumBy(dataSource6, "amount") / MILLION_UNIT).toFixed(2)

        const dataSource7 = cashStatementList.filter((i: any) => ["0066"].includes(i.typeCode))
        const dataSource7_total = (sumBy(dataSource7, "amount") / MILLION_UNIT).toFixed(2)

        const dataSource8 = cashStatementList.filter((i: any) => ["1151"].includes(i.typeCode))
        const dataSource8_total = (sumBy(dataSource8, "amount") / MILLION_UNIT).toFixed(2)

        const dataSource9 = cashStatementList.filter((i: any) => ["1101"].includes(i.typeCode))
        const dataSource9_total = (sumBy(dataSource9, "amount") / MILLION_UNIT).toFixed(2)
        
        const cash_in = Number(dataSource8_total) + Number(dataSource9_total)
        
        return <div>
            <Table pagination={false} size="small" dataSource={dataSource} columns={columns} />
            <div className="flex sp-bt">Tra tien mua (8865), Nhan tien ban (8866) <div>{dataSource2_total}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => this.setState({ modal: 'CashStatementModal', modalData: dataSource2 })}>Detail</div>
            <div className="flex sp-bt">Tra phi lenh mua (8855), Tra phi lenh ban (8856) <div>{dataSource3_total}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => this.setState({ modal: 'CashStatementModal', modalData: dataSource3 })}>Detail</div>
            <div className="flex sp-bt">Tra ung truoc tien ban (8861) <div>{dataSource4_total}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => this.setState({ modal: 'CashStatementModal', modalData: dataSource4 })}>Detail</div>
            <div className="flex sp-bt">Tra phi luu ky (2490) <div>{dataSource5_total}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => this.setState({ modal: 'CashStatementModal', modalData: dataSource5 })}>Detail</div>
            <div className="flex sp-bt">Tien lai trong thang (1162) <div>{dataSource6_total}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => this.setState({ modal: 'CashStatementModal', modalData: dataSource6 })}>Detail</div>
            <div className="flex sp-bt">Trả thuế TNCC từ chuyển nhượng cổ phiếu theo ngày (0066) <div>{dataSource7_total}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => this.setState({ modal: 'CashStatementModal', modalData: dataSource7 })}>Detail</div>
            <div className="flex sp-bt">Chuyen khoan GL-CI (1151) <div>{dataSource8_total}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => this.setState({ modal: 'CashStatementModal', modalData: dataSource8 })}>Detail</div>
            <div className="flex sp-bt">Chuyen khoan CI den NH khac (1101) <div>{dataSource9_total}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => this.setState({ modal: 'CashStatementModal', modalData: dataSource9 })}>Detail</div>
            <div className="flex sp-bt">Cash in <div>{cash_in}</div></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>Detail</div>

            { modal === "CashStatementModal" && <CashStatementModal data={modalData} close={() => this.setState({ modal: null })}/>}
            
        </div>
    }
}

const mapDispatchToProps = {
    postAuthToken,
    fetchCashStatement
}

export default connect(null,mapDispatchToProps)(CashStatement);

interface ICashStatementModalProps {
    data: any;
    close: any;
} 

interface ICashStatementModalState {

}

class CashStatementModal extends React.Component<ICashStatementModalProps, ICashStatementModalState> {

    handleCancel = () => {
        this.props.close();
    }

    handleOk = () => {
        
    }

    render() {
        const { data } = this.props;
        const columns = [
            {
                title: 'transDate',
                render: (data: any) => {
                    return <div>{moment(data.transDate).format(DATE_FORMAT)}</div>
                },
            },
            {
                title: 'amount',
                className: "amount-column",
                render: (data: any) => {
                    return <div>{formatNumber(Number((data.amount/MILLION_UNIT).toFixed(2)))}</div>
                },
            },
            {
                title: 'transDesc',
                render: (data: any) => {
                    return <div>{data.transDesc}</div>
                },
            },
            {
                title: 'typeCode',
                render: (data: any) => {
                    return <div>{data.typeCode}</div>
                },
            },
            {
                title: 'typeCodeDesc',
                render: (data: any) => {
                    return <div>{data.typeCodeDesc}</div>
                },
            },
        ]
        return <Modal 
            title="Basic Modal" 
            visible={true} 
            width={800}
            onOk={this.handleOk} 
            onCancel={this.handleCancel}>
                <div>
                    <Table pagination={false} size="small" dataSource={data} columns={columns} />
                </div>
        </Modal>
    }
}