export type TArticle = {
    title: string
    body: string
    date: string
    votes: number
    _id: string
}

export type TArticleCreate = Pick<TArticle, 'title' | 'body'>
