import React from "react";
import { PieChart } from "react-native-svg-charts";
import {  G, Line, Text } from "react-native-svg";
import { TSpan } from "react-native-svg";

const PieChartWithLabelExample  = () => {
  
    const data = [50, 40, 30, 40, 70];

    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    const pieData = data
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
        },
        key: `pie-${index}`,
      }));

    const Labels = ({ slices }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;

    const angle = (slice.startAngle + slice.endAngle + 20 ) / 2;
    const radius = 60; // Adjust this value to control the distance between label and pie chart
    const distanceFromCircle = 5; // Adjust this value to control the distance from the circle

    // Calculate the adjusted coordinates for the label
    const labelX = pieCentroid[0] + Math.cos(angle) * (radius + distanceFromCircle);
    const labelY = pieCentroid[1] + Math.sin(angle) * (radius + distanceFromCircle);

    return (
      <G key={index}>
        <Line x1={pieCentroid[0]} y1={pieCentroid[1]} x2={labelX} y2={labelY} stroke={data.svg.fill} />
        <Text x={labelX} y={labelY} textAnchor="middle">
          <TSpan>{'Value : ' + data.value}</TSpan>
        </Text>
      </G>
    );
      });
    };

    return (
      <PieChart
        style={{
          height: 240,
          marginTop: 200,
          backgroundColor: "#fff",
        }}
        data={pieData}
        innerRadius="30%"
            outerRadius={60}
            labelRadius={70}
            padAngle={0}
        
      >
        <Labels />
      </PieChart>
    );
  
}

export default PieChartWithLabelExample;
