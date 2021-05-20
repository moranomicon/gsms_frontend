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

  // var isUpdated = false;

  const [users, setUsers] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    instance('/users/').then((res) => setUsers(res.data));
  }, []);

  const refreshUsers = () => {
    instance.get('/users/').then((res) => setUsers(res.data));
  };

  const handleRowNew = (newData, resolve) => {
    instance.post('/users/', newData).then(() => refreshUsers());
    resolve();
    enqueueSnackbar(`User ${newData.first_name} ${newData.last_name} Created!`);
  };

  const handleRowDelete = (oldData, resolve) => {
    instance.delete(`/packing-list/${oldData.id}/`).then(() => refreshUsers());
    resolve();
    enqueueSnackbar(`Packing List ${oldData.packing_no} Deleted!`);
  };

  const handleRowUpdate = async (newData, oldData, resolve) => {
    const updatedData = {
      packing_no: newData.packing_no,
      weight: newData.weight,
      weight_out: newData.weight_out,
      material_name: newData.material_name_id ? newData.material_name_id : oldData.material_name.id,
      packing_change_date: newData.packing_change_date
    };
    instance.patch(`/packing-list/${oldData.id}/update_packing_list/`, updatedData).then(() => refreshUsers());
    resolve();
    enqueueSnackbar(`Packing List ${oldData.packing_no} Updated!`);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: 'First Name', field: 'first_name' },
              {
                title: 'Last Name',
                field: 'last_name',
              },
              { title: 'Username', field: 'username' },
            ]}
            data={users}
            title="Users"
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
