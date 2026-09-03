import type { AxiosError } from "axios";
import { query } from "../instanceAxios";
import type { AsyncThunkConfig, GetThunkAPI } from "@reduxjs/toolkit";
import type { ISearchData } from "../../types/dataTypes/ISearchData";

const getSearch = async (
  searchPart: string,
  numSearch: string,
  thunkApi: GetThunkAPI<AsyncThunkConfig>,
) => {

  try {
    const res = await query.get(
      `search/${searchPart}?num=${numSearch}&lang=ru-RU`,
    );
    if (res.status !== 200) {
      return thunkApi.rejectWithValue({
        message: `Error ${res.statusText}`,
        status: res.status,
      });
    }

    const payload = {
      data: res.data as ISearchData,
    };

    return payload;
  } catch (e: unknown) {
    const error = e as AxiosError;
    return thunkApi.rejectWithValue({
      message:
        error.name === "AbortError" ? "Request cancelled" : "Connection error",
      status: error.name === "AbortError" ? 0 : "NETWORK_ERROR",
    });
  }
};

export default getSearch;
