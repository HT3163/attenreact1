import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Button
} from '@mui/material';
import * as XLSX from 'xlsx';

export const FullAtten = () => {
  const dispatch = useDispatch();

  const { studentsList } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
    dispatch(getSubjectList(currentUser._id, 'AllSubjects'));

    const pollData = async () => {
      try {
        dispatch(getAllStudents(currentUser._id));
      } catch (error) {
        console.error('Error polling data from server:', error);
      }
    };

    const interval = setInterval(pollData, 2000); // Poll every 2 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [dispatch, currentUser._id]);

  const handleDownload = () => {
    const attendanceData = studentsList.map((student) => {
      const attendanceRecords = student.attendance.map((att) => ({
        Date: new Date(att.date).toLocaleDateString(),
        Status: att.status,
        Subject: subjectsList.find((item) => item._id === att.subName)?.subName || ''
      })).reduce((acc, att) => {
        acc.dates.push(att.Date);
        acc.statuses.push(att.Status);
        acc.subjects.push(att.Subject);
        return acc;
      }, { dates: [], statuses: [], subjects: [] });

      return {
        Name: student.name,
        RollNumber: student.rollNum,
        Class: student.sclassName.sclassName,
        Dates: attendanceRecords.dates.join(', '),
        Statuses: attendanceRecords.statuses.join(', '),
        Subjects: attendanceRecords.subjects.join(', ')
      };
    });

    const ws = XLSX.utils.json_to_sheet(attendanceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

    XLSX.writeFile(wb, 'Attendance.xlsx');
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Student Records
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download Attendance
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsList.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNum}</TableCell>
                  <TableCell>{student.sclassName.sclassName}</TableCell>
                  <TableCell>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Subject</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {student.attendance.map((att) => (
                          <TableRow key={att._id}>
                            <TableCell>{new Date(att.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {att.status === 'Present' ? (
                                <Chip label="Present" color="success" />
                              ) : (
                                <Chip label="Absent" color="error" />
                              )}
                            </TableCell>
                            <TableCell>
                              {subjectsList.find(item => item._id === att.subName)?.subName || ''}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default FullAtten;
