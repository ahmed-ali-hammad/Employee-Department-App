import {useState} from "react"


function AddDepartment ({setAddDepartmentCondition, addDepartmentCondition, loadDepartments}){

    const [departmentName , setDepartmentName] = useState('')

   function handleSubmitDepartmentForm(e){
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    department_name: departmentName,
                }
            )
        }

        fetch('http://localhost:8000/api/departments/', requestOptions)
        .then(res => res.json())
        .then(data => console.log(data))
        alert("Department Added")
        loadDepartments()
        setAddDepartmentCondition(!addDepartmentCondition)

    }


    return (
        <form onSubmit =  {handleSubmitDepartmentForm}>
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
    )
}

export default AddDepartment