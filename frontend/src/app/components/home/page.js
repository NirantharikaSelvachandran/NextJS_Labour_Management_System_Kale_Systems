"use client"
import { useState, useEffect } from 'react';
import { Container, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import './page.css';
import { BASE_URL } from '../../environments/apiConfig';

const LabourDetails = () => {

    const [labours, setLabours] = useState([]);
    const [labourData, setLabourData] = useState({
        labour_id: '',
        name: '',
        age: '',
        phone_number: '',
        bank_account_number: '',
        role: '',
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        getLabours();
    }, []);

    const getLabours = async () => {
        try {
            const response = await fetch(`${BASE_URL}/get`);
            const data = await response.json();
            setLabours(data);
        } catch (error) {
            console.error('Error getting labours details:', error);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setEditMode(false);
        setLabourData({
            labour_id: '',
            name: '',
            age: '',
            phone_number: '',
            bank_account_number: '',
            role: '',
        });
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const inputChange = (e) => {
        const { name, value } = e.target;
        setLabourData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addOrUpdateLabour = async () => {
        try {
            if (editMode) {
                await fetch(`${BASE_URL}/update/${labourData.labour_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(labourData),
                });
            } else {
                await fetch(`${BASE_URL}/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(labourData),
                });
            }
            closeDialog();
            getLabours();
        } catch (error) {
            console.error('Error adding/updating labour details:', error);
        }
    };

    const editLabour = (labour) => {
        setOpenDialog(true);
        setEditMode(true);
        setLabourData(labour);
    };

    const deleteLabour = async (labourId) => {
        try {
            await fetch(`${BASE_URL}/delete/${labourId}`, {
                method: 'DELETE',
            });
            getLabours();
        } catch (error) {
            console.error('Error deleting labour details:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h5" className="mt-3" gutterBottom style={{ textAlign: 'center' , fontWeight:'bold',fontSize: '1.5rem'}}>
                Labour Management
            </Typography>

            <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
                    Add Labour
                </Button>
            </Box>

            <TableContainer sx={{border:1, borderRadius:3}}>
                <Table >
                    <TableHead >
                        <TableRow >
                            <TableCell className="tableHeader">Labour ID</TableCell>
                            <TableCell className="tableHeader">Name</TableCell>
                            <TableCell className="tableHeader">Age</TableCell>
                            <TableCell className="tableHeader">Phone Number</TableCell>
                            <TableCell className="tableHeader">Bank Account Number</TableCell>
                            <TableCell className="tableHeader">Role</TableCell>
                            <TableCell className="tableHeader">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {labours.map((labour) => (
                            <TableRow key={labour.labour_id}>
                                <TableCell sx={{textAlign:'center'}}>{labour.labour_id}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{labour.name}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{labour.age}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{labour.phone_number}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{labour.bank_account_number}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>{labour.role}</TableCell>
                                <TableCell sx={{textAlign:'center'}}>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={() => editLabour(labour)}
                                        sx={{ marginRight: 2 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteLabour(labour.labour_id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={closeDialog} >
                <DialogTitle className="text-center">{editMode ? 'Edit Labour details' : 'Add New Labour'}</DialogTitle>
                <DialogContent>
                    <TextField
                        name="labour_id"
                        label="Labour ID"
                        value={labourData.labour_id}
                        onChange={inputChange}
                        fullWidth
                        disabled={editMode}
                        className="mb-2"
                    />
                    <TextField
                        name="name"
                        label="Name"
                        value={labourData.name}
                        onChange={inputChange}
                        fullWidth
                        className="mb-2"
                    />
                    <TextField
                        name="age"
                        label="Age"
                        value={labourData.age}
                        onChange={inputChange}
                        fullWidth
                        className="mb-2"
                    />
                    <TextField
                        name="phone_number"
                        label="Phone Number"
                        value={labourData.phone_number}
                        onChange={inputChange}
                        fullWidth
                        className="mb-2"
                    />
                    <TextField
                        name="bank_account_number"
                        label="Bank Account Number"
                        value={labourData.bank_account_number}
                        onChange={inputChange}
                        fullWidth
                        className="mb-2"
                    />
                    <TextField
                        name="role"
                        label="Role"
                        value={labourData.role}
                        onChange={inputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"  onClick={addOrUpdateLabour} color="primary">
                        {editMode ? 'Update' : 'Add'}
                    </Button>
                    <Button variant="outlined" color="error" onClick={closeDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default LabourDetails;