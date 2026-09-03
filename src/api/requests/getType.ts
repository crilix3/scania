import type { AsyncThunkConfig, GetThunkAPI } from "@reduxjs/toolkit";
import { query } from "../instanceAxios";
import type { AxiosError } from "axios";
import type { SearchType } from "../../types/dataTypes/SearchType";

const getType = async (thunkApi: GetThunkAPI<AsyncThunkConfig>) => {
  try {
    const res = await query.get(`/search/getModels?lang=ru-RU`);

    if (res.status !== 200) {
      return thunkApi.rejectWithValue({
        message: `Error ${res.statusText}`,
        status: res.status,
      });
    }
    const data = res.data as SearchType[];
    const cataloguesList = data.map((el) => {
      const catalogues = Object.entries(el.catalogues).map((c) => {
        return { value: c[1], label: c[0] };
      });
      return {
        catalogues: catalogues,
        type: el.type,
        description: el.description,
      };
    });
    console.log(cataloguesList);

    const payload = {
      data: cataloguesList,
    };
    return payload;
  } catch (e: unknown) {
    const error = e as AxiosError;
    return thunkApi.rejectWithValue({
      message: error.name === "AbortError" ? "Request cancelled" : "Connection error",
      status: error.name === "AbortError" ? 0 : "NETWORK_ERROR",
    });
  }
};

export default getType;
