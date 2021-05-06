import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/material_change_history/Results';

const MaterialChangeHistoryList = () => (
  <>
    <Helmet>
      <title>Material Change History</title>
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

export default MaterialChangeHistoryList;
