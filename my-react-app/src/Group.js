
import React, { useEffect,useState } from 'react';
import {useParams,Link} from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash";



export default function Group({group,setGroup,user,setUser}) {

  
const[newCommentContent,setNewCommentContent] =useState("");
const[commentToBeQuoted,setCommentToBeQuoted]=useState({content:""});
const[groupMembers,setGroupMembers]=useState([]);
const[groupComments,setGroupComments]=useState([]);

const{groupId}=useParams();

// function fetchGroup(){
//     axios.defaults.baseURL="http://localhost:8083";
//     axios.get("/groups/getonegroupbyid",{params:{groupId:groupId}}).then((response)=>{setGroup({...response.data})});
//   }
// function fetchComments(){
//     axios.defaults.baseURL="http://localhost:8083";
//     axios.get("/comments/getcommentsofagroup",{params:{groupId:groupId}}).then((response)=>{setGroupComments([...response.data])});
//   }
//   function fetchMembers(){
//     axios.defaults.baseURL="http://localhost:8083";
//     return axios.get("/groups/getonegroupmembersbygroupid",{params:{groupId:groupId}}).then((response)=>{setGroupMembers([...response.data])});
//   }

  // function fetchUser(){
  //   axios.defaults.baseURL="http://localhost:8083";
  //   axios.get("/users/getoneuserbyid",{params:{userId:user.id}})
  //   .then((response)=>{setUser({...response.data})});
  // }


    useEffect(()=> {

      function fetchGroup(){
        axios.defaults.baseURL="http://localhost:8083";
        axios.get("/groups/getonegroupbyid",{params:{groupId:groupId}}).then((response)=>{setGroup({...response.data})});
      }
    function fetchComments(){
        axios.defaults.baseURL="http://localhost:8083";
        axios.get("/comments/getcommentsofagroup",{params:{groupId:groupId}}).then((response)=>{setGroupComments([...response.data])});
      }
      function fetchMembers(){
        axios.defaults.baseURL="http://localhost:8083";
        return axios.get("/groups/getonegroupmembersbygroupid",{params:{groupId:groupId}}).then((response)=>{setGroupMembers([...response.data])});
      }
    

        fetchGroup();
        fetchComments();
        fetchMembers();   
     },[groupId,setGroup,setGroupComments,setGroupMembers])

     const disdiv={
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      rowGap:"20px"
     }
     const baslik={
      width:"300px",
      textAlign:"center",
      border:"1px solid black",
      fontSize:"2rem"
  }

  function handlenewcomment(e)
    {
        e.preventDefault();
        
      //axios kütüphanesi npm install axios kodu ile indirilebilir.
      //qs kullanmak için önce npm i qs yazarak indirmek gerekiyor.
      //qs kullanmayınca post isteklerinde veriler api'ya null gidiyor
     const qs=require('qs');
     axios.defaults.baseURL="http://localhost:8083";
     axios.post("/comments/createcomment",
     qs.stringify({userId:user.id,content:newCommentContent,
      commentIdToBeQuoted:commentToBeQuoted.id, groupId:group.id}));
      setNewCommentContent("");
      setCommentToBeQuoted({content:""});
    
    }



  return (
    
        <div style={disdiv}>
        <div style={baslik}>{group.name}</div>
        {groupComments.map(comment=>
          <div>
            {comment.quotedComment !=null? 
            <div>
            <div style={{border:"1px solid blue",width:"400px"}}>Quoted Comment Owner: <Link to={"/users/user/"+comment.quotedComment.owner.id}>{comment.quotedComment.owner.name} {comment.quotedComment.owner.surname}</Link></div>
            <div style={{border:"1px solid blue",width:"400px"}}>Quoted Comment Content:{comment.quotedComment.content}</div>
            </div> 
            :<div></div>}
            <div style={{border:"1px solid red",width:"400px"}}>Comment Owner: <Link to={"/users/user/"+comment.owner.id}>{comment.owner.name} {comment.owner.surname}</Link></div>
            <div style={{border:"1px solid red",width:"400px"}}>Comment Content: {comment.content}</div>
            {_.find(group.members,user)?
            <button sync="true" onClick={()=>setCommentToBeQuoted({...comment})}>Quote</button>
            :<div></div>}
            
          </div>
        
        )}
        {//Object.keys(commentToBeQuoted.content).length 
        commentToBeQuoted!==null && commentToBeQuoted.content.length!==0? 
        <div>
        <div>{commentToBeQuoted.content}</div>
        <button sync="true" onClick={()=>setCommentToBeQuoted({content:""})}>Give up to quote comment </button>
        </div>
        :<div></div>
        }
         {_.find(group.members,user)?
            <Form sync="true" onSubmit={(e)=>handlenewcomment(e)}>
            {/* <Form action='http://localhost:8083/users/enteruser' method='post'> */}
    
            
            
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              New Comment
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Comment" name="content" autoComplete="off" value={newCommentContent} onChange={(e)=>setNewCommentContent(e.target.value)}/>
            </Col>
          </Form.Group>
    
          
          
         
          
    
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
               <Button type="submit" >Make New Comment</Button> 
            </Col>
          </Form.Group>
        </Form>
            :<div></div>}
        
        </div>
    
    
  )
}
