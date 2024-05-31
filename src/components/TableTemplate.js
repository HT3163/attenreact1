import React, { useEffect, useState } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentFields } from '../redux/studentRelated/studentHandle';
import Popup from './Popup';


const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser)
    
    const subjectID = currentUser.teachSubject?._id

    // Create a new Date object for today
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const date = getCurrentDate()

    const [obj2, setObj2] = useState({});

    const handleStatusChange = (studentId, newStatus) => {
        console.log('me clicked',studentId," : ",newStatus)
        
        setObj2(prevState => ({
            ...prevState,
            [studentId.id]: newStatus
        }));

    };

    const uploadAttendance = () => {
        if (Object.keys(obj2).length === 0) {
            setMessage("Select anyone option first")
            setShowPopup(true)
        }else {
            for (const key in obj2) {
                const fields = { subName: subjectID, status: obj2[key], date }
                dispatch(updateStudentFields(key, fields, "StudentAttendance"))
            }
            setMessage("Done Successfully")
            setShowPopup(true)
        }
    }

    useEffect(() => {
        
        // This effect runs after every render, including when obj2 is updated
    }, [obj2]); // Run this effect whenever obj2 changes


    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}

                            {
                                currentUser?.role === "Teacher" ? <>
                                    <StyledTableCell align="center">
                                        Attendance
                                    </StyledTableCell>
                                </> : ""
                            }


                            {
                                currentUser?.role === "Admin" ? <>
                                    <StyledTableCell align="center">
                                        Actions
                                    </StyledTableCell>
                                </> : ""
                            }




                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {
                                                        column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value
                                                    }
                                                </StyledTableCell>
                                            );
                                        })}
                                        {/* {console.log(row)} */}

                                        
                                        {currentUser?.role === 'Teacher' ? <div className='radiog'  style={{display:"flex"}}>
                                            <div style={{margin:"1px"}}>
                                                <input name={row?.rollNum} type='radio' value="Present" onClick={() => handleStatusChange(row, 'Present')}/>
                                                <label>Present</label>
                                            </div>
                                            <div style={{margin:"1px"}}>
                                                <input className='radioabs' style={{marginLeft: "5px"}} name={row?.rollNum} type='radio'value="Absent" onClick={() => handleStatusChange(row, 'Absent')}/>
                                                <label>Absent</label>
                                            </div>
                                            </div> : ""
                                        }
                                      


                                        {/* {
                                            currentUser?.role === 'Teacher' ? <>
                                                <StyledTableCell align="center">
                                                    <RadioGroup>
                                                        <div align="center" key={row?.id}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Radio
                                                                        onChange={() => handleStatusChange(row, 'Present')}
                                                                        value="Present"
                                                                    />
                                                                }
                                                                label={`Present`}
                                                            />
                                                            <FormControlLabel
                                                                control={
                                                                    <Radio
                                                                        onChange={() => handleStatusChange(row, 'Absent')}
                                                                        value="Absent"
                                                                    />
                                                                }
                                                                label={`Absent`}
                                                            />
                                                        </div>
                                                    </RadioGroup>


                                                </StyledTableCell>
                                            </> : ""
                                        } */}

                                        {
                                            currentUser?.role === 'Admin' ? <>
                                                <StyledTableCell align="center">
                                                    <ButtonHaver row={row} />
                                                </StyledTableCell>
                                            </> : ""
                                        }






                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {
                currentUser?.role === "Teacher" ? <>
                    <div style={{ display: 'flex', justifyContent: 'center',margin:"10px"}}>
                        <button className='main-btn' id='btnclick' onClick={()=> uploadAttendance()}>
                            Submit Attendance
                        </button>
                        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                    </div>
                </> : ""
            } 



            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value));
                    setPage(0);
                }}
            /> */}
        </>
    )
}

export default TableTemplate