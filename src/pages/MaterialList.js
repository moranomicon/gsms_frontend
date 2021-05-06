import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/material/Results';

const MaterialListView = () => (
  <>
    <Helmet>
      <title>Materials</title>
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

export default MaterialListView;
