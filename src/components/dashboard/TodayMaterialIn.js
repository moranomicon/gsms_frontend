import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import instance from 'src/connection';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const TodayMaterialIn = (props) => {
  const [todayMaterialQty, setMaterialQty] = useState(0);
  useEffect(() => {
    instance
      .get('/dashboard/total_material_in/')
      .then((res) => setMaterialQty(res.data));
  }, []);

  return (
    <Card style={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="subtitle1">
              TODAY MATERIAL IN
            </Typography>
            <Typography color="textPrimary" variant="h2">
              {todayMaterialQty}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: orange[600],
                height: 56,
                width: 56
              }}
            >
              <WbSunnyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          style={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography color="textSecondary" variant="body1">
            KG
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodayMaterialIn;
