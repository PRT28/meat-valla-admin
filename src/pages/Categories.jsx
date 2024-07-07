import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { db } from '../utils/firebase';
import { collection, query, getDocs, addDoc } from "firebase/firestore";


export default function Cateogories() {

    const [open, setOpen] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('')
    const handleOpen = () => setOpen({});
    const handleClose = () => setOpen(null);
    const handleSave = async () => {
      await addDoc(collection(db, "category"), {
        name,
        url
      }).then(() => {
        window.location.reload();
      })
    };

    const getData = async () => {

      const q = query(collection(db, "category"));

      const querySnapshot = await getDocs(q);
      const temp = []
      querySnapshot.forEach((doc) => {
        temp.push({...doc.data(), id: doc.id});
      });
      setData(temp);

    }

    React.useEffect(() => {
      getData();
    }, [])

  return (
    <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          
          <Container maxWidth="x-lg" sx={{ mt: 4, mb: 4 }}>
            <Grid spacing={1}>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', width: '100%'}}>
                    <Button variant="contained" onClick={handleOpen}>Add Category</Button>
                </div>
                
                <div style={{width: '100%', background: '#FFF', borderRadius: '12px', padding: '24px'}}>
                    <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell><a href={row.url} target='_blank' rel="noreferrer">View Image</a></TableCell>
                            <TableCell align="right">
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <div onClick={() => setOpen(row)} style={{cursor: 'pointer'}}><EditIcon /></div>
                                    <div style={{marginLeft: '10px', cursor: 'pointer'}}><DeleteIcon /></div>
                                </div>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </Grid>
          </Container>
          {open && <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box 
            noValidate
            autoComplete="off"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Enter Category Details
            </Typography>
            <div>
                <TextField defaultValue={open.name} onChange={e => setName(e.target.value)} style={{width: '100%', marginTop: '20px', marginBottom: '10px'}} id="outlined-basic" label="Name" variant="outlined" />
                <TextField defaultValue={open.url} onChange={e => setUrl(e.target.value)} style={{width: '100%', marginBottom: '15px'}} id="outlined-basic" label="Image URL" variant="outlined" />
                <Button style={{width: '100%'}} variant="contained" onClick={handleSave}>Save</Button>
            </div>
            </Box>
        </Modal>}
        </Box>
  );
}