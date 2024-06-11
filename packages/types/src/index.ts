export interface IUserCreateInput {
  name: string;
  email: string;
}

export interface IUserCreateOutput extends IUserCreateInput {
  id: string;
}
