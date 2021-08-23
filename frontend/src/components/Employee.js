import {useEffect, useState} from 'react'
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

function Employee() {
    const [employees, setEmployees] = useState(null)
    const [addEmployeeCondition, setAddEmployeeCondition] = useState(false)
    const [editEmployeeCondition, setEditEmployeeCondition] = useState(false)
    const [editEmployeeInstance, setEditEmployeeInstance] = useState({})
    

    function handleAddEmployeeButton() {
        setAddEmployeeCondition(!addEmployeeCondition)
    }

    function handleEditEmployee(employee){
        setEditEmployeeCondition(true)
        setEditEmployeeInstance(employee)
    }

    function handleDeleteEmployee(employeeId){
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    employee_id: employeeId,
                }
            )
        }

        if(window.confirm("Are You Sure?")){
            fetch('http://localhost:8000/api/employees/', requestOptions)
            .then(res => res.text())
            .then(data => console.log(data))
            loadEmployees()
        }
    }

    function loadEmployees (){

        fetch('http://localhost:8000/api/employees/')
        .then(res => {
            if (res.ok){
                return res.json()
            }
            else { throw res }
            
        })
        .then(data => {
            setEmployees(data)
        })
        .catch(error => console.log(error.message))
    }

    useEffect(loadEmployees, [])

    function employeesList (){
        return(
            <div>
                <table className = "table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Employee Id</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Date of Join</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        { employees ? (employees.map(employee => { 
                            return(   
                                <tr key = {employee.employee_id}>
                                    <td>{employee.employee_id}</td>
                                    <td>{employee.employee_name}</td>
                                    <td>{employee.department.department_name}</td>
                                    <td>{employee.date_of_joining}</td>
                                    <td>
                                        <button onClick = {() => handleEditEmployee(employee)} className = "btn btn-info edit-button">Edit</button>
                                        <button onClick = {() => handleDeleteEmployee(employee.employee_id)} className = "btn btn-danger delete-button">Delete</button>
                                    </td>
                                </tr>
                        )})): null}
                    </tbody>
                </table>
                <button className = "btn btn-primary" onClick = {handleAddEmployeeButton}>Add Employee</button>
            </div>
        )
    } 

    if(addEmployeeCondition){
        return (
            <AddEmployee setAddEmployeeCondition = {setAddEmployeeCondition} addEmployeeCondition = {addEmployeeCondition} loadEmployees= {loadEmployees} />
        )}
    else if(editEmployeeCondition){
        return (
            <EditEmployee 
                setEditEmployeeCondition = {setEditEmployeeCondition} 
                editEmployeeCondition = {editEmployeeCondition} 
                loadEmployees= {loadEmployees} 
                editEmployeeInstance = {editEmployeeInstance} />
        )
    }
    else{
        return(
        employeesList()  
        )}
}

export default Employee