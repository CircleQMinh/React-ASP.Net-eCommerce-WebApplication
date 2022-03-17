import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
} from "victory";
import { formatCurrencyVN } from "../../../utils/index";
import { React, Fragment } from "react";

function OrderChart(props) {
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
      >
        <VictoryAxis
          tickValues={data.map((d) => d.x)}
          tickFormat={(t) => returnSMT(t)}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x } đơn`} />

        <VictoryLine
          style={{
            data: { stroke: "blue" },
          }}
          data={data}
          x="date"
          y="total"
          labels={data.map((d) => d.total + " đơn" )}
          labelComponent={
            <VictoryLabel
              angle={0}
              textAnchor="middle"
              style={[{ fill: "red" }]}
            />
          }
        />
        {/* //<VictoryBar data={data} x="date" y="total" /> */}
      </VictoryChart>
    </Fragment>
  );
}

export default OrderChart;
