import axiosInstances from '@/lib/axios/axiosInstances'
import { Grid } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import cryptodata from '../../crypto.json'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [location_info, set_location_info] = useState<any>()
  useEffect(()=>{
    retrieve_location_data()
    console.log(cryptodata)
  },[])
  const retrieve_location_data = async ()=>{
    try{
      const location_info_from_session_storage = window.sessionStorage.getItem('location_info')
    if(!location_info_from_session_storage){
      console.log('APIDEN ÇEKTİM')      
      const response = await axiosInstances.axiosCommonInstance.get('http://ip-api.com/json/').then((response)=>response.data)
      debugger
      set_location_info(response)
      debugger
      window.sessionStorage.setItem('location_info', JSON.stringify(response))
      debugger
    }
    else{
      console.log('STORAGEDAN ÇEKTİM')
      set_location_info(JSON.parse(location_info_from_session_storage))
    }
    }catch(error){
      console.log(error)
    }
  }
  console.log(location_info)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>              
        {/* <button onClick={()=>dispatch(show_snackbar("content1"))}>CHANGE SNACKBAR STATE</button>
        <button onClick={()=>console.log('Snackbar content', snackbar_content)}>SNACKBAR STATE</button>                 */}        
        <Grid container>
          <Grid item>
          </Grid>
        </Grid>
    </>
  )
}
