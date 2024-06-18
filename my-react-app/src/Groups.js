import React, { useEffect,useState } from 'react';
import {useParams,useNavigate,Link} from "react-router-dom";
import axios from "axios";
import _ from "lodash";
//react'ta lodash kütüphanesi objeleri karşılaştırmaya veya
//bir dizi içerisinde belli bir objenin olup olmadığını anlamaya yarar
//lodash kütüphanesi npm install lodash kodu ile indirilebilir
//sonra sayfa başında import _ from lodash yaparak kullanılabilir
//_.isEqual() ve _.find metotları lodah kütüphanesine aittir.

export default function Groups(
  {groups,setGroups,signupformsubmitresult,setSignupformsubmitresult,
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
    const[count,setCount]=useState(0);
    
    useEffect(()=> {
      function fetchGroups(){
        axios.defaults.baseURL="http://localhost:8083";
        axios.get("/groups/getallgroups").then((response)=>
          {setGroups([...response.data]);});
      }
      
      fetchGroups();},[setGroups,count])

    function deleteGroup(groupId)
      {
          
          
        //axios kütüphanesi npm install axios kodu ile indirilebilir.
      
       axios.defaults.baseURL="http://localhost:8083";
       axios.delete("/groups/deletegroupbyid",{params:{groupId:groupId}});
     
       
       
      }

      function joinGroup(groupId,userId)
        {
            
            
          //axios kütüphanesi npm install axios kodu ile indirilebilir.
          //qs kullanmak için önce npm i qs yazarak indirmek gerekiyor.
          //qs kullanmayınca post isteklerinde veriler api'ya null gidiyor
         const qs=require('qs');
         axios.defaults.baseURL="http://localhost:8083";
         axios.post("/groups/beamemberofgroup",qs.stringify({groupId:groupId,userId:userId}));
         
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
    
  
   
    if(Object.keys(user).length !==0)
  {
  return (
    <div>
        
         {groups.map(group=>
         
         
         _.isEqual(group.owner,user)?
         <div key={group.id}>
         <Link to={"/groups/group/"+group.id} >{group.name}</Link>
         <button sync="true" onClick={()=>{deleteGroup(group.id);}} >Delete Group</button>
          </div>
          :!_.isEqual(group.owner,user) && _.find(group.members,user)?
          
          <div key={group.id}>
          <Link to={"/groups/group/"+group.id} >{group.name}</Link>
          <button sync="true" onClick={()=>leaveGroup(group.id,user.id)}>Leave Group</button>
           </div>
           :
           <div key={group.id}>
          <Link to={"/groups/group/"+group.id} >{group.name}</Link>
          <button sync="true" onClick={()=>joinGroup(group.id,user.id)}>Join Group</button>
           </div>
           
          
    )} 
     
    
    <Link to={"/groupcreationpage"}>Create A New Group</Link>
    </div>

  )
}else
{
  return(
    <div>
        
         {groups.map(group=>
         
         
        
           <div>
          <Link>{group.name}</Link>
           </div>
           
          
    )} 
    </div>
  )
}
}
