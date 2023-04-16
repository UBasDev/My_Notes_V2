import axiosInstances from "@/lib/axios/axiosInstances";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,  
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./get_all_cryptos.module.css";
import { useDispatch } from "react-redux";
import { hide_progress, show_progress } from "@/redux_stores/progress_state";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
//import Get_All_Cryptos_Table_Row from "@/components/get_all_cryptos_components/get_all_cryptos_table_row/get_all_cryptos_table_row";
import utils from "@/utils";
import dynamic from "next/dynamic";
import Border_Linear_Progress from "@/components/progress/border_linear_progress";
import { Get_all_cryptos_table_headers_props } from "@/interfaces";

const Get_All_Cryptos_Table_Row = dynamic(
  () => import("@/components/get_all_cryptos_components/get_all_cryptos_table_row/get_all_cryptos_table_row"),
  {
    loading: () => <Border_Linear_Progress/>,
    ssr: false      
  }
);

const string1: string =
  "This page is not working properly because of public api limitation which i've used for this screen";

const table_main_headers: ReadonlyArray<Get_all_cryptos_table_headers_props> = [
  {
    id: 1,
    key: "icon",
    value: "",
    width: "5%",
    align: "center",
  },
  {
    id: 2,
    key: "name",
    value: "name",
    width: "25%",
    align: "left",
  },
  {
    id: 3,
    key: "price",
    value: "price",
    width: "19%",
    align: "left",
  },
  {
    id: 4,
    key: "change_24h",
    value: "change 24h",
    width: "19%",
    align: "left",
  },
  {
    id: 5,
    key: "total_volume",
    value: "total volume",
    width: "19%",
    align: "left",
  },
  {
    id: 6,
    key: "market_cap",
    value: "market cap",
    width: "19%",
    align: "left",
  },
];

const Get_All_Cryptos: NextPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [rows, set_rows] = useState<ReadonlyArray<any>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [current_collapsed_item_id, set_current_collapsed_item_id] =
    useState<string>("");
  const [controller, setController] = useState({
    current_page: 0,
    page_size: 10,
    total_count: 10,
  });
  useEffect(() => {
    getAllCryptoData();
  }, [
    JSON.stringify(controller.current_page),
    JSON.stringify(controller.page_size),
  ]);

  const getAllCryptoData = async () => {    
    dispatch(show_progress());
    const is_crypto_data_exists_in_session_storage =
      localStorage.getItem("crypto_data") ? true : false;
    const is_crypto_data_refresh = utils.get_cookie_by_name(
      "is_crypto_data_refresh"
    );
    if (!is_crypto_data_exists_in_session_storage || !is_crypto_data_refresh) {
      console.log("APIDEN ÇEKİLDİ");
      let all_crypto_data: Array<any> = [];
      let response_from_api_status: number = 0;
      for (let i = 1; i < 11; i++) {
        const response_from_api = await axiosInstances.axiosCommonInstance
          .get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}`
          )
          .then((response) => {
            response_from_api_status = response.status;
            if (response.status === 200) {
              return response.data;
            }
            return null;
          })
          .catch((error) => {
            response_from_api_status = error.request?.status ?? 0;
            console.log(error);
          });

        if (response_from_api && response_from_api_status === 200)
          all_crypto_data.push(...response_from_api);
      }
      localStorage.setItem("crypto_data", JSON.stringify(all_crypto_data));
      utils.set_cookie_by_name("is_crypto_data_refresh", true, 30);
      setController({
        ...controller,
        total_count: all_crypto_data.length ?? 10,
      });
      set_rows(
        all_crypto_data.slice(
          controller.current_page * controller.page_size,
          controller.current_page * controller.page_size + controller.page_size
        )
      );
    } else {
      console.log("STORAGEDAN ÇEKİLDİ");
      const all_crypto_data_from_session_storage = JSON.parse(localStorage.getItem("crypto_data") ?? "");
      setController({
        ...controller,
        total_count: all_crypto_data_from_session_storage.length ?? 10,
      });
      set_rows(
        all_crypto_data_from_session_storage.slice(
          controller.current_page * controller.page_size,
          controller.current_page * controller.page_size + controller.page_size
        )
      );
    }
    dispatch(hide_progress());    
  };

  const handlePageChange = (event: any, newPage: any) => {
    setOpen(false);
    set_current_collapsed_item_id("");
    setController({
      ...controller,
      current_page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setOpen(false);
    set_current_collapsed_item_id("");
    setController({
      ...controller,
      page_size: parseInt(event.target.value, 10),
      current_page: 0,
    });
  };

  return (
    <>
      <p className={styles.Get_All_Cryptos_Error_Message}>{string1}</p>
      <TableContainer component={Paper}>
        <Table stickyHeader size="small"  aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {table_main_headers.map((header, index) => (
                <TableCell
                  sx={{
                    minWidth: header.key == 'total_volume' || header.key == 'market_cap' ? '6.3rem': null,
                    maxWidth: header.id == 1 ? '0.2rem': null,
                }}
                  className={styles.Get_All_Cryptos_Table_Main_Headers}
                  key={header.id}
                  width={header.width}
                  align={header.align}
                >
                  <span className={styles.Get_All_Cryptos_Table_Header_Font_Size} style={{textTransform:'uppercase'}}>{header.value}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Get_All_Cryptos_Table_Row
                current_collapsed_item_id={current_collapsed_item_id}
                set_current_collapsed_item_id={set_current_collapsed_item_id}
                open={open}
                setOpen={setOpen}
                key={row.id}
                row={row}
                row_color={
                  index % 2 == 0 ? "rgba(200, 200, 200, 0.2)" : "white"
                }
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          colSpan={3}
          rowsPerPageOptions={[10, 15, 20, 25]}
          align="right"
          component="div"
          onPageChange={handlePageChange}
          page={controller.current_page}
          count={controller.total_count}
          rowsPerPage={controller.page_size}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
    </>
  );
};
export default Get_All_Cryptos;

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
