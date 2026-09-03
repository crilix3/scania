import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitialData } from "../../types/dataTypes/initialData";
import { loading } from "../../types/dataTypes/loading";
import getType from "../../api/requests/getType";
import getSearch from "../../api/requests/getSearch";
import type { ISearchData } from "../../types/dataTypes/ISearchData";
import type { ITransformSearchType } from "../../types/dataTypes/ITransformSearchType";
import type { RootState } from "../store";
import type { ITechnicalInfoData } from "../../types/dataTypes/ITechnicalInfoData";
import getTechnicalInfo from "../../api/requests/getTechnicalInfo";

interface IInitialState {
  searchTypeData: InitialData<ITransformSearchType[] | null>;
  searchData: InitialData<ISearchData | null>;
  technicalInfoData: InitialData<ITechnicalInfoData[] | null>;

  searchTypeValue: string;
  searchPartParam: string;
  searchNumber: string;
  activePageInfo: "noInfo" | "generalInfo" | "techInfo";
}

interface IPayload<T> {
  data: T;
}

const INITIAL_DATA = { isLoading: loading.NONE, error: { message: "", status: 0 }, data: null };

const initialState: IInitialState = {
  searchTypeData: INITIAL_DATA,
  searchData: INITIAL_DATA,
  technicalInfoData: INITIAL_DATA,

  searchTypeValue: "",
  searchPartParam: "",
  searchNumber: "",
  activePageInfo: "noInfo",
};

const searchPanelSlice = createSlice({
  name: "searchPanel",
  initialState: initialState,
  reducers: {
    setTypeSeacrhValue: (state, action) => {
      state.searchTypeValue = action.payload;
    },
    setSearchPartParam: (state, action) => {
      state.searchPartParam = action.payload;
    },
    setSearchNumber: (state, action) => {
      state.searchNumber = action.payload;
    },
    setActivePageInfo: (state, action) => {
      state.activePageInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region getTypeData
    builder.addCase(getTypeData.fulfilled, (state, action) => {
      state.searchTypeData.isLoading = loading.LOADED;
      state.searchTypeData.error = { message: "", status: 0 };
      state.searchTypeData.data = action.payload.data;
    });
    builder.addCase(getTypeData.pending, (state, _) => {
      state.searchTypeData.isLoading = loading.LOADING;
      state.searchTypeData.error = { message: "", status: 0 };
      state.searchTypeData.data = null;
    });
    builder.addCase(getTypeData.rejected, (state, action) => {
      state.searchTypeData.isLoading = loading.ERROR;
      state.searchTypeData.error.status = action.error.code;
      state.searchTypeData.error.message = action.error.message;
    });
    //#endregion
    //#region getSearchData
    builder.addCase(getSearchData.fulfilled, (state, action) => {
      state.searchData.isLoading = loading.LOADED;
      state.searchData.error = { message: "", status: 0 };
      state.searchData.data = action.payload.data;
      state.activePageInfo = "generalInfo";
    });
    builder.addCase(getSearchData.pending, (state, _) => {
      state.searchData.isLoading = loading.LOADING;
      state.searchData.error = { message: "", status: 0 };
      state.searchData.data = null;
    });
    builder.addCase(getSearchData.rejected, (state, action) => {
      state.searchData.isLoading = loading.ERROR;
      state.searchData.error.status = action.error.code;
      state.searchData.error.message = action.error.message;
    });
    //#endregion
    //#region getTechnicalInfo
    builder.addCase(getTechnicalInfoData.fulfilled, (state, action) => {
      state.technicalInfoData.isLoading = loading.LOADED;
      state.technicalInfoData.error = { message: "", status: 0 };
      state.technicalInfoData.data = action.payload.data;
    });
    builder.addCase(getTechnicalInfoData.pending, (state, _) => {
      state.technicalInfoData.isLoading = loading.LOADING;
      state.technicalInfoData.error = { message: "", status: 0 };
      state.technicalInfoData.data = null;
    });
    builder.addCase(getTechnicalInfoData.rejected, (state, action) => {
      state.technicalInfoData.isLoading = loading.ERROR;
      state.technicalInfoData.error.status = action.error.code;
      state.technicalInfoData.error.message = action.error.message;
    });
    //#endregion
  },
});

const getTypeData = createAsyncThunk("getTypeData/searchPanel", async (_, thunkApi) => getType(thunkApi));
const getSearchData = createAsyncThunk<IPayload<ISearchData>, void, { state: RootState }>("getSearch/searchPanel", async (_, thunkApi) => {
  const state = thunkApi.getState();
  return await getSearch(state.searchPanelStore.searchPartParam, state.searchPanelStore.searchNumber, thunkApi);
});
const getTechnicalInfoData = createAsyncThunk<IPayload<ITechnicalInfoData[]>, void, { state: RootState }>("getTechnicalInfo/searchPanel", async (_, thunkApi) => {
  const state = thunkApi.getState();
  return await getTechnicalInfo(state.searchPanelStore.searchPartParam, state.searchPanelStore.searchNumber, thunkApi);
});

export { getTypeData, getSearchData, getTechnicalInfoData };
export const { setTypeSeacrhValue, setSearchPartParam, setSearchNumber, setActivePageInfo } = searchPanelSlice.actions;
export const searchPanelReducer = searchPanelSlice.reducer;
