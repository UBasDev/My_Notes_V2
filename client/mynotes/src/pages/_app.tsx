import CommonLayout from '@/Layouts/CommonLayout'
import Providers from '@/providers/Providers'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {  
  const renderWithLayout =
    Component.getLayout ||
    function (page:any) {
      return <CommonLayout>{page}</CommonLayout>;
    };
  return <Providers session={session}
  refetchInterval={30} //Sessionu her 30 saniyede bir refetch edecektir, böylece sessionın stateini her 30 saniyede bir güncelleriz. Burasının valuesi her zaman Sessionın `maxAge` propertysinden daha KUCUK olmalıdır
  refetchOnWindowFocus={true} //Window focus olduğunda sessionı refetch edecektir; böylece sessionın stateini her window veya tab değişiminde bir günncelleriz
>
{renderWithLayout(<Component {...pageProps} />)}
</Providers>
}
