import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <ProfileContainer>
      <ProfileCard>
        <AvatarContainer>
          <StyledAvatar alt={currentUser.name} src="/path/to/profile-pic.jpg" />
        </AvatarContainer>
        <ProfileCardContent>
          <ProfileText variant="h5">Name: {currentUser.name}</ProfileText>
          <ProfileText variant="h6">Email: {currentUser.email}</ProfileText>
          <ProfileText variant="body1">Class: {teachSclass.sclassName}</ProfileText>
          <ProfileText variant="body1">Subject: {teachSubject.subName}</ProfileText>
          <ProfileText variant="body1">School: {teachSchool.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default TeacherProfile;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 350px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(45deg, #2196f3, #21cbf3);
`;

const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  border: 2px solid white;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileText = styled(Typography)`
  margin: 10px 0;
  color: #333;
  &:nth-child(1) {
    font-weight: bold;
  }
  &:nth-child(2) {
    color: #555;
  }
`;
