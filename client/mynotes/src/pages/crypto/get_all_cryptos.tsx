import axiosInstances from "@/lib/axios/axiosInstances";
import {
  Box,  
  Collapse,  
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import utils from "@/utils";
import { useDispatch } from "react-redux";
import { hide_progress, show_progress } from "@/redux_stores/progress_state";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import { useRouter } from "next/router";

interface table_headers_props {
  id:number;
  key:string;
  value:string;
  width:string;
  align:any;
}

const string1:string = "Details"
const string2:string = "This page is not working properly because of public api limitation which i've used for this screen";

const table_main_headers:ReadonlyArray<table_headers_props> = [
  {
    id:1,
    key:'icon',
    value:'',
    width:'5%',
    align:'center'
  },
  {
    id:2,
    key:'name',
    value:'name',
    width:'19%',
    align:'center'
  },
  {
    id:3,
    key:'price',
    value:'price',
    width:'19%',
    align:'center'
  },
  {
    id:4,
    key:'change_24h',
    value:'change 24h',
    width:'19%',
    align:'center'
  },
  {
    id:5,
    key:'total_volume',
    value:'total volume',
    width:'19%',
    align:'center'
  },
  {
    id:6,
    key:'market_cap',
    value:'market cap',
    width:'19%',
    align:'center'
  }
]

const table_sub_headers:ReadonlyArray<table_headers_props> = [
  {
    id:1,
    key: 'market_cap_change_percentage_24h',
    value: 'market cap change percentage 24h',
    width:'20%',
    align:'center'
  },
  {
    id:2,
    key: 'ath',
    value: 'ath',
    width:'20%',
    align:'center'
  },
  {
    id:3,
    key: 'ath_change_percentage',
    value: 'ath change percentage',
    width:'20%',
    align:'center'
  },
  {
    id:4,
    key: 'atl',
    value: 'atl',
    width:'20%',
    align:'center'
  },
  {
    id:5,
    key: 'atl_change_percentage',
    value: 'ath change percentage',
    width:'20%',
    align:'center'
  }
]

function Row(props: { row: any, open:boolean, setOpen:any, current_collapsed_item_id:string, set_current_collapsed_item_id:any, row_color:string }) {
  const { row, open, setOpen, current_collapsed_item_id, set_current_collapsed_item_id, row_color} = props;
  const router = useRouter()
  const on_table_row_click = ()=>{
    router.push(`get_single_crypto/${row.id}`)
  }
  const on_expand_row_icon_click = (event:any)=>{
    event.stopPropagation()
    if(current_collapsed_item_id == row.id){
      set_current_collapsed_item_id("")
      setOpen(false)  
    }
    else{
    set_current_collapsed_item_id(row.id)
    setOpen(true)
    }              
  }
  return (
    <>
      <TableRow onClick={on_table_row_click} className={styles.Get_All_Cryptos_Table_Rows} sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor:row_color }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={on_expand_row_icon_click}
          >
            {open && current_collapsed_item_id===row.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.current_price}</TableCell>
        <TableCell align="center">{row.price_change_percentage_24h}</TableCell>
        <TableCell align="center">{row.total_volume}</TableCell>
        <TableCell align="center">{row.market_cap}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open && current_collapsed_item_id===row.id} timeout={300} unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{textAlign:'center'}} variant="h6" gutterBottom component="div">
                {string1}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {table_sub_headers.map((header, index)=>(
                      <TableCell className={`${styles.Get_All_Cryptos_Table_Sub_Headers}` + " " + `${index == 0 ? styles.Get_All_Cryptos_Table_Border_Radius_Style1 : index === table_sub_headers.length-1 ? styles.Get_All_Cryptos_Table_Border_Radius_Style2 : null}`} width={header.width} align={header.align} key={header.id}>{header.value}</TableCell>
                    ))}                    
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                      <TableCell align="center" component="th" scope="row">
                        {row.market_cap_change_percentage_24h}
                      </TableCell>
                      <TableCell align="center">{row.ath}</TableCell>
                      <TableCell align="center">{row.ath_change_percentage}</TableCell>
                      <TableCell align="center">
                        {row.atl}
                      </TableCell>
                      <TableCell align="center">
                        {row.atl_change_percentage}
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
  const dispatch = useDispatch()
  const [rows, set_rows] = useState<ReadonlyArray<any>>([])  
  const [open, setOpen] = useState<boolean>(false);
  const [current_collapsed_item_id, set_current_collapsed_item_id] = useState<string>("")  
  const [controller, setController] = useState({
    current_page: 0,
    page_size: 10,
    total_count:10
  });
  useEffect(() => {
    getAllCryptoData();        
  }, [JSON.stringify(controller.current_page), JSON.stringify(controller.page_size)]);

  const getAllCryptoData = async () => {
    dispatch(show_progress())
    const is_crypto_data_exists_in_session_storage = localStorage.getItem("crypto_data")
      const is_crypto_data_refresh = utils.get_cookie_by_name("is_crypto_data_refresh")
      if(!is_crypto_data_exists_in_session_storage || !is_crypto_data_refresh){
        console.log('APIDEN ÇEKİLDİ')
        let all_crypto_data: Array<any> = []
        let response_from_api_status: number = 0;
        for (let i = 1; i < 11; i++) {
          const response_from_api = await axiosInstances.axiosCommonInstance.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}`).then((response)=>{
            response_from_api_status = response.status
            if(response.status === 200){
              return response.data
            }            
            return null
          }).catch(error=>{
            response_from_api_status = error.request?.status ?? 0
            console.log(error)
          })
          
          if(response_from_api && response_from_api_status===200) all_crypto_data.push(...response_from_api)
        }
        localStorage.setItem("crypto_data", JSON.stringify(all_crypto_data))
        utils.set_cookie_by_name("is_crypto_data_refresh", true, 30)
        setController({
          ...controller,
          total_count: all_crypto_data.length ?? 10
        })
        set_rows(
          (all_crypto_data).slice(
            controller.current_page * controller.page_size,
            controller.current_page * controller.page_size + controller.page_size
          )
        );      
      }
      else{
        console.log('STORAGEDAN ÇEKİLDİ')
        const all_crypto_data_from_session_storage = JSON.parse(is_crypto_data_exists_in_session_storage!)
        setController({
          ...controller,
          total_count: all_crypto_data_from_session_storage.length ?? 10
        })
        set_rows(
          (all_crypto_data_from_session_storage).slice(
            controller.current_page * controller.page_size,
            controller.current_page * controller.page_size + controller.page_size
          )
        );      
      }     
      dispatch(hide_progress())
  };
  
  const handlePageChange = (event:any, newPage:any) => {
    setOpen(false)
    set_current_collapsed_item_id("")
    setController({
      ...controller,
      current_page: newPage
    });
  };

  const handleChangeRowsPerPage = (event:any) => {
    setOpen(false)
    set_current_collapsed_item_id("")
    setController({
      ...controller,
      page_size: parseInt(event.target.value, 10),
      current_page: 0
    });
  };


  return (
    <>
      <p className={styles.Get_All_Cryptos_Error_Message}>
        {string2}
      </p>
      <TableContainer component={Paper}>
      <Table stickyHeader size="small" aria-label="collapsible table">
        <TableHead >
          <TableRow>
            {table_main_headers.map((header, index)=>(
              <TableCell className={styles.Get_All_Cryptos_Table_Main_Headers} key={header.id} width={header.width} align={header.align}>{header.value}</TableCell>
            ))}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row current_collapsed_item_id={current_collapsed_item_id} set_current_collapsed_item_id={set_current_collapsed_item_id} open={open} setOpen={setOpen} key={row.id} row={row} row_color={index%2==0 ? 'rgba(200, 200, 200, 0.2)' : 'white'} />
          ))}
        </TableBody>
      </Table>      
      <TablePagination
      colSpan={3}
      rowsPerPageOptions={[10, 15, 20, 25]}      
      align="right" component="div"
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
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}