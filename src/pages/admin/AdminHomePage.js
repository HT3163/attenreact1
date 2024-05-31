import React, { useEffect } from 'react';
import { Container, Grid, Paper, Tooltip } from '@mui/material';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Legend } from 'recharts';

import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    // Example statistics
    const numberOfPendingAssignments = 15; // This would typically come from your Redux store
    const numberOfNewEnrollments = 30; // This would typically come from your Redux store

    const data = [
        { name: 'Students', value: numberOfStudents },
        { name: 'Classes', value: numberOfClasses },
        { name: 'Teachers', value: numberOfTeachers },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <StatisticCard 
                    xs={12} md={3} lg={3} 
                    tooltipTitle="Number of Students Enrolled" 
                    icon={SchoolIcon} 
                    title="Total Students" 
                    data={numberOfStudents} 
                />
                <StatisticCard 
                    xs={12} md={3} lg={3} 
                    tooltipTitle="Number of Classes Available" 
                    icon={ClassIcon} 
                    title="Total Classes" 
                    data={numberOfClasses} 
                />
                <StatisticCard 
                    xs={12} md={3} lg={3} 
                    tooltipTitle="Number of Teachers Employed" 
                    icon={PersonIcon} 
                    title="Total Teachers" 
                    data={numberOfTeachers} 
                />

                <Grid item xs={12}>
                    <StyledPaper>
                        <BarChart
                            width={600}
                            height={300}
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartTooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
};

const StatisticCard = ({ xs, md, lg, tooltipTitle, icon: Icon, title, data, prefix }) => {
    return (
        <Grid item xs={xs} md={md} lg={lg}>
            <Tooltip title={tooltipTitle} arrow>
                <StyledPaper>
                    <IconWrapper>
                        <Icon fontSize="inherit" />
                    </IconWrapper>
                    <Title>{title}</Title>
                    <Data start={0} end={data} duration={2.5} prefix={prefix} />
                </StyledPaper>
            </Tooltip>
        </Grid>
    );
};

const StyledPaper = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.p`
  font-size: 1.5rem;
  margin: 10px 0;
  color: #333;
  font-weight: bold;
`;

const Data = styled(CountUp)`
  font-size: 2rem;
  color: green;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #1976d2;
`;

export default AdminHomePage;
