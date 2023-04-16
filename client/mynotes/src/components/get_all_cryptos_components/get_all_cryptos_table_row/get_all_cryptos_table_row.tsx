import { Box, Collapse, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { NextPage } from "next"
import Image from "next/image";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from './get_all_cryptos_table_row.module.css'
import { Get_all_cryptos_table_headers_props } from "@/interfaces";


  const table_sub_headers: ReadonlyArray<Get_all_cryptos_table_headers_props> = [
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

  const string1: string = "Details";

const Get_All_Cryptos_Table_Row = (props: {
    row: any;
    open: boolean;
    setOpen: any;
    current_collapsed_item_id: string;
    set_current_collapsed_item_id: any;
    row_color: string;
  }):JSX.Element=>{
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
            className={`${styles.Get_All_Cryptos_Table_Row_Rows} ${styles.Get_All_Cryptos_Table_Row_Font_Weight_600} ${styles.Get_All_Cryptos_Table_Row_Row_Font_Size}`}        
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
                              `${styles.Get_All_Cryptos_Table_Row_Sub_Headers}` +
                              " " +
                              `${
                                index == 0
                                  ? styles.Get_All_Cryptos_Table_Row_Border_Radius_Style1
                                  : index === table_sub_headers.length - 1
                                  ? styles.Get_All_Cryptos_Table_Row_Border_Radius_Style2
                                  : null
                              }`
                            }
                            width={header.width}
                            align={header.align}
                            key={header.id}
                          >
                            <span className={styles.Get_All_Cryptos_Table_Row_Header_Font_Size} style={{textTransform:'uppercase'}}>{header.value}</span>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className={`${styles.Get_All_Cryptos_Table_Row_Font_Weight_600} ${styles.Get_All_Cryptos_Table_Row_Row_Font_Size}`}>
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
export default Get_All_Cryptos_Table_Row