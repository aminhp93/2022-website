import React from 'react';
import axios from 'axios';
import { Button } from 'antd';


class Tool extends React.Component {

    updateThanhKhoanLonVaKyThuatDep = () => {
        const str = 'AAAACBACVAGGAGRANVASMBCCBCGBFCBIDBMIBMPBSIBSRBVHBVSBWEC4GCCLCEOCIICKGCRECSVCTDCTGCTICTRCTSD2DDBCDCLDCMDGCDGWDHCDIGDPGDPMDRCDRHDVNDXGELCEVGFCNFPTFRTFTSG36GASGILGMDGTNGVRHAGHAHHAXHBCHCMHDBHDCHDGHHSHIIHPGHPXHSGHT1HTNHUTHVNIDCIDIIDJIJCILBIMPITAKBCKDCKDHKSBLASLCGLHGLPBLSSLTGMBBMBSMIGMPCMSNMSRMWGNHANKGNLGNTCNTLNVLOILPANPC1PETPHRPLCPLXPNJPOMPOWPTBPVCPVDPVPPVSPVTQNSREES99SBTSCRSGPSGTSHBSHSSIPSJSSMCSSISTBSTKSZCTCBTDCTIPTNGTNHTPBTV2TVNVCBVCGVCIVCRVCSVEAVGCVGIVGSVGTVIBVIXVJCVNDVNMVPBVPG';
        const symbols = str.match(/.{1,3}/g)
        axios({
            method: "PUT",
            url: `https://restv2.fireant.vn/me/watchlists/${394713}`,
            headers: {
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNzE1ODY4LCJuYmYiOjE2MTM3MTU4NjgsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM3MTU4NjcsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiYzZmNmNkZWE2MTcxY2Q5NGRiNWZmOWZkNDIzOWM0OTYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.oZ8S_sTP6qVRJqY4h7g0JvXVPB0k8tm4go9pUFD0sS_sDZbC6zjelAVVNGHWJja82ewJbUEmTJrnDWAKR-rg5Pprp4DW7MzaN0lw3Bw0wEacphtyglx-H14-0Wnv_-2KMyQLP5EYH8wgyiw9I3ig_i7kHJy-XgCd__tdoMKvarkIXPzJJJY32gq-LScWb3HyZsfEdi-DEZUUzjAHR1nguY8oNmCiA6FaQCzOBU_qfgmOLWhN9ZNN1G3ODAeoOnphLJuWjHIrwPuVXy6B39eU2PtHmujtw_YOXdIWEi0lRhqV1pZOrJEarQqjdV3K5XNwpGvONT8lvUwUYGoOwwBFJg"
            },
            data: {
                name: "thanh_khoan_lon_va_ky_thuat_dep",
                symbols,
                userName: "minhpn.org.ec1@gmail.com",
                watchlistID: 394713,
            }
        })
    }

    updateThanhKhoanLon = () => {
        const str = 'AAAABBACBACVADGAGGAGRAMVANVAPHASMBCCBCGBCMBFCBIDBMIBMPBSIBSRBVBBVHBVSBWEC4GCCLCEOCIICKGCRECSVCTDCTFCTGCTICTRCTSD2DDBCDCLDCMDDVDGCDGWDHCDIGDPGDPMDRCDRHDVNDXGEIBELCEVFEVGFCNFITFLCFMCFPTFRTFTSG36GASGEGGEXGILGMDGTNGVRHAGHAHHAXHBCHCMHDBHDCHDGHHSHIIHNDHNGHPGHPXHSGHT1HTNHUTHVNIBCIDCIDIIDJIJCILBIMPITAKBCKDCKDHKOSKSBL14LASLCGLDGLHGLIXLPBLSSLTGMBBMBSMIGMPCMSBMSNMSRMWGNAFNDNNHANHHNKGNLGNRCNT2NTCNTLNVBNVLOCBOGCOILPANPC1PDRPETPGCPHRPLCPLXPNJPOMPOWPPCPSHPTBPVCPVDPVMPVPPVSPVTQCGQNSQTPREES99SABSAMSBSSBTSCISCRSGPSGTSHBSHISHSSIPSJSSMCSSISTBSTKSZCTARTCBTCHTCMTDCTDHTDMTDPTHDTIDTIGTIPTLHTNGTNHTPBTTATTFTV2TVNVC3VCBVCGVCIVCRVCSVDSVEAVGCVGIVGSVGTVHCVHMVIBVICVIPVIXVJCVNDVNGVNMVOCVPBVPGVPIVREVTP';
        const symbols = str.match(/.{1,3}/g)
        axios({
            method: "PUT",
            url: `https://restv2.fireant.vn/me/watchlists/${365074}`,
            headers: {
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNzE1ODY4LCJuYmYiOjE2MTM3MTU4NjgsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM3MTU4NjcsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiYzZmNmNkZWE2MTcxY2Q5NGRiNWZmOWZkNDIzOWM0OTYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.oZ8S_sTP6qVRJqY4h7g0JvXVPB0k8tm4go9pUFD0sS_sDZbC6zjelAVVNGHWJja82ewJbUEmTJrnDWAKR-rg5Pprp4DW7MzaN0lw3Bw0wEacphtyglx-H14-0Wnv_-2KMyQLP5EYH8wgyiw9I3ig_i7kHJy-XgCd__tdoMKvarkIXPzJJJY32gq-LScWb3HyZsfEdi-DEZUUzjAHR1nguY8oNmCiA6FaQCzOBU_qfgmOLWhN9ZNN1G3ODAeoOnphLJuWjHIrwPuVXy6B39eU2PtHmujtw_YOXdIWEi0lRhqV1pZOrJEarQqjdV3K5XNwpGvONT8lvUwUYGoOwwBFJg"
            },
            data: {
                name: "thanh_khoan_lon",
                symbols,
                userName: "minhpn.org.ec1@gmail.com",
                watchlistID: 365074,
            }
        })
    }

