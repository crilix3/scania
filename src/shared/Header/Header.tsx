import React from "react";
import { HEADER_ELEMENT } from "../../constants/componentData";
import type { HeaderElem } from "../../types/constTypes/HeaderElem.types";
import style from "./Header.module.css";

const BtnEl = (el: HeaderElem, index: number) => {
  const html = (
    <React.Fragment key={el.bgPosY}>
      <button
        className={style.header_el_btn}
        style={{ backgroundPosition: `-${el.bgPosY}px ${el.bgPosX}px` }}
      ></button>
      <span className={style.separator}></span>
    </React.Fragment>
  );
  switch (index) {
    case 0:
      return html;
    case 1:
      return html;
    case 4:
      return html;
    case 8:
      return html;
    case 10:
      return html;
    default:
      return (
        <button
          key={el.bgPosY}
          className={style.header_el_btn}
          style={{ backgroundPosition: `-${el.bgPosY}px ${el.bgPosX}px` }}
        ></button>
      );
  }
};

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.header_block}>{HEADER_ELEMENT.map((el, index) => BtnEl(el, index))}</div>
    </div>
  );
};

export default Header;
