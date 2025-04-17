import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./Routes/Routes";
import { useSelector } from "react-redux";
import {useEffect } from "react";
function App() {
  const language = useSelector((state) => state.ui.language);

  useEffect(() => {
    if (language === "ar") {
      document.getElementsByTagName("html")[0].setAttribute("lang", "ar");
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    } else {
      document.getElementsByTagName("html")[0].setAttribute("lang", "en");
      document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
    }
  }, [language]);
  return (
    
      <RouterProvider router={routes}></RouterProvider>
   
  );
}

export default App;
