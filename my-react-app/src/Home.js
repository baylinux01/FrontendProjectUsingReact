import React, { useEffect,useState } from 'react';
import {useParams,useNavigate,Link} from "react-router-dom";
import axios from "axios";
import _ from "lodash";


export default function Home(
  {group,setgroup,groups,setGroups,signupformsubmitresult,setSignupformsubmitresult,
    user,setUser,unsuccessfulsignin,setUnsuccessfulsignin}
  ) {
  

  // function fetchGroups(){
  //   axios.defaults.baseURL="http://localhost:8083";
  //   axios.get("/groups/getallgroups").then((response)=>
  //     {setGroups([...response.data]);});
  // }

  // function fetchUser(){
  //   axios.defaults.baseURL="http://localhost:8083";
  //   axios.get("/users/getoneuserbyid",{params:{userId:user.id}})
  //   .then((response)=>{setUser({...response.data})});
  // }

  useEffect(()=>{
    function fetchGroups(){
      axios.defaults.baseURL="http://localhost:8083";
      axios.get("/groups/getallgroups").then((response)=>
        {setGroups([...response.data]);});
    }
    
    fetchGroups();},[setGroups]);


  function deleteGroup(groupId)
    {
        
        
      //axios kütüphanesi npm install axios kodu ile indirilebilir.
     
     axios.defaults.baseURL="http://localhost:8083";
     axios.delete("/groups/deletegroupbyid",{params:{groupId:groupId}});
   
     
     
    }

    function leaveGroup(groupId,userId)
      {
          
          
        //axios kütüphanesi npm install axios kodu ile indirilebilir.
        //qs kullanmak için önce npm i qs yazarak indirmek gerekiyor.
        //qs kullanmayınca post isteklerinde veriler api'ya null gidiyor
       const qs=require('qs');
       axios.defaults.baseURL="http://localhost:8083";
       axios.post("/groups/exitgroup",qs.stringify({groupId:groupId,userId:userId}));
     
       
      }

 

  const style={width:"100%",height:"auto",minHeight:"100px",backgroundColor:"hsla(0, 86%, 29%, 0.897)"}
  return (
    
    <div>
      {
      Object.keys(user).length!==0 ?
      <div>
        <div>Kurucusu olduğunuz gruplar:</div>
      <div style={style}> {groups.filter(group=>
      
         _.isEqual(group.owner,user)
        
  ).map(g=>

    <div key={g.id}>
           <Link to={"/groups/group/"+g.id} >{g.name}</Link>
           <button sync="true" onClick={()=>deleteGroup(g.id)}>Delete Group</button>
          </div>
  )}
      </div>
      <div>Üye olduğunuz gruplar:</div>
      <div style={style}> {groups.filter(group=>
      
      !_.isEqual(group.owner,user) && _.find(group.members,user)
     
).map(g=>

 <div key={g.id}>
        <Link to={"/groups/group/"+g.id} >{g.name}</Link>
        <button sync="true" onClick={()=>leaveGroup(g.id,user.id)}>Leave Group</button>
       </div>
)}
   </div>
      <Link to={"/groupcreationpage"}>Create A New Group</Link>
      </div>
       : <div style={style}>Home</div>
    }
    </div>
    
    
   
  )
}
