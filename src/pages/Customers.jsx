import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { db } from '../utils/firebase';
import { collection, query, getDocs } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';


export default function Customers() {
    const [data, setData] = React.useState([]);

    const getData = async () => {

      const q = query(collection(db, "users"));

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

    const dateHandle = dob => {
      const dateTime = new Timestamp(dob.seconds, dob.nanoseconds);
      const date = dateTime.toDate();
      
      const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${date.getDate()} ${monthMap[date.getMonth()]} ${date.getFullYear()}`
    }

    const genderHandle = gender => {
      
      switch (gender) {
        case "0": return "Male";
        case "1": return "Female";
        default: return "Others";
      }
    }

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
                
                <div style={{width: '100%', background: '#FFF', borderRadius: '12px', padding: '24px'}}>
                    {data.length !== 0 && <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Date of Birth</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{genderHandle(row.gender, row.dob)}</TableCell>
                              <TableCell>{dateHandle(row.dob)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>}
                    {
                        data.length === 0 && <div>No Data</div>
                    }
                </div>
            </Grid>
          </Container>
        </Box>
  );
}