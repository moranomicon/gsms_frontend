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

  const [materialChangeHistory, setMaterialChangeHistory] = useState([]);

  useEffect(() => {
    instance
      .get('/material-change-history/')
      .then((res) => setMaterialChangeHistory(res.data));
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <MaterialTable
            icons={tableIcons}
            columns={[{ title: 'Material Name', field: 'material_name.material_name' },
              { title: 'Material Old Quantity', field: 'material_old_quantity' },
              { title: 'Material In', field: 'material_in_qty', width: 20 },
              { title: 'Material Out', field: 'material_out_qty', width: 20 },
              { title: 'Transfer To', field: 'transfer_to', width: 20 },
              {
                title: 'Material Change Date', field: 'material_change_date', width: 20, render: (rowData) => moment(rowData.material_change_date).format('DD/MM/YYYY')
              },
              {
                title: 'Created At', field: 'created_at', width: 20, render: (rowData) => moment(rowData.created_at).format('DD/MM/YYYY HH:mm:ss')
              },
            ]}
            data={materialChangeHistory}
            title="Material Change History"
            options={{
              pageSize: 10,
              exportButton: true,
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