    updateAimToBuy = () => {
        const str = 'AGRANVBMIBSID2DDBCDCLDGWG36GVRHIIIDJKBCLCGLHGLTGNLGPHRPLCPLXPVSPVTSBTSCRVEAVGC';
        const symbols = str.match(/.{1,3}/g)
        axios({
            method: "PUT",
            url: `https://restv2.fireant.vn/me/watchlists/${396060}`,
            headers: {
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNzE1ODY4LCJuYmYiOjE2MTM3MTU4NjgsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM3MTU4NjcsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiYzZmNmNkZWE2MTcxY2Q5NGRiNWZmOWZkNDIzOWM0OTYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.oZ8S_sTP6qVRJqY4h7g0JvXVPB0k8tm4go9pUFD0sS_sDZbC6zjelAVVNGHWJja82ewJbUEmTJrnDWAKR-rg5Pprp4DW7MzaN0lw3Bw0wEacphtyglx-H14-0Wnv_-2KMyQLP5EYH8wgyiw9I3ig_i7kHJy-XgCd__tdoMKvarkIXPzJJJY32gq-LScWb3HyZsfEdi-DEZUUzjAHR1nguY8oNmCiA6FaQCzOBU_qfgmOLWhN9ZNN1G3ODAeoOnphLJuWjHIrwPuVXy6B39eU2PtHmujtw_YOXdIWEi0lRhqV1pZOrJEarQqjdV3K5XNwpGvONT8lvUwUYGoOwwBFJg"
            },
            data: {
                name: "aim_to_buy",
                symbols,
                userName: "minhpn.org.ec1@gmail.com",
                watchlistID: 396060,
            }
        })
    }

    updateWatching = () => {
        const str = 'TARCTSPOWNLG';
        const symbols = str.match(/.{1,3}/g)
        axios({
            method: "PUT",
            url: `https://restv2.fireant.vn/me/watchlists/${75482}`,
            headers: {
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxOTEzNzE1ODY4LCJuYmYiOjE2MTM3MTU4NjgsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIxZmI5NjI3Yy1lZDZjLTQwNGUtYjE2NS0xZjgzZTkwM2M1MmQiLCJhdXRoX3RpbWUiOjE2MTM3MTU4NjcsImlkcCI6IkZhY2Vib29rIiwibmFtZSI6Im1pbmhwbi5vcmcuZWMxQGdtYWlsLmNvbSIsInNlY3VyaXR5X3N0YW1wIjoiODIzMzcwOGUtYjFjOS00ZmQ3LTkwYmYtMzI2NTYzYmU4N2JkIiwianRpIjoiYzZmNmNkZWE2MTcxY2Q5NGRiNWZmOWZkNDIzOWM0OTYiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.oZ8S_sTP6qVRJqY4h7g0JvXVPB0k8tm4go9pUFD0sS_sDZbC6zjelAVVNGHWJja82ewJbUEmTJrnDWAKR-rg5Pprp4DW7MzaN0lw3Bw0wEacphtyglx-H14-0Wnv_-2KMyQLP5EYH8wgyiw9I3ig_i7kHJy-XgCd__tdoMKvarkIXPzJJJY32gq-LScWb3HyZsfEdi-DEZUUzjAHR1nguY8oNmCiA6FaQCzOBU_qfgmOLWhN9ZNN1G3ODAeoOnphLJuWjHIrwPuVXy6B39eU2PtHmujtw_YOXdIWEi0lRhqV1pZOrJEarQqjdV3K5XNwpGvONT8lvUwUYGoOwwBFJg"
            },
            data: {
                name: "watching",
                symbols,
                userName: "minhpn.org.ec1@gmail.com",
                watchlistID: 75482,
            }
        })
    }

    render() {
        return <div>
            <Button onClick={this.updateThanhKhoanLonVaKyThuatDep}>Update list thanh_khoan_lon_va_ky_thuat_dep</Button>
            <Button onClick={this.updateThanhKhoanLon}>Update list thanh_khoan_lon</Button>
            <Button onClick={this.updateAimToBuy}>Update list aim_to_buy</Button>
            <Button onClick={this.updateWatching}>Update list watching</Button>
        </div>
    }
}

export default Tool