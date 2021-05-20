/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import instance from 'src/connection';

const getMaterialInYearly = () => {
  const materialIn = instance.get('/dashboard/total_material_in_yearly/').then((res) => res.data);
  return materialIn;
};

const getMaterialOutYearly = () => {
  const materialIn = instance.get('/dashboard/total_material_out_yearly/').then((res) => res.data);
  return materialIn;
};

const Sales = (props) => {
  const theme = useTheme();
  const [materialInQty, setMaterialInQty] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [materialOutQty, setMaterialOutQty] = useState([]);

  useEffect(() => {
    getMaterialInYearly().then((values) => {
      setMaterialInQty(values);
      // setMaterialOutQty(values[1]);
    });
    getMaterialOutYearly().then((values) => {
      setMaterialOutQty(values);
      // setMaterialOutQty(values[1]);
    });
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: materialInQty,
        label: 'Material In'
      },
      {
        backgroundColor: colors.green[500],
        data: materialOutQty,
        label: 'Material Out'
      },
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        title="Material Per Month"
      />
      <Divider />
      <CardContent>
        <Box
          style={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default Sales;
