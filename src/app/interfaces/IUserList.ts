import { IApiResponse } from "./IApiResponse";

export interface IUserList extends IApiResponse {
  data: string[];
}
