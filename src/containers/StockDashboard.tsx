import React from "react";
import { connect } from "react-redux";
import { Button, Input, Table } from "antd";
import axios from "axios";

import {
    listStock,
    createStock
} from '../reducers/stock';

interface IProps {
    listStock: any;
    createStock: any;
}

interface IState {
    symbolCreate: any;
    listStock: any;
}

class StockDashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            symbolCreate: '',
            listStock: []
        }
    }

    async componentDidMount() {
        const res = await this.props.listStock();
        if (res && res.data) {
            this.setState({ 
                listStock: res.data
            })
            this.getMoreData(res.data)
        }
    }

    getMoreData = (data: any) => {
        const listSymbol = data.map((i: any) => i.symbol)
        const listPromises: any = [];
        listSymbol.map((j: any) => {
            listPromises.push(this.getFinancialIndicators(j))
        })
        Promise.all(listPromises).then((j: any) => {
            console.log(j)
            // this.setState({
            //     nganh_ck: j.sort((a: any, b: any) => b.percentChange - a.percentChange)
            // })
        })

    }

    getFinancialIndicators = (symbol: string) => {
        if (!symbol) return
        return axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNjIzMDMyLCJuYmYiOjE2MTM2MjMwMzIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM2MjMwMzIsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiZmIyZWJkNzAzNTBiMDBjMGJhMWE5ZDA5NGUwNDMxMjYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.OhgGCRCsL8HVXSueC31wVLUhwWWPkOu-yKTZkt3jhdrK3MMA1yJroj0Y73odY9XSLZ3dA4hUTierF0LxcHgQ-pf3UXR5KYU8E7ieThAXnIPibWR8ESFtB0X3l8XYyWSYZNoqoUiV9NGgvG2yg0tQ7lvjM8UYbiI-3vUfWFsMX7XU3TQnhxW8jYS_bEXEz7Fvd_wQbjmnUhQZuIVJmyO0tFd7TGaVipqDbRdry3iJRDKETIAMNIQx9miHLHGvEqVD5BsadOP4l8M8zgVX_SEZJuYq6zWOtVhlq3uink7VvnbZ7tFahZ4Ty4z8ev5QbUU846OZPQyMlEnu_TpQNpI1hg"
            },
            url: `https://restv2.fireant.vn/symbols/${symbol}/financial-indicators`
        }).then((res: any) => {
            // console.log(res.data)
            let ROE = (res.data.filter((i: any) => i.symbol === "ROE")[0] || {}).value
            
            return { symbol, ROE }
        }).catch((e: any) => {
            console.log(e)
        })
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

    renderListStock = () => {
        const { listStock } = this.state;
        const dataSource = listStock
            
          
        const columns = [
            {
                title: 'symbol',
                render: (data: any) => {
                    return data.symbol
                }
            },
            {
                title: 'percent_support',
                render: (data: any) => {
                    return data.percent_support
                }
            },
            {
                title: 'percent_target',
                render: (data: any) => {
                    return data.percent_target
                }
            },
            {
                title: 'profit_loss_ratio',
                render: (data: any) => {
                    return data.profit_loss_ratio
                }
            },
            {
                title: 'support_price',
                render: (data: any) => {
                    return data.support_price
                }
            },
            {
                title: 'target_price',
                render: (data: any) => {
                    return data.target_price
                }
            },
            {
                title: 'ROE',
                render: (data: any) => {
                    return data.ROE
                }
            }
        ];
          
        return <Table
            className="StockDashboard-table"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="small" />;
    }

    render() {
        const { symbolCreate } = this.state;
        return <div>StockDashboard
            <Input onChange={this.handleChangeInput} onPressEnter={() => this.create(symbolCreate)}/>
            <Button onClick={() => this.create(symbolCreate)}>Create</Button>
            <Button onClick={() => this.updateListStock()}>Update list stock</Button>
            {this.renderListStock()}
        </div>
    }
}

const mapDispatchToProps = {
    listStock,
    createStock
}

export default connect(null,mapDispatchToProps)(StockDashboard);
