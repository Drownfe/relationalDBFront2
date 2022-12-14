import { idText } from "../../node_modules/typescript/lib/typescript.js";
import { commentsRequestI, commentsResponseI, PostI } from "./models/models.js";

import { createPost, getAllPost, editPost, deletePost, createComment, editComment, deleteComment } from "./request/asyncRequest.js";
declare global {
  interface Window {
      showAllPost:any
  }
}
window.showAllPost = showAllPost;
function inserComment(inputId:string){
  const contentInput = document.getElementById(inputId) as HTMLInputElement;
  console.log(contentInput.value)

  if(contentInput.value){
    const id = inputId.split('-')[1]
    console.log(contentInput.value)
    const newComment: commentsRequestI = {
      content: contentInput.value,
      postIdPost: {
        id: Number(id)
      }
    }

    createComment(newComment).then(
      response => {
        if(response.status === 200){
          const apiData = response.json();
        }
      }
    ).then(()=>showAllPost());
  }
}

function materializePost(posts:Array<PostI>){
    const divRoot = document.querySelector("#root") as HTMLDivElement;
    posts.forEach(post => renderPost(post, divRoot))
}

function renderPost(post:PostI, divRoot:HTMLDivElement){
    "container-post-${post.id}"
    const singlePostContainer = document.createElement('div');
    singlePostContainer.className = `single_post_container-${post.id}`
    singlePostContainer.classList.add("single_post_container")
    const singlePostContent =`
    <h2 class="single-post-title-${post.id}">${post.title}</h2>
    <p class="single-post-content-${post.id}">${post.content}</p>`

    const likeButton:HTMLButtonElement = document.createElement('button')
    likeButton.className = 'single-post-like-button'
    likeButton.innerText = 'Like Post'
    
    const deleteButton:HTMLButtonElement = document.createElement('button')
    deleteButton.className = 'single-post-delete-button'
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', ()=> handleDelete(post))

    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'single-post-edit-button'
    editButton.innerText = 'Edit'
    editButton.addEventListener('click', ()=> handleEdit(post))

    singlePostContainer.innerHTML = singlePostContent;
    singlePostContainer.append(deleteButton, editButton, likeButton)
    
    materializeComments(post.comments, singlePostContainer)
    divRoot.append(singlePostContainer);
    
    const newCommentForm = document.createElement('form');
    newCommentForm.classList.add('comment-form');
    const commentFormInput = document.createElement('input');
    commentFormInput.setAttribute('placeholder', 'Create new comment');
    commentFormInput.setAttribute('type', 'text');
    const commentFormButton = document.createElement('button');
    commentFormButton.innerText = "Comment"
    commentFormButton.setAttribute('type','button')
    commentFormInput.classList.add('content-input');
    const buttonId = `button-${post.id}`
    const inputId = `input-${post.id}`
    commentFormInput.id = inputId
    commentFormButton.id = buttonId
    commentFormButton.addEventListener('click', () => inserComment(inputId));

    newCommentForm.appendChild(commentFormInput);
    newCommentForm.appendChild(commentFormButton);
    singlePostContainer.appendChild(newCommentForm);
}

function materializeComments(comments:Array<commentsResponseI>,postContainer: HTMLDivElement){
    comments.forEach(comment => renderComment(comment, postContainer))
}

function renderComment(comment:commentsResponseI, postContainer:HTMLDivElement){
    const singleCommentContainer: HTMLDivElement = document.createElement('div')
    singleCommentContainer.className = `single_comment_container-${comment.id}`
    singleCommentContainer.classList.add("single_comment_container")
    const singleCommentContent:string=`
    <p class="single-comment-content-${comment.id}">${comment.content}</p>`
   
    const likeButton:HTMLButtonElement = document.createElement('button')
    likeButton.className = 'single-post-like-button'
    likeButton.innerText = 'Like Comment'

    const deleteButton:HTMLButtonElement = document.createElement('button')
    deleteButton.className = 'single-comment-delete-button'
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', ()=> handleCommentDelete(Number(comment.id)))
  
    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'single-comment-edit-button'
    editButton.innerText = 'Edit'
    singleCommentContainer.innerHTML = singleCommentContent;
    singleCommentContainer.append(deleteButton,editButton, likeButton)
    postContainer.append(singleCommentContainer);
}

const formPost: HTMLFormElement|null =
document.querySelector('.post-form')

let posts:PostI[];

function showAllPost(){
  const postDiv = document.getElementById('root') as HTMLDivElement;
    postDiv.innerHTML = ''
    getAllPost().then(response =>{
    posts = response
    materializePost(posts)
  })
}

formPost?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const titleInput = document.querySelector('.title-input') as HTMLInputElement;
  const contentInput = document.querySelector('.content-input') as HTMLInputElement;
  if(titleInput.value&&contentInput.value){
    const newPost: PostI = {
      id: null,
      title: titleInput.value,
      content: contentInput.value,
      number_of_likes: 0,
      comments: []
    }

    createPost(newPost).then(
      response => {
        if(response.status === 200){
           
          titleInput.value = '';
          contentInput.value = '';
        }
      }
    ).then(()=>showAllPost());
  }
}

    function handleEdit(post:PostI){
    const titleInput = document.querySelector('.title-input') as HTMLInputElement;
    const contentInput = document.querySelector('.content-input') as HTMLInputElement;
    const submitButton = document.querySelector('.post-form-button') as HTMLButtonElement
    submitButton.classList.add('display_none')
  
    const editButton:HTMLButtonElement = document.createElement('button')
    editButton.className = 'form-edit-button'
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(post, titleInput, contentInput))

    const formContainer = document.querySelector('.form-container');
    formContainer?.append(editButton)
    
    titleInput.value = post.title
    contentInput.value = post.content;
  }

  function executeEdition(post:PostI, title:HTMLInputElement, content:HTMLInputElement){
    const postEdited:PostI = {
      id:post.id,
      title:title.value,
      content:content.value,
      number_of_likes: 0,
      comments: []
    }

    editPost(postEdited).then(response => {
    if(response.status === 200){
      const newState:PostI[] = posts.map(post => post.id === postEdited.id?postEdited:post)
      posts = newState;
    
      const h2Title = document.querySelector(`.single-post-title-${post.id}`) as HTMLHeadingElement
      h2Title.innerText = postEdited.title
      const pContent = document.querySelector(`.single-post-content-${post.id}`) as HTMLParagraphElement
      pContent.innerText = postEdited.content
      
      title.value = ''
      content.value = ''
      const submitButton = document.querySelector('.post-form-button') as HTMLButtonElement
      submitButton.classList.remove('display_none')
      const editButton = document.querySelector('.form-edit-button') as HTMLButtonElement
      editButton.remove()
    }
  })
}

function handleDelete(post:PostI){
  deletePost(post).then(response => { 
    if(response.status === 200){
      const newState:PostI[] = posts.map(post => post.id === post.id?post:post)
      posts = newState;
    }
  }).then(()=>showAllPost()); 
}

function handleCommentDelete(id:number){
  deleteComment(id).then(()=>showAllPost());
}