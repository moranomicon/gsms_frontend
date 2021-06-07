import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MaterialTable from 'material-table';
import {
  Box, makeStyles, Card, TablePagination
} from '@material-ui/core';
import tableIcons from 'src/utils/icons';
import instance from 'src/connection';
import { useSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [transferLocations] = useState({});

  const [material, setMaterial] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    instance.get('/material/').then((res) => setMaterial(res.data));
    instance.get('/transfer-location/').then((res) => res.data.forEach((element) => {
      transferLocations[element.name] = element.name;
    }));
  }, []);

  const refreshMaterials = () => {
    instance.get('/material/').then((res) => setMaterial(res.data));
  };

  const handleRowNew = (newData, resolve) => {
    instance.post('/material/', newData).then(() => refreshMaterials());
    resolve();
    enqueueSnackbar(`Material ${newData.material_name} Created!`);
  };

  const handleRowDelete = (oldData, resolve) => {
    instance.delete(`/material/${oldData.id}/`).then(() => refreshMaterials());
    resolve();
    enqueueSnackbar(`Material ${oldData.material_name} Deleted!`);
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    if ((newData.material_out || newData.material_in) && !newData.transfer_to) {
      enqueueSnackbar('Please input transfer location!');
    }
    if ((newData.material_out || newData.material_in) && !newData.material_change_date
    ) {
      enqueueSnackbar('Please input change date!');
    } else if (newData.material_out || newData.material_in) {
      confirmAlert({
        title: `Confirm ${newData.material_name}`,
        message: `${(newData.material_out ? `Subtract ${newData.material_out}` : `Add ${newData.material_in}`)} on ${moment(newData.material_change_date).format('DD/MM/YYYY')} to location ${newData.transfer_to} ?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              instance.patch(`/material/${oldData.id}/update_materials/`, newData)
                .then(() => refreshMaterials());
              enqueueSnackbar(`Material ${oldData.material_name} Updated!`);
            }
          },
          {
            label: 'No',
            onClick: () => resolve()
          }
        ]
      });
    } else {
      instance.patch(`/material/${oldData.id}/update_materials/`, newData)
        .then(() => refreshMaterials());
      enqueueSnackbar(`Material ${oldData.material_name} Updated!`);
    }
    resolve();
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: 'Material Name', field: 'material_name' },
              { title: 'Material Quantity', field: 'material_quantity' },
              { title: 'Material In', field: 'material_in', width: 20 },
              { title: 'Material Out', field: 'material_out', width: 20 },
              {
                title: 'Transfer Location',
                field: 'transfer_to',
                lookup: transferLocations
              },
              {
                title: 'Material Change Date',
                field: 'material_change_date',
                type: 'date',
                width: 20,
                render: (rowData) => moment(rowData.material_change_date).format(
                  'DD/MM/YYYY HH:mm:ss'
                )
              },
              {
                title: 'Created At',
                field: 'created_at',
                width: 20,
                editable: false,
                render: (rowData) => moment(rowData.created_at).format('DD/MM/YYYY HH:mm:ss')
              }
            ]}
            data={material}
            components={{
              Pagination: (props) => (
                <TablePagination
                  {...props}
                  count={material.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                />
              )
            }}
            title="Materials"
            options={{
              exportButton: true,
              pageSize: 10
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
