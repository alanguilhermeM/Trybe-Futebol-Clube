export interface IRole {
  status: string
  data: UserInfo

}

export interface UserInfo {
  email: string,
  role: string,
}
