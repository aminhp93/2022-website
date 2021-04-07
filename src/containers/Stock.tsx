import React from 'react';
// import StockWatchlist from './StockWatchlist';
import StockDashboard from './StockDashboard';

class Stock extends React.Component {
    render() {
        return <div>
            {/* <StockWatchlist/> */}
            <StockDashboard/>
        </div>
    }
}

export default Stock