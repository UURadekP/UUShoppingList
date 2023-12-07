
import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const PieChartComponent = (props) => {
    return (
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: props.completed, label: 'Completed', color:'green' },
                { id: 1, value: props.notCompleted, label: 'Not Completed', color:'red' },
              ],
            },
          ]}
          width={250}
          height={250}
        />
    );
}

export default PieChartComponent;