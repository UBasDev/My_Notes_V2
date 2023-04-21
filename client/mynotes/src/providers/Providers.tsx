import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import redux_stores from "../redux_stores/index";
import { Provider } from "react-redux";
import Custom_Snackbar from "@/components/snackbar/custom_snackbar";
import Error_Boundary from "@/components/error/error_boundary";
import Custom_Progress_Page_Transition from "@/components/progress/custom_progress_page_transition";
import Custom_Progress_Global from "@/components/progress/custom_progress_global";

const Providers: FC<any> = ({ children }) => {
  return (
    <Error_Boundary>
    <SessionProvider>
      <Provider store={redux_stores}>
        {children}
        <Custom_Snackbar />
        <Custom_Progress_Page_Transition />
        <Custom_Progress_Global/>
      </Provider>
    </SessionProvider>
    </Error_Boundary>
  );
};
export default Providers;
