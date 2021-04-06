import React from "react";
import { connect } from "react-redux";
import { Button, Input } from "antd";

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
}

class StockDashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            symbolCreate: ''
        }
    }

    componentDidMount() {
        this.props.listStock();
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

    render() {
        const { symbolCreate } = this.state;
        return <div>StockDashboard
            <Input onChange={this.handleChangeInput} onPressEnter={() => this.create(symbolCreate)}/>
            <Button onClick={() => this.create(symbolCreate)}>Create</Button>
        </div>
    }
}

const mapDispatchToProps = {
    listStock,
    createStock
}

export default connect(null,mapDispatchToProps)(StockDashboard);
