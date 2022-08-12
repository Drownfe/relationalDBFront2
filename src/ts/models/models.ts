export interface PostI{
    id: number|null,
    title: string,
    message: string,
    numberOfLikes: number,
    comments: commentsResponseI []
}

export interface commentsRequestI{
    message: string,
    fkPostId: number|null
    
}

export interface commentsResponseI{
    id: number|null,
    message: string,
    fkPostId: number|null
}

export interface userLikeI{
    id: number|null,
    userName:string,
    dni:number|null
}