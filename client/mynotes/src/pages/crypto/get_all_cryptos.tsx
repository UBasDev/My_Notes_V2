import axiosInstances from "@/lib/axios/axiosInstances";
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./get_all_cryptos.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import utils from "@/utils";
import { useDispatch } from "react-redux";
import { hide_progress, show_progress } from "@/redux_stores/progress_state";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import { useRouter } from "next/router";
import Image from "next/image";

const price_formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 7,
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
const compact_formatter = (value:number):string =>{
  let formatted_new_value:string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short"
  }).format(value)
  if(value>=1000 || value<=-1000){
    const last_letter_of_formatted_value = formatted_new_value[formatted_new_value.length-1]
    formatted_new_value = formatted_new_value.substring(0, formatted_new_value.length - 1)
    return formatted_new_value + " " + last_letter_of_formatted_value
  }
  return formatted_new_value
}
const percentage_formatter = (value:number):string=>{
  const percentage_of_value:number = value/100
  const formatted_new_value:string = new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "exceptZero",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(percentage_of_value)
  return formatted_new_value
}  

interface table_headers_props {
  id: number;
  key: string;
  value: string;
  width: string;
  align: any;
}

const string1: string = "Details";
const string2: string =
  "This page is not working properly because of public api limitation which i've used for this screen";

const table_main_headers: ReadonlyArray<table_headers_props> = [
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

const table_sub_headers: ReadonlyArray<table_headers_props> = [
  {
    id: 1,
    key: "market_cap_change_percentage_24h",
    value: "market cap change 24h",
    width: "20%",
    align: "left",
  },
  {
    id: 2,
    key: "ath",
    value: "ath",
    width: "20%",
    align: "left",
  },
  {
    id: 3,
    key: "ath_change_percentage",
    value: "ath change percentage",
    width: "20%",
    align: "left",
  },
  {
    id: 4,
    key: "atl",
    value: "atl",
    width: "18%",
    align: "left",
  },
  {
    id: 5,
    key: "atl_change_percentage",
    value: "ath change percentage",
    width: "22%",
    align: "left",
  },
];

function Row(props: {
  row: any;
  open: boolean;
  setOpen: any;
  current_collapsed_item_id: string;
  set_current_collapsed_item_id: any;
  row_color: string;
}) {
  const {
    row,
    open,
    setOpen,
    current_collapsed_item_id,
    set_current_collapsed_item_id,
    row_color,
  } = props;
  const router = useRouter();
  const on_table_row_click = () => {
    router.push(`get_single_crypto/${row.id}`);
  };
  const on_expand_row_icon_click = (event: any) => {
    event.stopPropagation();
    if (current_collapsed_item_id == row.id) {
      set_current_collapsed_item_id("");
      setOpen(false);
    } else {
      set_current_collapsed_item_id(row.id);
      setOpen(true);
    }
  };  
  
  return (
    <>    
      <TableRow
        onClick={on_table_row_click}
        className={`${styles.Get_All_Cryptos_Table_Rows} ${styles.Get_All_Cryptos_Table_Font_Weight_600} ${styles.Get_All_Cryptos_Table_Row_Font_Size}`}        
        sx={{ "& > *": { borderBottom: "unset" }, backgroundColor: row_color }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={on_expand_row_icon_click}
          >
            {open && current_collapsed_item_id === row.id ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          <Grid container>
            <Grid item xs={9} md={8} lg={7} >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent:'flex-start', gap:'0 0.5rem' }}>
                
                <Image
                  src={row.image}
                  loading="eager"
                  height={25}
                  width={25}
                  alt={row.name}
                  quality={100}
                />
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent:'flex-start', textAlign:'left' }}>
                <p style={{fontWeight:'600'}}>{row.name}</p>
                <span style={{textTransform:'uppercase'}}>{row.symbol}</span>
              </Box>
              </Box>              
            </Grid>            
          </Grid>          
        </TableCell>
        <TableCell align="left">
          <p>{price_formatter.format(row.current_price)}</p>
        </TableCell>
        <TableCell align="left"><p style={{color: row.price_change_percentage_24h>0 ? 'green' : row.price_change_percentage_24h < 0 ? 'red' : 'blue'}}>{percentage_formatter(row.price_change_percentage_24h)}</p></TableCell>
        <TableCell align="left"><p>{compact_formatter(row.total_volume)}</p></TableCell>
        <TableCell align="left"><p>{compact_formatter(row.market_cap)}</p></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open && current_collapsed_item_id === row.id}
            timeout={300}
            unmountOnExit
          >
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h6"
                gutterBottom
                component="div"
              >
                {string1}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {table_sub_headers.map((header, index) => (
                      <TableCell
                        sx={{
                          minWidth: header.key == 'market_cap_change_percentage_24h' ? '7rem' : null
                        }}
                        className={
                          `${styles.Get_All_Cryptos_Table_Sub_Headers}` +
                          " " +
                          `${
                            index == 0
                              ? styles.Get_All_Cryptos_Table_Border_Radius_Style1
                              : index === table_sub_headers.length - 1
                              ? styles.Get_All_Cryptos_Table_Border_Radius_Style2
                              : null
                          }`
                        }
                        width={header.width}
                        align={header.align}
                        key={header.id}
                      >
                        <span className={styles.Get_All_Cryptos_Table_Header_Font_Size} style={{textTransform:'uppercase'}}>{header.value}</span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={`${styles.Get_All_Cryptos_Table_Font_Weight_600} ${styles.Get_All_Cryptos_Table_Row_Font_Size}`}>
                    <TableCell  align="left" component="th" scope="row">
                    <p style={{color: row.market_cap_change_percentage_24h>0 ? 'green' : row.market_cap_change_percentage_24h<0 ? 'red' : 'blue'}}>{percentage_formatter(row.market_cap_change_percentage_24h)}</p>                      
                    </TableCell>
                    <TableCell align="left"><p>{row.ath}</p></TableCell>
                    <TableCell align="left">
                    <p style={{color: row.ath_change_percentage>0 ? 'green' : row.ath_change_percentage<0 ? 'red' : 'blue'}}>{percentage_formatter(row.ath_change_percentage)}</p>
                    </TableCell>
                    <TableCell align="left"><p>{row.atl}</p></TableCell>
                    <TableCell align="left">
                    <p style={{color: row.atl_change_percentage>0 ? 'green' : row.atl_change_percentage<0 ? 'red' : 'blue'}}>{percentage_formatter(row.atl_change_percentage)}</p>                      
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

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
      <p className={styles.Get_All_Cryptos_Error_Message}>{string2}</p>
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
              <Row
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
