import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import instance from 'src/connection';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const TotalPackingList = (props) => {
  const [packingListQty, setPackingListQty] = useState(0);
  useEffect(() => {
    instance
      .get('/dashboard/total_packing_list/')
      .then((res) => setPackingListQty(res.data));
  }, []);

  return (
    <Card style={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="subtitle1">
              TOTAL PACKING LIST
            </Typography>
            <Typography color="textPrimary" variant="h2">
              {packingListQty}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <LocalShippingIcon />
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
            Packing List
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalPackingList;
