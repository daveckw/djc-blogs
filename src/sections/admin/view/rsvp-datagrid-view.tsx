'use client';

import type {
  GridColDef,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { useMemo, useState, useEffect } from 'react';
import {
  doc,
  query,
  where,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
} from 'firebase/firestore';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { db } from 'src/lib/firebase';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomGridActionsCellItem } from 'src/components/custom-data-grid';

// ----------------------------------------------------------------------

type RSVPData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  adults: number;
  kids: number;
  date: Date;
  createdAt: Date;
};

const getColumns = (handleEditClick: (rsvp: RSVPData) => void): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 160,
    hideable: false,
    renderCell: (params) => (
      <Box sx={{ gap: 2, width: 1, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 'bold',
            fontSize: '0.875rem',
          }}
        >
          {params.row.name.charAt(0).toUpperCase()}
        </Box>
        <Typography component="span" variant="body2" noWrap>
          {params.row.name}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 200,
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: 'primary.main' }}>
        {params.row.email}
      </Typography>
    ),
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 140,
    renderCell: (params) => <Typography variant="body2">{params.row.phone}</Typography>,
  },
  {
    field: 'adults',
    headerName: 'Adults',
    type: 'number',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          bgcolor: 'primary.lighter',
          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        {params.row.adults}
      </Box>
    ),
  },
  {
    field: 'kids',
    headerName: 'Kids',
    type: 'number',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          bgcolor: 'secondary.lighter',
          color: 'secondary.main',
          fontWeight: 'bold',
        }}
      >
        {params.row.kids}
      </Box>
    ),
  },
  {
    field: 'total',
    headerName: 'Total',
    type: 'number',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (value, row) => {
      const adults = typeof row.adults === 'number' ? row.adults : 0;
      const kids = typeof row.kids === 'number' ? row.kids : 0;
      return adults + kids;
    },
    renderCell: (params) => (
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          bgcolor: 'success.lighter',
          color: 'success.main',
          fontWeight: 'bold',
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: 'date',
    headerName: 'RSVP Date',
    type: 'dateTime',
    width: 180,
    align: 'center',
    headerAlign: 'center',

    renderCell: (params) => {
      if (!params.value || !(params.value instanceof Date)) {
        return (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            N/A
          </Typography>
        );
      }

      const date = params.value;
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      return (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {`${day}-${month}-${year} ${time}`}
        </Typography>
      );
    },
  },
  {
    type: 'actions',
    field: 'actions',
    headerName: 'Actions',
    align: 'right',
    headerAlign: 'right',
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    getActions: (params) => [
      <CustomGridActionsCellItem
        showInMenu
        label="Edit RSVP"
        icon={<Iconify icon="solar:pen-bold" />}
        onClick={() => handleEditClick(params.row)}
      />,
      <CustomGridActionsCellItem
        showInMenu
        label="Delete RSVP"
        icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        onClick={async () => {
          if (confirm(`Are you sure you want to delete ${params.row.name}'s RSVP?`)) {
            try {
              await deleteDoc(doc(db, 'rsvps', params.row.id));
            } catch (error) {
              console.error('Error deleting RSVP:', error);
              alert('Failed to delete RSVP');
            }
          }
        }}
        style={{ color: 'var(--palette-error-main)' }}
      />,
    ],
  },
];

const HIDE_COLUMNS = { id: false };

function CustomToolbar() {
  return (
    <Box
      sx={{
        gap: 1,
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Party RSVPs
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          startIcon={<Iconify icon="solar:eye-bold" />}
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </Stack>
    </Box>
  );
}

export function RSVPDatagridView() {
  const theme = useTheme();
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);
  const [editOpen, setEditOpen] = useState(false);
  const [editingRsvp, setEditingRsvp] = useState<RSVPData | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    adults: 0,
    kids: 0,
  });

  useEffect(() => {
    const collectionRef = collection(db, 'rsvps');
    const q = query(collectionRef, where('birthdayBoy', '==', 'chong-ting-xuan'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rsvpData: RSVPData[] = [];
        snapshot.docs.forEach((docSnapshot) => {
          const data = docSnapshot.data();
          rsvpData.push({
            id: docSnapshot.id,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            adults: data.adults || 0,
            kids: data.kids || 0,
            date: data.date?.toDate() || '',
            createdAt: data.createdAt?.toDate() || new Date(),
          });
        });

        // Sort by RSVP date (newest first)
        rsvpData.sort((a, b) => b.date.getTime() - a.date.getTime());

        setRsvps(rsvpData);
        console.log(rsvpData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching RSVPs:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const totalGuests = useMemo(
    () => rsvps.reduce((total, rsvp) => total + rsvp.adults + rsvp.kids, 0),
    [rsvps]
  );

  const totalAdults = useMemo(() => rsvps.reduce((total, rsvp) => total + rsvp.adults, 0), [rsvps]);

  const totalKids = useMemo(() => rsvps.reduce((total, rsvp) => total + rsvp.kids, 0), [rsvps]);

  const handleEditClick = (rsvp: RSVPData) => {
    setEditingRsvp(rsvp);
    setEditForm({
      name: rsvp.name,
      email: rsvp.email,
      phone: rsvp.phone,
      adults: rsvp.adults,
      kids: rsvp.kids,
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingRsvp(null);
    setEditForm({
      name: '',
      email: '',
      phone: '',
      adults: 0,
      kids: 0,
    });
  };

  const handleEditSave = async () => {
    if (!editingRsvp) return;

    try {
      await updateDoc(doc(db, 'rsvps', editingRsvp.id), {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        adults: editForm.adults,
        kids: editForm.kids,
      });
      handleEditClose();
    } catch (error) {
      console.error('Error updating RSVP:', error);
      alert('Failed to update RSVP');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Loading RSVPs...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
            Party RSVPs Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Manage and view all RSVPs for Xi Xi's birthday party
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Card sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {rsvps.length}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total RSVPs
            </Typography>
          </Card>

          <Card sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {totalGuests}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total Guests
            </Typography>
          </Card>

          <Card sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'info.main', fontWeight: 'bold' }}>
              {totalAdults}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Adults
            </Typography>
          </Card>

          <Card sx={{ p: 3, flex: 1, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
              {totalKids}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Kids
            </Typography>
          </Card>
        </Stack>

        {/* DataGrid */}
        <Card sx={{ height: 600 }}>
          <DataGrid
            rows={rsvps}
            columns={getColumns(handleEditClick)}
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            onRowSelectionModelChange={(newRowSelectionModel) =>
              setSelectedRows(newRowSelectionModel)
            }
            slots={{
              noRowsOverlay: () => <EmptyContent title="No RSVPs found" />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
              toolbar: CustomToolbar,
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: 'background.neutral',
                borderBottom: '2px solid',
                borderColor: 'divider',
              },
            }}
          />
        </Card>
      </Stack>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit RSVP</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
            <TextField
              label="Phone"
              fullWidth
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            />
            <TextField
              label="Adults"
              type="number"
              fullWidth
              value={editForm.adults}
              onChange={(e) =>
                setEditForm({ ...editForm, adults: parseInt(e.target.value, 10) || 0 })
              }
            />
            <TextField
              label="Kids"
              type="number"
              fullWidth
              value={editForm.kids}
              onChange={(e) =>
                setEditForm({ ...editForm, kids: parseInt(e.target.value, 10) || 0 })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
