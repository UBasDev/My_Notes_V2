import axiosInstances from "@/lib/axios/axiosInstances"
import { Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material"
import { NextPage } from "next"
import { useEffect, useState } from "react"

const Get_All_Cryptos:NextPage = ():JSX.Element=>{
    const [refreshCryptoDataDependency, setRefreshCryptoDataDependency] = useState([])
    const [initialCryptoDataRequestParameters, setInitialCryptoDataRequestParameters] = useState({
        currency: "usd",
        order: "market_cap_desc",
        page_size: 100,
        current_page: 1,
        locale:'en',
        price_change_percentage:'1h'
    }) 
    const [passengersList, setPassengersList] = useState([]);
    const [passengersCount, setPassengersCount] = useState(0);
    const [controller, setController] = useState({
      page: 0,
      rowsPerPage: 10
    });
    useEffect(()=>{
        getAllCryptoData()
    },[controller])

    const getAllCryptoData = async ()=>{
        try{
          const parameters = initialCryptoDataRequestParameters
        const responseFromApi = await axiosInstances.axiosCommonInstance(`/api/Crypto/get_all_cryptos?currency=${parameters.currency}&order=${parameters.order}&page_size=${controller.rowsPerPage}&current_page=${controller.page+1}&locale=${parameters.locale}&price_change_percentage=${parameters.price_change_percentage}`)        
        setPassengersList(responseFromApi.data)
        setPassengersCount(10900)
        }catch(error:any){          
          throw new Error(`${error.message ?? ""} - ${error.name ?? ""} - ${error.code ?? ""}`)
        }
    }
    const handlePageChange = (event:any, newPage:any) => {
        setController({
          ...controller,
          page: newPage
        });
      };
  const handleChangeRowsPerPage = (event:any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };
    return (
        <>
        <h1>Cryptos works!</h1>
        <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Trips
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengersList.map((passenger:any, index) => (
            <TableRow key={index}>
              <TableCell>
                {passenger.name}
              </TableCell>
              <TableCell>
                {passenger.current_price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={controller.page}
        count={passengersCount}
        rowsPerPage={controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
        </>
    )
}
export default Get_All_Cryptos