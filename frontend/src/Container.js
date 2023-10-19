import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
  function Ctn(){
  //All useState
  let [value,setvalue] = useState('');
  let [filename,setfilename] = useState([]);
  let [currentFile,setcurrentFile] = useState('Undefined');
  let [currentdata,setcurrentdata] =useState('')
  let [openfile,setopenfile] = useState([])
  
   useEffect(()=>{
    allfile();
   })


async function allfile(){
    const data = await axios.get('https://blue-lifeguard-dvirw.pwskills.app:5000/allfile/getallfile');
    setfilename(data.data)
   
   
}

 


  //add file
 async function adddata(){
    if(!value){
      toast.info("Please fill input feild",{
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
      });
    }
    else{
      setfilename([...filename,value])
     
     let data = await axios.post('https://blue-lifeguard-dvirw.pwskills.app:5000/savefile/file?name='+value)
     console.log(data);
     setvalue('')
    }
    
  }

  //delete file
 async function deletedata(id){
  let deletedata = filename[id];
  console.log(deletedata);
  let updatefile = filename.filter((elm,ind)=>{
    return ind !== id
  })
  let data = await axios.post('https://blue-lifeguard-dvirw.pwskills.app:5000/deletefile/delete?file='+deletedata);
  console.log(data);
  setfilename([...updatefile]);
 }
  function deleteopenfile(id){
    let deletedata = filename[id];
    console.log(deletedata);
    let updateopenfile = openfile.filter((elm,ind)=>{
      return ind !== id
    })
    setopenfile([...updateopenfile]);
   }


 
 async function getdata(name){
  let data = await axios.get('https://blue-lifeguard-dvirw.pwskills.app:5000/getdata/apidata/'+name);
  console.log(data);
    setcurrentdata(data.data.data);
    setcurrentFile(data.data.file)
    setopenfile([data.data.file,...openfile])
 
 }
 async function getcurruntdata(name){
    let data = await axios.get('https://blue-lifeguard-dvirw.pwskills.app:5000/getdata/apidata/'+name);    console.log(data);
      setcurrentdata(data.data.data);
      setcurrentFile(data.data.file)
      
   
   }
 async function savedata(){
  
     await axios.put('https://blue-lifeguard-dvirw.pwskills.app:5000/data/updatedata',{"file":currentFile,"data":currentdata})
    toast.success('Save successfully', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
 }
   return(
    <div className='myctn'>
    <div className="fileCtn">
      <div className="fileinput">
      <input type="text" placeholder='Add file...' className="filename" value={value} onChange={(e)=>setvalue(e.target.value)} />
     <button className='create' onClick={adddata}>+</button>
      </div>
      <div className="alldata">
        {
          
          filename.map((elem,ind)=>{
            
            return (
               <div className="file" key={ind}>
                 <li onClick={()=>getdata(elem)}>{elem}</li>
                 <i className='fa-solid fa-trash' onClick={()=>deletedata(ind)}></i>
               </div>
            )
          })
        }
      </div>
     
    </div>
    <div className="dataCtn">
      <div className="crructn">
        <div className='crrufilename'>File:{currentFile}</div>
        <div className="save"><button className='saveF' onClick={savedata}>Save</button></div>
        
      </div>
      <div className="openfile">
      {
            openfile.map((elem,ind)=>{
              return (
                <div className="cfilenames" key={ind}>
                <li className='cfile' onClick={()=>getcurruntdata(elem)}>{elem}</li>
                <div className="cross" onClick={()=>deleteopenfile(ind)}><i class="fa-solid fa-circle-xmark"></i></div>
              </div>
              )
            })
          }
          </div>
          <div className="datactn">
            <textarea value={currentdata} placeholder="Enter text here....." className="textinput" onChange={(e)=>setcurrentdata(e.target.value)}></textarea>
          </div></div>
          <ToastContainer />
    
    </div>
   
   )
}
export default Ctn;
 