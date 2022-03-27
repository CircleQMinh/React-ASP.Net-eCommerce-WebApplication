import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryGroup,
  VictoryTooltip
} from "victory";
import { formatCurrencyVN } from "../../../utils/index";
import { React, Fragment } from "react";

function TopProductChart(props) {
  var productData = props.productData;

  var data = [];
  productData.forEach((item) => {
    var info = { x: item.book.title, y: item.sales, label: item.book.title };
    data.push(info);
  });

  data = data.sort((a, b) => a.y - b.y);
  function returnSMT(value) {
    if (value.length > 20) {
      return value.slice(0,17) + "..."
    }
    return value;
  }

  return (
    <Fragment>
      <VictoryChart
        width={800}
        theme={VictoryTheme.material}
        domainPadding={40}
        padding={{ left: 160, right: 50, bottom: 30, top: 10 }}
      >
        <VictoryAxis
          tickValues={data.map((d) => d.x)}
          tickFormat={(t) => returnSMT(t)}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x }`} />
        <VictoryGroup
          horizontal
          
          offset={10}
          style={{ data: { width: 10 } }}
          colorScale={["brown", "tomato", "gold"]}
        >
          <VictoryBar 
            data={data} 
            sortKey={"sales"} 
            barWidth={15}
            // labels={({ datum }) => `${datum.y}`}
            labelComponent={<VictoryTooltip/>}
          />
        </VictoryGroup>
      </VictoryChart>
    </Fragment>
  );
}

export default TopProductChart;
