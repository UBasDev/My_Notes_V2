import { NextPage } from "next";

type Component_with_layout_type = {
    getLayout: (page:any)=>JSX.Element
}
export type Component_page_with_layout_type = Component_with_layout_type & NextPage

export interface SignInFormItems {
    email: string;
    password: string;
}

export interface Get_all_cryptos_table_headers_props {
    id: number;
    key: string;
    value: string;
    width: string;
    align: any;
  }