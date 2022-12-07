import { IApiResponse } from "./IApiResponse";

export interface IAuthResponse extends IApiResponse {
  data: string;
}
