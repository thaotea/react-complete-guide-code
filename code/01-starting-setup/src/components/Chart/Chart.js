import "./Chart.css";
import ChartBar from "./ChartBar";
const Chart = (props) => {
    // convert objects to array of numbers
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    // spread to pass array as numbers
    const totalMaximum = Math.max(...dataPointValues);

	return (
		<div className="chart">
			{props.dataPoints.map((dataPoint) => (
				<ChartBar
                    key={dataPoint.label}
					value={dataPoint.value}
					maxValue={totalMaximum}
					label={dataPoint.label}
				/>
			))}
		</div>
	);
};

export default Chart;
