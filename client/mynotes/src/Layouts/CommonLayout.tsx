import Header from "@/components/header/header";
import Link from "next/link";

export default function CommonLayout({ children }:any) {
    return (
      <>
        <Header>
        <main>{children}</main>
        </Header>
        <br/>        
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Link href={"/"}>Go Homepage</Link>
        <Link as={"/crypto/get_all_cryptos"} href={{        
        pathname:'/crypto/get_all_cryptos',
        href: '/crypto/get_all_cryptos',
        query: {
          'key1':'value1'
        },        
      }} >Go to Currencies</Link>        
        <footer>&copy; CommonLayout Footer</footer>
      </>
    );
  }