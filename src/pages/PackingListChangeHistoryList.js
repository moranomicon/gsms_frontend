import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/packing_list_change_history/Results';

const PackingListChangeHistory = () => (
  <>
    <Helmet>
      <title>Packing List Change History</title>
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

export default PackingListChangeHistory;
