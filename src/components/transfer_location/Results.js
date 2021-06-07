import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import tableIcons from 'src/utils/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import instance from 'src/connection';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, ...rest }) => {
  const classes = useStyles();

  const [locations, setLocations] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    instance('/transfer-location/').then((res) => setLocations(res.data));
  }, []);

  const refreshLocations = () => {
    instance.get('/transfer-location/').then((res) => setLocations(res.data));
  };

  const handleRowNew = (newData, resolve) => {
    instance.post('/transfer-location/', newData).then(() => refreshLocations());
    resolve();
    enqueueSnackbar(`Location ${newData.name} Created!`);
  };

  const handleRowDelete = (oldData, resolve) => {
    instance.delete(`/transfer-location/${oldData.name}/`).then(() => refreshLocations());
    resolve();
    enqueueSnackbar(`Location ${oldData.name} Deleted!`);
  };

  const handleRowUpdate = async (newData, oldData, resolve) => {
    const updatedData = {
      description: newData.description,
    };
    instance.patch(`/transfer-location/${oldData.name}/`, updatedData).then(() => refreshLocations());
    resolve();
    enqueueSnackbar(`Location ${oldData.name} Updated!`);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: 'Name', field: 'name' },
              {
                title: 'Description',
                field: 'description',
              },
            ]}
            data={locations}
            title="Transfer Location"
            options={{
              pageSize: 10,
              exportButton: true
            }}
            editable={{
              onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
              onRowAdd: (newData) => new Promise((resolve) => {
                handleRowNew(newData, resolve);
              }),
              onRowDelete: (oldData) => new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
              })
            }}
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
