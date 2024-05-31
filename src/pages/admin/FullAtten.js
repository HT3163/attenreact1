import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

export const FullAtten = () => {
    const dispatch = useDispatch()

    const {studentsList} = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user)
    const { teacherDetails} = useSelector((state) => state.teacher);
    const { subjectsList} = useSelector((state) => state.sclass);
    
    console.log(subjectsList)

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        
        const pollData = async () => {
          try {
            dispatch(getAllStudents(currentUser._id));
          } catch (error) {
            console.error('Error polling data from server:', error);
          }
        };
    
        const interval = setInterval(pollData, 2000); // Poll every 2 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [dispatch,currentUser._id]);


  return (
    <div className='fullatten'>
            <h2>Student Records</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th className='fullatten1'>Name</th>
                        <th className='fullatten1'>Roll Number</th>
                        <th className='fullatten1'>Class</th>
                        <th className='fullatten1'>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {studentsList.map((student) => (
                        <tr key={student._id}>
                            <td className='fullatten1'>{student.name}</td>
                            <td className='fullatten1'>{student.rollNum}</td>
                            <td className='fullatten1'>{student.sclassName.sclassName}</td>
                            <td>
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th className='fullatten1'>Date</th>
                                            <th className='fullatten1'>Status</th>
                                            <th className='fullatten1'>Subject</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student.attendance.map((att) => (
                                            <tr key={att._id}>
                                                <td className='fullatten1'>{new Date(att.date).toLocaleDateString()}</td>
                                                <td className='fullatten1'>{att.status === "Present"? <span style={{color:'green'}}>Present</span> : <span style={{color:'red'}}>Absent</span>}</td>
                                                <td className='fullatten1'>
                                                    {
                                                        subjectsList.map((item, index) => (
                                                           att.subName === item._id ? `${item.subName}` : ""
                                                        
                                                        ))
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}
