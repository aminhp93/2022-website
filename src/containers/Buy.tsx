import React from 'react';
import { Input } from 'antd';

class Buy extends React.Component {


    render() {
        return <div>
           <Input placeholder="Symbol" onPressEnter={() => {}}/>
           <div>
               <div>Checking condition</div>
               <div>
                   {`Thi truong chung: VNindex > MA30`}
                   {`% gia so voi trung binh 30 phien`}
               </div>
               <div>
                   {`Thong tin co ban:`}
                   {`Von hoa, Doanh thu, LN, ROE, EPS`}
               </div>
               <div>
                   {`Li do mua:`}
               </div>
               <div>
                   {`% gia hien tai`}
                   {`% KL hien tai (so vs trung binh 15 phien)`}
               </div>
                <div>
                    {`LN/RR`}
                </div>
                <div>
                    {`So sanh vs cung nganh`}
                </div>
           </div>
        </div>
    }
}

export default Buy
