import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { keyBy } from 'lodash';

const LIST_THANH_KHOAN_LON = "AAAABBACBACVAGGAGRAMDANVAPHASMBCCBCGBFCBIDBMIBMPBSIBSRBVBBVHBVSBWEC4GCKGCRECSVCTGCTRCTSD2DDBCDCLDCMDDGDGCDGWDHCDIGDPMDRCDVNDXGEIBEVFEVGFCNFLCFMCFPTFRTFTSGASGEXGILGMDGVRHAGHAHHBCHCMHDBHDCHDGHHSHNDHPGHPXHSGHT1HTNHUTHVNIDCIDIIJCITAKDCKDHKLBKSBLASLCGLDGLHGLPBLTGMBBMBSMIGMSBMSNMWGNABNKGNLGNTLNVBNVLOCBOILORSPC1PDRPETPGBPHRPLCPLXPNJPOMPOWPPCPTBPVDPVPPVSPVTQNSREESBTSCRSGPSHBSHISHSSJSSMCSSBSSISTBSZCTCBTCMTDCTDMTIGTIPTLHTNGTPBTSCTTFTV2TVBTVNVCBVCGVCIVCRVCSVEAVGCVGTVHCVHMVIBVICVIXVNDVOCVPBVPGVRE"
const LIST_AIM_TO_BUY = ""
const LIST_WATCHING = ""

interface IProps {

}

interface IState {
    listWatchlists: any;
}

class Tool extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            listWatchlists: []
        }
    }

    componentDidMount() {
        this.getWatchlist()
    }

    update = (str: string, id: number, name: string) => {
        const symbols = str.match(/.{1,3}/g)
        axios({
            method: "PUT",
            url: `https://restv2.fireant.vn/me/watchlists/${id}`,
            headers: {
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNzE1ODY4LCJuYmYiOjE2MTM3MTU4NjgsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM3MTU4NjcsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiYzZmNmNkZWE2MTcxY2Q5NGRiNWZmOWZkNDIzOWM0OTYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.oZ8S_sTP6qVRJqY4h7g0JvXVPB0k8tm4go9pUFD0sS_sDZbC6zjelAVVNGHWJja82ewJbUEmTJrnDWAKR-rg5Pprp4DW7MzaN0lw3Bw0wEacphtyglx-H14-0Wnv_-2KMyQLP5EYH8wgyiw9I3ig_i7kHJy-XgCd__tdoMKvarkIXPzJJJY32gq-LScWb3HyZsfEdi-DEZUUzjAHR1nguY8oNmCiA6FaQCzOBU_qfgmOLWhN9ZNN1G3ODAeoOnphLJuWjHIrwPuVXy6B39eU2PtHmujtw_YOXdIWEi0lRhqV1pZOrJEarQqjdV3K5XNwpGvONT8lvUwUYGoOwwBFJg"
            },
            data: {
                name,
                symbols: symbols || [],
                userName: "minhpn.org.ec1@gmail.com",
                watchlistID: id,
            }
        })
    }

    updateLocal = () => {
        const { listWatchlists } = this.state;
        const objWatchlists = keyBy(listWatchlists, 'watchlistID')
        const list_thanh_khoan_lon = objWatchlists[365074]
        const strSymbols = list_thanh_khoan_lon && list_thanh_khoan_lon.symbols
        axios({
            method: "POST",
            url: `http://localhost:8001/api/stock/update-list-is-high-liquidity/`,
            data: { strSymbols }
        })
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

    render() {
        return <div>
            <Button onClick={() => this.update(LIST_THANH_KHOAN_LON, 365074, "thanh_khoan_lon")}>Update list thanh_khoan_lon</Button>
            <Button danger onClick={() => this.update("", 365074, "thanh_khoan_lon")}>Clear</Button>
            <Button onClick={() => this.updateLocal()}>Update to local db</Button>
            <hr/>
            <Button onClick={() => this.update(LIST_AIM_TO_BUY, 396060, "aim_to_buy")}>Update list aim_to_buy</Button>
            <Button danger onClick={() => this.update("", 396060, "aim_to_buy")}>Clear</Button>
            <hr/>
            <Button onClick={() => this.update(LIST_WATCHING, 75482, "watching")}>Update list watching</Button>
            <Button danger onClick={() => this.update("", 75482, "watching")}>Clear</Button>
            <hr/>
            <div>
                <div>
                    Loc co ban hang thang
                </div>
                <div>
                    {`Step 1: Loc Realtime tren Fireant: https://fireant.vn/top-symbols`}
                    <div>{`- Niem yet tren HSX, HNX, UPCOM`}</div>
                    <div>{`- Thi gia von > 1000`}</div>
                    <div>{`- KLTB 20 phien > 100000`}</div>
                    <div>{`- Gia hien tai > 5`}</div>
                </div>
                <div>
                    {`Step2: Loc them KLGD > 10ty/phien`}
                    <div>{`- Ra duoc list thanh_khoan_lon va daily`}</div>
                    <div>{`- Update list thanh_khoan_lon vao ami`}</div>
                </div>
                <div>
                    {`Step3: Loc chart xau --> daily`}
                    <div>{`Vao Ami xoa chart xau`}</div>
                    <div>{`Vao tool xoa BCTC hoac chi co co ban xau`}</div>
                </div>
            </div>
        </div>
    }
}

export default Tool