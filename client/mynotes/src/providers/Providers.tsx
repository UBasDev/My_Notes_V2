import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import redux_stores from "../redux_stores/index";
import { Provider } from "react-redux";
import Custom_Snackbar from "@/components/snackbar/custom_snackbar";
import Custom_Progress from "@/components/progress/custom_progress";
import Error_Boundary from "@/components/error/error_boundary";

const Providers: FC<any> = ({ children }) => {
  return (
    <Error_Boundary>
    <SessionProvider>
      <Provider store={redux_stores}>
        {children}
        <Custom_Snackbar />
        <Custom_Progress />
      </Provider>
    </SessionProvider>
    </Error_Boundary>
  );
};
export default Providers;
