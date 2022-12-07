import { IApiResponse } from "./IApiResponse";

export interface IClaimList extends IApiResponse {
  data: string[];
}
