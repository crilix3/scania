// import { createSlice } from "@reduxjs/toolkit";
// import type { InitialData } from "../../types/dataTypes/initialData";
// import type { ISearchData } from "../../types/dataTypes/ISearchData";
// import type { SearchChassisInfo } from "../../types/dataTypes/SearchChassisInfo";
// import type { SearchEngineInfo } from "../../types/dataTypes/SearchEngineInfo";
// import { loading } from "../../types/dataTypes/loading";

// const INITIAL_DATA = { isLoading: loading.NONE, error: { message: "", status: 0 }, data: null };

// interface IInitialState {
//   searchData: InitialData<ISearchData<SearchChassisInfo | SearchEngineInfo> | null>;
// }

// const initialState: IInitialState = {
//   searchData: INITIAL_DATA,
// };

// const mainPageSlice = createSlice({
//   name: "mainPage",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {},
// });

// export const mainPageReduser = mainPageSlice.reducer;
