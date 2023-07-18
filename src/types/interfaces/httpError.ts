export interface httpError {
  status?: number | null;
  message?: string | null;
}

export interface httpErrorSlice{
  success: boolean,
  message: string,
  error?: Array<String>
}