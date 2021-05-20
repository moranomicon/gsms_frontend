import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/transfer_location/Results';

const TransferLocations = () => (
  <>
    <Helmet>
      <title>Transfer Locations</title>
    </Helmet>
    <Box
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box style={{ pt: 3 }}>
          <Results />
        </Box>
      </Container>
    </Box>
  </>
);

export default TransferLocations;
