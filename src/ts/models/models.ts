export interface PostI{
    id: number|null,
    title: string,
    message: string,
    numberOfLikes: number,
    comments: commentsResponseI []
}

export interface commentsRequestI{
    //id: number|null,
    message: string,
    //number_of_likes: number,
    fkPostId: object
    
}

export interface commentsResponseI{
    id: number|null,
    message: string,
    //number_of_likes: number,
    fkPostId: number|null
    
}