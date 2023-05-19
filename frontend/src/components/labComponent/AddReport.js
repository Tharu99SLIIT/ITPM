import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"; 
import swal from 'sweetalert';

function AddReport(){
   /*create state*/
   const [cName,setName]=useState("");
   const [cEmail,setEmail]=useState("");
   const [about,setAbout]=useState("");
   const [labId,setLabId]=useState("");
   const [reportStatus, setStatus]=useState("");
   const [formErrors, setFormErrors] = useState({});
   const [vacancyNoError, setVacancyNoError]=useState({});
   const [errors, setErrors] = useState([]);
  
   /*add*/
   function sendlabData(e){
      e.preventDefault();
      let hasErrors = false;
   
      if (labId.length <= 0) {
         hasErrors = true;
         setErrors((prev) => [...prev, "LabReportNoError"]);
       }

       if (hasErrors) {
         return;
       } else {

      const newReport = {
         cName,
         cEmail,
         about,
         labId,
         reportStatus,
   };

   /*url*/
   axios.post("http://localhost:8000/api/lab/add",newReport).then(()=>{
     
    }).catch((err)=>{
      alert(err)
    });
    swal({
      title: "Lab Report is Successfully Added.",
      icon: "success",
      confirmButtonText: "OK",
        }).then(function () {
            // Redirect the user
            window.location.href = "/rep";
          });
   }
}

 return(  
   <div class="mains"> 
    <div class="wrapperss">
    <div class="titless">
       Add New Lab Report
      </div>
      <div class="forms" >
        <div class="inputfieldss">
            <label>Company Name</label>
            <input type="text" class="inputss" required onChange={(e)=>{
               setName(e.target.value);
            }}/>
            {errors.includes("vacancyNoError") && (
              <p class="alert-txt">Please Enter Valid Vacancy No</p>
            )}
         </div>
         <div class="inputfieldss">
            <label>Email</label>
            <input type="text" class="inputss" required onChange={(e)=>{
               setEmail(e.target.value);
            }}/>
         </div>
         <div class="inputfieldss">
            <label>About</label>
            <input type="text" class="inputss" required onChange={(e)=>{
               setAbout(e.target.value);
            }}/>
         </div>
         <div class="inputfieldss">
            <label>Lab ID</label>
            <input type="text" class="inputss" required onChange={(e)=>{
                  setLabId(e.target.value);
            }}/>
         </div>
         <div class="inputfieldss">
            <label>Status</label>
            <input type="text" class="inputss"  onChange={(e)=>{
                  setStatus(e.target.value);
            }}/>
         </div>
                       
          <div class="modal-footers">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={sendlabData}> Add </button>
           
        </div>
      </div>
</div>
    </div>
    
    );
}

export default AddReport;