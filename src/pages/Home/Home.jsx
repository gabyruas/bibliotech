import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Home() {
  const resultado = useContext(ThemeContext);
  const temaDark = resultado.temaDark;
  
  return(
    <div className={`${temaDark ? "bg-dark text-light" : "bg-light text-dark"} home`}>
      HOME
    </div>
  )
}
