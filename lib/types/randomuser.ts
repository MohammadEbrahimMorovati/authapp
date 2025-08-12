export interface RandomUserName {
  title: string
  first: string
  last: string
}

export interface RandomUser {
  name: RandomUserName
  email: string
}

export interface RandomUserAPIResponse {
  results: Array<{
    name: RandomUserName
    email: string
  }>
}