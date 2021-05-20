import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import GridOnIcon from '@material-ui/icons/GridOn';
import instance from 'src/connection';

const TotalMaterial = (props) => {
  const [materialQty, setMaterialQty] = useState(0);
  useEffect(() => {
    instance.get('/dashboard/total_material/').then((res) => setMaterialQty(res.data));
  }, []);

  return (
    <Card
      style={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          style={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL MATERIAL
            </Typography>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              {materialQty}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar style={{
              height: 56,
              width: 56
            }}
            >
              <GridOnIcon />
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
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Types
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalMaterial;
