import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box
} from '@material-ui/core';
import instance from 'src/connection';
import { indigo } from '@material-ui/core/colors';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';

const TodayMaterialOut = (props) => {
  const [todayMaterialQty, setMaterialQty] = useState(0);
  useEffect(() => {
    instance
      .get('/dashboard/total_material_out/')
      .then((res) => setMaterialQty(res.data));
  }, []);

  return (
    <Card style={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="subtitle1">
              TODAY MATERIAL OUT
            </Typography>
            <Typography color="textPrimary" variant="h2">
              {todayMaterialQty}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56
              }}
            >
              <CallMissedOutgoingIcon />
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

export default TodayMaterialOut;
