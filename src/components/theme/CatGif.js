import day from "./daycat.gif";
import night from "./nightcat.gif";
import day2 from "./daycat2.gif";
import night2 from "./nightcat2.gif";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";

const CatGif = ({cat}) => {
  const theme = useContext(ThemeContext)[0];
  const style = {
      float: "left",
      right: cat === "1" ? "75px" : "15%",
      position: "absolute",
      top: theme === "dark" ? "2.4%" : "4%"
  }
  const catSrc = (() => {
        if (theme === "normal" && cat === "1")
            return day
        else if (theme === "normal" && cat === "2")
            return day2
        else if (theme === "dark" && cat === "1")
            return night
        else return night2
    })();

  return (
      <img src={catSrc} alt="day" style={style} />
  );
};

export default CatGif;
