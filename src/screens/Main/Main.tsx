import { useEffect } from "react";
import { Loader, MainInfo, SearchPanel } from "../../shared";
import style from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTypeData } from "../../store/slices/searchPanelSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { loading } from "../../types/dataTypes/loading";

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(
    (state: RootState) => state.searchPanelStore.searchTypeData,
  );

  useEffect(() => {
    dispatch(getTypeData());
  });
  if (isLoading === loading.LOADING) {
    return <Loader />;
  } else {
    return (
      <div className={style.main}>
        <div className={style.main__container}>
          <div className={style.main__grid}>
            <SearchPanel />
            <MainInfo />
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
