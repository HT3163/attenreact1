import React from 'react';
import styled from 'styled-components';
import { Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <ProfileContainer maxWidth="md">
      <StyledPaper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mb={2}>
              <StyledAvatar alt="Student Avatar">
                {String(currentUser.name).charAt(0)}
              </StyledAvatar>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <StyledBox>
              <StyledTypography variant="h5" component="h2">
                {currentUser.name}
              </StyledTypography>
            </StyledBox>
          </Grid>
          <Grid item xs={12}>
            <StyledBox>
              <StyledSubtitle variant="subtitle1" component="p">
                Student Roll No: {currentUser.rollNum}
              </StyledSubtitle>
            </StyledBox>
          </Grid>
          <Grid item xs={12}>
            <StyledBox>
              <StyledSubtitle variant="subtitle1" component="p">
                Class: {sclassName.sclassName}
              </StyledSubtitle>
            </StyledBox>
          </Grid>
          <Grid item xs={12}>
            <StyledBox>
              <StyledSubtitle variant="subtitle1" component="p">
                School: {studentSchool.schoolName}
              </StyledSubtitle>
            </StyledBox>
          </Grid>
        </Grid>
      </StyledPaper>
    </ProfileContainer>
  );
};

export default StudentProfile;

const ProfileContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const StyledPaper = styled(Paper)`
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const StyledAvatar = styled(Avatar)`
  width: 150px;
  height: 150px;
  background-color: #2196f3;
  font-size: 3rem;
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
  color: #333;
`;

const StyledSubtitle = styled(Typography)`
  color: #555;
  font-size: 1rem;
  margin-top: 5px;
`;
