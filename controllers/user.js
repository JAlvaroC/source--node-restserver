const {response, request}=require('express')

const userGet=(req=request, res=response) =>{

    const {q,name='no name',apikey,limit,page=1}=req.query;
    res.json( {
        // ok:true,
        msg :'get API-controllers',
        q,
        name,
        apikey,
        limit,
        page

    } );
  }
const userPost=(req, res=response) =>{
    const  {name,age}=req.body;
    res.json( {
        ok:true,
        msg :'Post API-controllers',
        name,
        age 
    } );
  }
  const userPut=(req, res=response) =>{
      const {id}=req.params;
      res.json( {
          ok:true,
          msg :'Put API-controllers',
          id
      } );
    }
const userPatch=(req, res=response) =>{
    res.json( {
        ok:true,
        msg :'Patch API-controllers',
    } );
  }
const userDelete=(req, res=response) =>{
    res.json( {
        ok:true,
        msg :'Delete API-controllers',
    } );
  }
  
  
  
  


  module.exports={
    userGet,
    userPost,
    userPatch,
    userDelete,
    userPut
  }