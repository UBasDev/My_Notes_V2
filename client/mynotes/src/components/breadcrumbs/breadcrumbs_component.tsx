import {  Breadcrumbs, Typography } from "@mui/material"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useRouter } from "next/router";
import Link from "next/link";

interface Breadcrumb_component_type{
    //children:any;
    breadcrumb_name:string;
}

const Breadcrumbs_Component = (props:Breadcrumb_component_type):JSX.Element=>{
    const router = useRouter()
    let current_link:string = ""
    const crumb_elements = router.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {
        current_link += `/${crumb}`
        return (            
                <div className="crumb" key={crumb}>
                    <Link key={crumb} href={{
                    pathname: current_link,
                    href: current_link
                }}>
                    {crumb}
                </Link>            
                </div>

        )
    })
    return (
        <>
        <Breadcrumbs separator="›" aria-label="breadcrumb" maxItems={3}>

  {/* <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
    <FormatListNumberedIcon sx={{ mr: 0.5 }} fontSize="inherit"/>
  All Prices
  </Link>  
  <Typography  sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
  <CurrencyExchangeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    <span style={{textTransform:'capitalize'}}>{props.breadcrumb_name} Price</span></Typography> */}
</Breadcrumbs>
<div className="breadcrumbs">
    {crumb_elements}
</div>
        <p>Breadcrumb works!</p>
        </>
    )
}
export default Breadcrumbs_Component