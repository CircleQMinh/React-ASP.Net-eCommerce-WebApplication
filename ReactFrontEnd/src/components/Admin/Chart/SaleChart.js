import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
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
        domainPadding={20}
      >
        <VictoryAxis
          tickValues={data.map((d) => d.x)}
          tickFormat={(t) => returnSMT(t)}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
        <VictoryBar data={data} x="date" y="total" />
      </VictoryChart>
    </Fragment>
  );
}

export default SaleChart;
