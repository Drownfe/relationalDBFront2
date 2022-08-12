import { commentsRequestI, PostI } from "../models/models.js"
export async function getAllPost() {
    const response:Response = await fetch("http://localhost:8081/api/get/posts")

    const post:PostI[] = await response.json()

    return post;
}

export async function createPost(post:PostI){
    const response:Response = await fetch('http://localhost:8081/api/create/post', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(post)
    })
  
    return response;
  }
  
  export async function deletePost(post:PostI){
    const response:Response = await fetch('http://localhost:8081/api/delete/post', 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
    })
  
    return response;
  }
  
  export async function editPost(post:PostI){
    const response:Response = await fetch('http://localhost:8081/api/update/post', 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(post)
    })
  
    return response;
  }


  export async function createComment(comment:commentsRequestI){
    console.log("creando comentario")
    console.log(comment)
    const response:Response = await fetch('http://localhost:8081/api/create/comment', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(comment)
    })
  
    return response;
  }
  
  export async function deleteComment(commentId: number){
    const response:Response = await fetch(`http://localhost:8081/api/delete/comment/${commentId}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentId)
    })
  
    return response;
  }
  
  export async function editComment(comment:commentsRequestI){
    const response:Response = await fetch('http://localhost:8081/api/update/comment', 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(comment)
    })
  
    return response;
  }