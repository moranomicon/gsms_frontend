import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MaterialTable from 'material-table';
import {
  Box,
  makeStyles,
  Card
} from '@material-ui/core';
import tableIcons from 'src/utils/icons';
import instance from 'src/connection';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
  }
}));

const Results = ({ className, ...rest }) => {
  const classes = useStyles();

  const [packingListChangeHistory, setPackingListChangeHistory] = useState([]);

  useEffect(() => {
    instance
      .get('/packinglist-change-history/')
      .then((res) => setPackingListChangeHistory(res.data));
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <MaterialTable
            icons={tableIcons}
            columns={[{ title: 'Packing No', field: 'packing_list.packing_no' },
              { title: 'Old Weight', field: 'old_weight' },
              { title: 'Weight Out', field: 'weight_out', width: 20 },
              { title: 'Transfer To', field: 'transfer_to', width: 20 },
              {
                title: 'Packing Change Date', field: 'packing_change_date', width: 20, editable: false, render: (rowData) => moment(rowData.packing_change_date).format('DD/MM/YYYY')
              },
              {
                title: 'Created At', field: 'created_at', width: 20, editable: false, render: (rowData) => moment(rowData.created_at).format('DD/MM/YYYY HH:mm:ss')
              },
            ]}
            data={packingListChangeHistory}
            title="Packing List Change History"
            options={{
              pageSize: 10,
              exportButton: true
            }}
            editable={false}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
