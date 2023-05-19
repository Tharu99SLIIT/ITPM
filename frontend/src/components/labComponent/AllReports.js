import React ,{Component} from 'react';
import axios from 'axios';
import Pulse from 'react-reveal/Pulse';
import './labStyles.css';
import Swal from 'sweetalert2'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default class AllRepports extends Component {

constructor(props){
    super(props);
    this.state={
        reports:[]
    };
}

componentDidMount(){
    this.retrieveReports();
} 

//method
retrieveReports(){
  axios.get('http://localhost:8000/api/lab/all').then(res =>{
      if(res.data.success){
          this.setState({
            reports:res.data.reports
          });
      }
console.log(this.state.reports);
  });
}

 onDelete = (id) =>{
    axios.delete(`http://localhost:8000/api/lab/delete/${id}`).then((res) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'warning',
            title: 'Lab Report Deleted'
          })
        this.retrieveReports();
    })
}

filterData(reports,searchKey){
    const result = reports && reports.filter((report) =>{ 
    return report.cName.includes(searchKey)
    })

    this.setState({reports:result})
}

handleSearchArea = (e) =>{
   const searchKey = e.target.value ;
   axios.get('http://localhost:8000/api/lab/all').then((res) =>{
    if(res.data.success){
    this.filterData(res.data.reports,searchKey)
    }       
});

}



 printPdf = () => {
    const input = document.querySelector(".pdfdiv");
    html2canvas(input).then((canvas) => {
      var img = new Image();
      const doc = new jsPDF("p", "mm", "a4");
      doc.setTextColor(255, 0, 0);
      doc.setFontSize(28);
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(16);
      doc.text(10, 70, "Agrotec LLC");
      doc.setTextColor(0, 255, 0);
      doc.setFontSize(12);
      doc.text(145, 85, "Signature :");
      //Date
      var m_names = new Array(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      );

      var today = new Date();
      var seconds = today.getSeconds();
      var minutes = today.getMinutes();
      var hours = today.getHours();
      var curr_date = today.getDate();
      var curr_month = today.getMonth();
      var curr_year = today.getFullYear();

      today =
        m_names[curr_month] +
        " " +
        curr_date +
        "/ " +
        curr_year +
        " | " +
        hours +
        "h : " +
        minutes +
        "min : " +
        seconds +
        "sec";
      var newdat = today;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text(130, 93, newdat);
      var imgHeight = (canvas.height * 200) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "JPEG", 5, 100, 200, imgHeight);
      const date = Date().split(" ");
      // we use a date string to generate our filename.
      const dateStr =
        "Agrotec Reports" + date[0] + date[1] + date[2] + date[3] + date[4];
      doc.save(`report_${dateStr}.pdf`);
    });
  };



    render(){
        return(
            <div >
                <div >
                    <div >
                        <div >
                            <h4 style={{color:'white'}}>All Reports</h4>
                        </div>
                        <div>
                            <input 
                            className='form-control'
                            type='search'
                            placeholder='Search'
                            name='searchQuery'
                            onChange={this.handleSearchArea}>                      
                            </input>
                        </div>
  
                  </div>
                  
             <div >
                 <table style={{width:"1200px"}}>
                     <thead>
                         <tr>
                           <th scope ="col" >#</th>  
                           <th scope ="col" >Company Name</th>  
                           <th scope ="col" >Company Email</th>  
                           <th scope ="col" >Report About</th>  
                           <th scope ="col" >Lab ID</th>  
                           <th scope ="col" >Report Status</th>
                           <th scope ="col" >Action</th>    
                         </tr>
                     </thead>
                     <tbody>
                         {this.state.reports &&
                         this.state.reports.map((reports,index)=>(
                            <tr key={index}>
                                <th scope ="row">{index+1}</th>
                                <td>
                                     <a href={`/rep/${reports._id}`} >
                                    {reports.cName}
                                    </a>
                                </td>
                                <td>{reports.cEmail}</td> 
                                <td >{reports.about}</td>
                                <td >{reports.labId}</td>
                                <td >{reports.reportStatus}</td>
                                <td style={{width:"50px"}}> 
                                    <a className ="btn btn-warning" href={`/edit/${reports._id}`}>
                                       EDIT
                                    </a>
                                    
                                    
                                    <a className ="btn btn-danger" href="#" onClick={() => this.onDelete(reports._id)}>
                                        DELETE
                                    </a>
                                </td>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </tr> 
                         ))}
                     </tbody>
                 </table>

                 </div>
                
                 <br></br>
                 <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create New Post</a></button>
                 <button className="btn btn-success"><a onClick={this.printPdf} style={{textDecoration:'none',color:'white'}}>Download Post</a></button>
            </div>
            </div>  
        )
    }
}

 
