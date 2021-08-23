import { useEffect, useState } from 'react'
import AddDepartment from './AddDepartment'
import EditDepartment from './EditDepartment'


function Department () {

    const [addDepartmentCondition, setAddDepartmentCondition] = useState(false)
    const [departments, setDepartments] = useState(null)
    const [editDepartmentCondition, setEditDepartmentCondition] = useState(false)
    const [departmentInstance, setDepartmentInstance] = useState({})

    useEffect (
        loadDepartments,[])

    function handleEditDepartment(department){
        setDepartmentInstance(department)
        setEditDepartmentCondition(true)
    }

    function handleDeleteDepartment(departmentId){
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    department_id: departmentId,
                }
            )
        }

        if(window.confirm("Are You Sure?")){
            fetch('http://localhost:8000/api/departments/', requestOptions)
            .then(res => res.text())
            .then(data => console.log(data))
            loadDepartments()
        }

        
    }
    

    function loadDepartments (){
        fetch('http://localhost:8000/api/departments/')
        .then(res => {
            if (res.ok){
                return res.json()
            }
            else { throw res }
            
        })
        .then(data => {
            setDepartments(data)
        })
        .catch(error => console.log(error.message))
        }

    function handleAddDepartmentButton(){
        setAddDepartmentCondition(true)
    }

    function departmentList(){
        return (
            <div>
                <div>
                    <table className = "table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Department Id</th>
                                <th scope="col">Department Name</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            { departments ? (departments.map(department => { 
                                return(   
                                    <tr key = {department.department_id}>
                                        <td>{department.department_id}</td>
                                        <td>{department.department_name}</td>
                                        <td>
                                            <button onClick = {() => handleEditDepartment(department)} className = "btn btn-info btn-sm edit-button ">Edit Department</button>
                                            <button onClick = {() => handleDeleteDepartment(department.department_id)} className = "btn btn-danger btn-sm">Delete Department</button>
                                            </td>
                                    </tr>
                            )})): null}
                        </tbody>
                    </table>
                    <button className = "btn btn-primary" onClick = {handleAddDepartmentButton}>Add Department</button>
                </div>
            </div>
        )
        }

    if(editDepartmentCondition){
        return(
            <EditDepartment 
                editDepartmentCondition = {editDepartmentCondition} 
                setEditDepartmentCondition = {setEditDepartmentCondition}
                loadDepartments = {loadDepartments}
                departmentInstance = {departmentInstance} />
                )
    }
    else if(addDepartmentCondition) {
        return(
            <AddDepartment 
                setAddDepartmentCondition = {setAddDepartmentCondition} 
                addDepartmentCondition = {addDepartmentCondition} 
                loadDepartments= {loadDepartments} />
                )
    }
    else {
        return(
            departmentList() 
        )
    }
    // return(
    //     <div className = "my-3">
    //         {departmentPopUp? <AddDepartment setDepartmentPopUp = {setDepartmentPopUp} departmentPopUp = {departmentPopUp} loadDepartments= {loadDepartments} /> : departmentList()}
    //     </div>
    // )
}

export default Department;
