import React from 'react';
import _ from "lodash";
import { Responsive, WidthProvider } from 'react-grid-layout';

import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import './Test.css';
import Stock from './Stock';


const ResponsiveReactGridLayout = WidthProvider(Responsive);

function generateLayout () {
    return _.map(_.range(0, 1), function(item, i) {
      var y = Math.ceil(Math.random() * 4) + 1;
      return {
        // x: Math.round(Math.random() * 5) * 2,
        // y: Math.floor(i / 6) * y,
        x: 3,
        y: 2,
        w: 2,
        h: 1,
        i: i.toString(),
        // static: Math.random() < 0.05
        static: false
      };
    });
  }

interface Props{
    className: string,
    cols: any,
    onLayoutChange: any,
    rowHeight: number,
};
  interface State {
    currentBreakpoint: string,
    compactType: any,
    mounted: boolean,
    layouts: any,
};
  
  export default class Test extends React.Component<Props, State> {
    
    static defaultProps: Props = {
      className: "layout",
      rowHeight: 400,
      onLayoutChange: function() {},
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    };
  
    state: State = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      mounted: false,
      layouts: { lg: generateLayout() }
    };
  
    componentDidMount() {
      this.setState({ mounted: true });
    }
  
    generateDOM = () => {
      return _.map(this.state.layouts.lg, function(l, i) {
        return (
          <div key={i} className={l.static ? "static" : ""}>
            {l.static ? (
              <span
                className="text"
                title="This item is static and cannot be removed or resized."
              >
                Static - {i}
              </span>
            ) : (
              <Stock/>
            )}
          </div>
        );
      });
    }
  
    onBreakpointChange= (breakpoint: any) => {
      this.setState({
        currentBreakpoint: breakpoint
      });
    };
  
    onCompactTypeChange: () => void = () => {
      const { compactType: oldCompactType } = this.state;
      const compactType =
        oldCompactType === "horizontal"
          ? "vertical"
          : oldCompactType === "vertical"
          ? null
          : "horizontal";
      this.setState({ compactType });
    };
  
    onLayoutChange = (layout: any, layouts: any) => {
      this.props.onLayoutChange(layout, layouts);
    };
  
    onNewLayout = () => {
      this.setState({
        layouts: { lg: generateLayout() }
      });
    };
  
    onDrop: (layout: any, item: any, e: any) => void = (elemParams) => {
      alert(`Element parameters: ${JSON.stringify(elemParams)}`);
    };

    render() {
      // eslint-disable-next-line no-unused-vars
      return (
        <div>
          <div>
            Current Breakpoint: {this.state.currentBreakpoint} (
            {this.props.cols[this.state.currentBreakpoint]} columns)
          </div>
          <div>
            Compaction type:{" "}
            {_.capitalize(this.state.compactType) || "No Compaction"}
          </div>
          <button onClick={this.onNewLayout}>Generate New Layout</button>
          <button onClick={this.onCompactTypeChange}>
            Change Compaction Type
          </button>
          <ResponsiveReactGridLayout
            {...this.props}
            layouts={this.state.layouts}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}
            onDrop={this.onDrop}
            // WidthProvider option
            measureBeforeMount={false}
            // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
            // and set `measureBeforeMount={true}`.
            useCSSTransforms={this.state.mounted}
            compactType={this.state.compactType}
            preventCollision={!this.state.compactType}
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      );
    }
    
  }
  

  