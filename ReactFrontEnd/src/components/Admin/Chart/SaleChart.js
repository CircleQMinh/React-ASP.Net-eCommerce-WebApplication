import {
  VictoryBar,
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import { formatCurrencyVN } from "../../../utils";
import { color } from "../../../utils/constant";
import { React, Fragment } from "react";

function SaleChart(props) {
  var data = props.data;
  
  function returnSMT(value) {
    return value.substring(0, 10);
  }

  return (
    <Fragment>
      <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={40}
        width={800}
        padding={{ left: 80, right: 50, bottom: 10 }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${formatCurrencyVN(datum.total)} VNĐ`}
          />
        }
      >
        <defs>
          <linearGradient id="gradientStroke" x1="0%" x2="0%" y1="10%" y2="100%">
              <stop offset="0%" stopColor={color.primary} stopOpacity="0.4" />
              <stop offset="70%" stopColor={color.primary} stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <VictoryAxis
          tickValues={data.map((d) => d.x)}
          tickFormat={(t) => returnSMT(t)}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `${x / 1000}k VND`}
        />

        <VictoryArea
          interpolation="monotoneX"
          style={{
            data: {
                fill: "url(#gradientStroke)",
                stroke: color.primary,
                strokeWidth: 2,
            },
          }}
          data={data}
          x="date"
          y="total"
          // labels={data.map((d) => formatCurrencyVN(d.total) + " đ")}
          // labelComponent={<VictoryTooltip/>}
          // labelComponent={
          //   <VictoryLabel
          //     angle={0}
          //     textAnchor="middle"
          //     style={[{ fill: "red" }]}
          //   />
          // }
        />
        {/* //<VictoryBar data={data} x="date" y="total" /> */}
      </VictoryChart>
    </Fragment>
  );
}

export default SaleChart;
