
import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import useWindowDimensions from './getWindowSize'



const PieChartComponent = (props) => {

  let width = useWindowDimensions().width
  let height = useWindowDimensions().height

  const size = {
    width: width > height ? width*0.25 : width*0.425,
    height: width > height ? height*0.5 : height*0.125,
    legend: { hidden: true },
  }

    return (
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: props.completed, label: 'Done', color:'green' },
                { id: 1, value: props.notCompleted, label: 'Not Done', color:'red' },
                
              ],
            },
          ]}
          {...size}
        />
    );
}

export default PieChartComponent;