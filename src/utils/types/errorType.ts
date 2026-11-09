import {AxiosError} from 'axios';

export interface ErrorResponse extends AxiosError {
  data: {
    message: string;
  };
}
