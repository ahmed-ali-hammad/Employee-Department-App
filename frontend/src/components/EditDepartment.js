import {useState} from "react"


function EditDepartment ({setEditDepartmentCondition, editDepartmentCondition, loadDepartments, departmentInstance}){

    const departmentId = departmentInstance.department_id
    const [departmentName , setDepartmentName] = useState(departmentInstance.department_name)

    function handleSubmitEditDepartmentForm(e){
        e.preventDefault();

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {   department_id: departmentId,
                    department_name: departmentName,

                }
            )
        }

        fetch('http://localhost:8000/api/departments/', requestOptions)
        .then(res => res.json())
        .then(data => console.log(data))
        alert("Department updated")
        loadDepartments()
        setEditDepartmentCondition(!editDepartmentCondition)

    }

    return (

        <form onSubmit =  {handleSubmitEditDepartmentForm}>
            <div className = "add-employee row">
                <div className = "col-6">
                    <div className = "form-group">
                        <label>Department Name</label>
                        <input value = {departmentName} onChange = {(e) => setDepartmentName(e.target.value)} className = "form-control" type = "text" />
                    </div>
                    <button className = "btn btn-primary my-3">Add Department</button>
                </div>
            </div>
        </form>    

        // <form onSubmit =  {handleSubmitEditForm}>
        //     <div className = "add-employee row">
        //         <div className = "col-6">
        //             <div className = "form-group">
        //                 <label>Employee Name</label>
        //                 <input value = {employeeName} onChange = {(e) => setEmployeeName(e.target.value)} className = "form-control" type = "text" />
        //             </div>
        //             <div className = "form-group">
        //                 <label>Department</label>
        //                 <select value = {department} onChange = {(e) => setDepartment(e.target.value)}  className="form-select">
        //                     <option value="Department one">Department one</option>
        //                     <option value="Department two">Department two</option>
        //                     <option value="Department three">Department three</option>
        //                     <option value="Department four">Department four</option>
        //                 </select>
        //             </div>
        //             <div className = "form-group">
        //                 <label>Date of Joining</label>
        //                 <input value = {dateJoining} onChange = {(e) => setDateJoining(e.target.value)} className = "form-control" type = "date" />
        //             </div>
        //             <button className = "btn btn-primary my-3">Update Employee</button>
        //         </div>

        //         <div className = "col-6">
        //             <img src={ require('../ProfilePicture.png') } />
        //             <input type="file" id="img" name="img" accept="image/*" />
        //         </div>
        //     </div>
        // </form>    
    )
}

export default EditDepartment