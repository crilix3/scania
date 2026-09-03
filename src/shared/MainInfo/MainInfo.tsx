import style from "./MainInfo.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import type { ISearchData } from "../../types/dataTypes/ISearchData";
import { setActivePageInfo } from "../../store/slices/searchPanelSlice";
import type { ITechnicalInfoData } from "../../types/dataTypes/ITechnicalInfoData";

interface IInfoProps {
  dataInfo: ISearchData | null;
  searchParam: string;
}

interface ITechInfoProps {
  techInfoData: ITechnicalInfoData[] | null;
}

const Info = ({ dataInfo, searchParam }: IInfoProps) => {
  const isfullInfo = () => {
    if (!dataInfo) return;
    if (searchParam === "chassis") {
      return (
        <div className={style.fullinfo}>
          <div className={style.fullInfo_even}>
            {dataInfo.info.even.map((el, index) => (
              <div
                className={style.fullInfo_elem}
                key={index}
              >
                <div className={style.info_key}>{el.key}:</div>
                <div className={style.info_value}>{el.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (searchParam === "engine") {
      return (
        <div className={style.fullinfo}>
          <div className={style.fullInfo_even}>
            {dataInfo.info.even.map((el, index) => (
              <div
                className={style.fullInfo_elem}
                key={index}
              >
                <div className={style.info_key}>{el.key}:</div>
                <div className={style.info_value}>{el.value}</div>
              </div>
            ))}
          </div>
          <div className={style.fullInfo_odd}>
            {dataInfo.info.odd.map((el, index) => (
              <div
                className={style.fullInfo_elem}
                key={index}
              >
                <div className={style.info_key}>{el.key}:</div>
                <div className={style.info_value}>{el.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };
  return <div className={style.mainInfo__content}>{isfullInfo()}</div>;
};

const TechnicalInfo = ({ techInfoData }: ITechInfoProps) => {
  return (
    <div className={style.technicalInfo_content}>
      <div className={style.technicalInfo_block}>
        <div className={style.blue_panel}></div>
        <div className={style.technicalInfo_infoList}>
          <div className={style.technicalInfo_infoList_block}>
            {techInfoData &&
              techInfoData.map((g) => (
                <React.Fragment key={g.maingroup}>
                  <div className={style.mainGroup}>
                    <div className={style.mainGroup_number}>
                      <span>{g.maingroup}</span>
                    </div>
                    <div className={style.mainGroup_title}>
                      <span>{g.maingroupDesc}</span>
                    </div>
                  </div>
                  {g.items.map((i, index) => {
                    return (
                      <div
                        className={style.mg_infoElem}
                        key={index}
                      >
                        <div className={style.mg_infoElem_text}>{i.even && i.even.key}</div>
                        <div className={style.mg_infoElem_text}>{i.even && i.even.value}</div>
                        <div className={style.mg_infoElem_text}>{i.odd && i.odd.key}</div>
                        <div className={style.mg_infoElem_text}>{i.odd && i.odd.value}</div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchInfo = useSelector((state: RootState) => state.searchPanelStore.searchData);
  const technicalInfo = useSelector((state: RootState) => state.searchPanelStore.technicalInfoData);

  const searchPartParam = useSelector((state: RootState) => state.searchPanelStore.searchPartParam);
  const activeInfoPage = useSelector((state: RootState) => state.searchPanelStore.activePageInfo);

  const selectStyle = (nameBtn: string) => {
    if (nameBtn === activeInfoPage)
      return {
        backgroundColor: "#fff",
        paddingTop: "4px",
        borderBottom: "1px solid #fff",
      };
  };

  return (
    <div className={style.main__info}>
      <div className={style.mainInfo__btnList}>
        {searchInfo.data ? null : (
          <button
            className={style.btnList__btn}
            style={selectStyle("noInfo")}
            onClick={() => dispatch(setActivePageInfo("noInfo"))}
          >
            Нет информации
          </button>
        )}
        {!searchInfo.data ? null : (
          <React.Fragment>
            <button
              className={style.btnList__btn}
              style={selectStyle("generalInfo")}
              onClick={() => dispatch(setActivePageInfo("generalInfo"))}
            >
              Общая информация
            </button>
            <button
              className={style.btnList__btn}
              style={selectStyle("techInfo")}
              onClick={() => dispatch(setActivePageInfo("techInfo"))}
            >
              Техническая информация
            </button>
          </React.Fragment>
        )}
      </div>
      {searchInfo.data && activeInfoPage === "generalInfo" ? (
        <Info
          dataInfo={searchInfo.data}
          searchParam={searchPartParam}
        />
      ) : null}
      {technicalInfo.data && activeInfoPage === "techInfo" ? <TechnicalInfo techInfoData={technicalInfo.data} /> : null}
    </div>
  );
};

export default MainInfo;
