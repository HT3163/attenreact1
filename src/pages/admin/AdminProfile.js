import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import { Button, Collapse, TextField, Container, Box, Typography, Paper, Grid } from '@mui/material';
import Popup from './../../components/Popup';
import styled from 'styled-components';

const AdminProfile = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin";

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, address));
        setMessage("Done Successfully");
        setShowPopup(true);
    };

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="md">
            <StyledPaper elevation={3}>
                <Typography variant="h4" gutterBottom>Admin Profile</Typography>
                <Typography variant="body1"><strong>Name:</strong> {currentUser.name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {currentUser.email}</Typography>
                <Typography variant="body1"><strong>School:</strong> {currentUser.schoolName}</Typography>
                <Box mt={2}>
                    <Button variant="contained" color="error" onClick={deleteHandler} sx={{ mr: 2 }}>Delete</Button>
                    <Button variant="contained" sx={{ ...styles.showButton }} onClick={() => setShowTab(!showTab)}>
                        {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />} {buttonText}
                    </Button>
                </Box>
                <Collapse in={showTab} timeout="auto" unmountOnExit>
                    <Box mt={2}>
                        <form onSubmit={submitHandler}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        autoComplete="name"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="School"
                                        value={schoolName}
                                        onChange={(event) => setSchoolName(event.target.value)}
                                        autoComplete="name"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        autoComplete="email"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                    </Box>
                </Collapse>
            </StyledPaper>
        </Container>
    );
};

export default AdminProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

const styles = {
    showButton: {
        backgroundColor: "#1976d2",
        "&:hover": {
            backgroundColor: "#115293",
        }
    }
};
