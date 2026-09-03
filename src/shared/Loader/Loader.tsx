import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader_wrapper}>
      <div className={style.loader_block}>
        <div className={style.loader}></div>
      </div>
    </div>
  );
};

export default Loader;
