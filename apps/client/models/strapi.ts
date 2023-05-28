export type Response<T> = {
    id:number,
    attributes: T
}

export type SingleResponse<T> = {
    data: Response<T>,
    meta: any
}

export type ListResponse<T> = {
    data: Response<T>[],
    meta: {
        pagination:{
            page: number,
            pageCount:number,
            pageSize:number,
            total:number,
        }
    }
    
}