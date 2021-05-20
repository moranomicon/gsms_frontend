import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TotalMaterial from 'src/components/dashboard/TotalMaterial';
import TotalMaterialByYear from 'src/components/dashboard/TotalMaterialByYear';
import TotalPackingList from 'src/components/dashboard/TotalPackingList';
import TotalMaterialOut from 'src/components/dashboard/TodayMaterialOut';
import TodayMaterialIn from 'src/components/dashboard/TodayMaterialIn';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalMaterial />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalPackingList />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TodayMaterialIn />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalMaterialOut style={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <TotalMaterialByYear />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
