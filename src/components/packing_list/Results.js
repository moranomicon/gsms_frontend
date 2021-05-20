/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
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

  const [packingList, setPackingList] = useState([]);
  const [materialLists] = useState({});
  const [transferLocations] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    instance('/packing-list/').then((res) => setPackingList(res.data));
    instance.get('/material/').then((res) => res.data.forEach((element) => {
      materialLists[element.id] = element.material_name;
    }));
    instance.get('/transfer-location/').then((res) => res.data.forEach((element) => {
      transferLocations[element.name] = element.name;
    }));
  }, []);

  const refreshPackingLists = () => {
    instance.get('/packing-list/').then((res) => setPackingList(res.data));
  };

  const handleRowNew = (newData, resolve) => {
    instance.post('/packing-list/', newData).then(() => refreshPackingLists());
    resolve();
    enqueueSnackbar(`Packing List ${newData.packing_no} Created!`);
  };

  const handleRowDelete = (oldData, resolve) => {
    instance.delete(`/packing-list/${oldData.id}/`).then(() => refreshPackingLists());
    resolve();
    enqueueSnackbar(`Packing List ${oldData.packing_no} Deleted!`);
  };

  const handleRowUpdate = async (newData, oldData, resolve) => {
    const updatedData = {
      packing_no: newData.packing_no,
      weight: newData.weight,
      weight_out: newData.weight_out,
      transfer_to: newData.transfer_to,
      material_name: newData.material_name_id ? newData.material_name_id : oldData.material_name.id,
      packing_change_date: newData.packing_change_date
    };
    instance.patch(`/packing-list/${oldData.id}/update_packing_list/`, updatedData).then(() => refreshPackingLists());
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
              { title: 'Packing No', field: 'packing_no' },
              {
                title: 'Material Name',
                field: 'material_name_id',
                lookup: materialLists,
                render: (rowData) => materialLists[rowData.material_name.id],
                customFilterAndSearch: (term, rowData) => rowData.material_name.material_name.includes(term.toUpperCase())
              },
              { title: 'Weight (KG)', field: 'weight' },
              {
                title: 'Weight Out',
                field: 'weight_out',
              },
              {
                title: 'Transfer To',
                field: 'transfer_to',
                lookup: transferLocations,
              },
              {
                title: 'Packing Change Date', field: 'packing_change_date', type: 'date', width: 20
              },
              {
                title: 'Created At', field: 'created_at', width: 20, editable: false, render: (rowData) => moment(rowData.created_at).format('DD/MM/YYYY HH:mm:ss')
              }
            ]}
            data={packingList}
            title="Packing List"
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
