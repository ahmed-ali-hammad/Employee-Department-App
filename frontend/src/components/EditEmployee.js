import {useState, useEffect, useRef} from "react"


function EditEmployee ({setEditEmployeeCondition, editEmployeeCondition, loadEmployees, editEmployeeInstance}){

    const employeeId = editEmployeeInstance.employee_id
    const [employeeName , setEmployeeName] = useState(editEmployeeInstance.employee_name)
    const [department , setDepartment] = useState(editEmployeeInstance.department.department_name)
    const [dateJoining , setDateJoining] = useState(editEmployeeInstance.date_of_joining)
    const photoFileName = useRef(editEmployeeInstance.photo_file_name)
    const [departments, setDepartments] = useState(null)
    const [imageSrc, setImageSrc] = useState('http://localhost:8000/media/' + photoFileName.current + '/')

    useEffect(loadDepartments,[])

    function handleEditEmployeePicture(event){
        event.preventDefault()
        photoFileName.current = event.target.files[0].name
        const formData = new FormData()
        formData.append(
            'myFile',
            event.target.files[0],
            photoFileName.current
        )

        const requestOptions = {
            method: "POST",
            body: formData
        }
        console.log(requestOptions)
        fetch('http://localhost:8000/api/employee/save-file/', requestOptions)
        .then(res => res.json())
        .then(data => console.log(data))

        setImageSrc('http://localhost:8000/media/'+ photoFileName.current + '/')
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


    function handleSubmitEditForm(e){
        e.preventDefault();

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {   employee_id: employeeId,
                    employee_name: employeeName,
                    department: department,
                    date_of_joining: dateJoining,
                    photo_file_name: photoFileName.current
                }
            )
        }


        fetch('http://localhost:8000/api/employees/', requestOptions)
        .then(res => res.json())
        .then(data => console.log(data))
        alert("Employee updated")
        loadEmployees()
        setEditEmployeeCondition(!editEmployeeCondition)

    }


    return (
        <div className = "add-employee row">
            <h1 className = "add-employee-title">Edit Employee</h1>
            <hr/>  
            <div className = "col-6">
                <form onSubmit =  {handleSubmitEditForm}>    
                    <div className = "form-group">
                        <label>Employee Name</label>
                        <input value = {employeeName} onChange = {(e) => setEmployeeName(e.target.value)} className = "form-control" type = "text" />
                    </div>
                    <div className = "form-group">
                        <label>Department</label>
                        <select value = {department} onChange = {(e) => setDepartment(e.target.value)} className="form-select">
                            {departments? departments.map(department => {
                                return(
                                    <option key = {department.department_id} value={department.department_name}>{department.department_name}</option>
                                )
                            }):null}
                        </select>
                    </div>
                    <div className = "form-group">
                        <label>Date of Joining</label>
                        <input value = {dateJoining} onChange = {(e) => setDateJoining(e.target.value)} className = "form-control" type = "date" />
                    </div>
                    <button className = "btn btn-primary my-3">Update Employee</button>
                </form>    
            </div>
            <div className = "col-6">
                <img width = "200px" height = "200px" src={imageSrc} />
                <input className = "photo-input" onChange = {handleEditEmployeePicture} type="File" />
            </div>
        </div>
        
    )
}

export default EditEmployee