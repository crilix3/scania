import { useDispatch, useSelector } from "react-redux";
import style from "./SearchPanel.module.css";
import type { AppDispatch, RootState } from "../../store/store";
import type { SearchType } from "../../types/dataTypes/SearchType";
import { getSearchData, getTechnicalInfoData, setSearchNumber, setSearchPartParam, setTypeSeacrhValue } from "../../store/slices/searchPanelSlice";
import { useEffect, useState } from "react";

interface ISelectElProps {
  data: SearchType[] | null;
}

const SelectTypeElem = ({ data }: ISelectElProps) => {
  if (!data) return;
  return data.map((el) => (
    <option
      key={el.description}
      className={style.searchType__elem}
      value={el.type}
    >
      {el.description}
    </option>
  ));
};

const SearchPanel = () => {
  const [searchEngine, setSearchEngine] = useState<string>("");
  const [searchChassis, setSearchChassis] = useState<string>("");
  const [searchPram, setSearchParam] = useState<string>("");

  const searchPanelStore = useSelector((state: RootState) => state.searchPanelStore);
  const dispatch = useDispatch<AppDispatch>();

  function handleChangeChassis(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setSearchChassis(newValue);

    dispatch(setSearchNumber(newValue));
    if (newValue !== "") {
      setSearchEngine("");
    }
  }

  function handleChangeEngine(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setSearchEngine(newValue);
    dispatch(setSearchNumber(newValue));
    if (newValue !== "") {
      setSearchChassis("");
    }
  }

  return (
    <div className={style.main__search__info}>
      <div className={style.search__block}>
        <h1 className={style.search__title}>Поиск шасси/двигателя</h1>
        <div className={style.search__options}>
          <div className={style.searchInput__block}>
            <span className={style.searchInput__title}>Заводской номер шасси:</span>
            <input
              className={style.searchInput}
              id="chassis"
              type="text"
              maxLength={7}
              value={searchChassis}
              onChange={(e) => {
                setSearchParam("chassis");
                handleChangeChassis(e);
              }}
            />
          </div>
          <div className={style.searchInput__block}>
            <span className={style.searchInput__title}>Тип:</span>
            <select
              className={style.select__type}
              // onChange={(e) => {
              //   dispatch(setTypeSeacrhValue(e.target.value));
              // }}
            >
              <SelectTypeElem data={searchPanelStore.searchTypeData.data} />
            </select>
          </div>
          <div className={style.searchInput__block}>
            <span className={style.searchInput__title}>Регистрационный номер:</span>
            <input
              className={style.searchInput}
              disabled
              type="text"
            />
          </div>
          <div className={style.searchInput__block}>
            <select className={style.select__type}>{/* <SelectCatalogByModelElem data={searchPanelStore.searchCatalogBMData.data} /> */}</select>
          </div>
          <div className={style.searchInput__block}>
            <span className={style.searchInput__title}>Заводской номер:</span>
            <input
              className={style.searchInput}
              id="engine"
              type="text"
              maxLength={7}
              value={searchEngine}
              onChange={(e) => {
                setSearchParam("engine");
                handleChangeEngine(e);
              }}
            />
          </div>
          <div className={style.searchInput__block}>
            <button
              className={style.btn__search}
              onClick={() => {
                dispatch(setSearchPartParam(searchPram));
                dispatch(getSearchData());
                dispatch(getTechnicalInfoData());
              }}
            >
              Поиск
            </button>
          </div>
        </div>
      </div>
      <div className={style.info__block}>
        <h1 className={style.info__title}>Информация о шасси/двигателе</h1>
      </div>
      <div className={style.adaptation__block}>
        <h1 className={style.adaptation__title}>Адаптации</h1>
      </div>
    </div>
  );
};

export default SearchPanel;
