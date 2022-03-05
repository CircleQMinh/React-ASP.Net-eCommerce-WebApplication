import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryGroup,
} from "victory";
import { formatCurrencyVN } from "../../../utils/index";
import { React, Fragment } from "react";

function TopProductChart(props) {
  var productData = props.productData;
 // console.log(productData);

  var data = [];
  productData.forEach((item) => {
    var info = { x: item.book.title, y: item.sales };
    data.push(info);
  });

  data = data.sort((a, b) => a.sales - b.sales);



  function returnSMT(value) {
    return value;
  }

  return (
    <Fragment>
      <VictoryChart
        width={400}
        theme={VictoryTheme.material}
        domainPadding={40}
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
          <VictoryBar data={data} sortKey={"sales"} />
        </VictoryGroup>
      </VictoryChart>
    </Fragment>
  );
}

export default TopProductChart;
