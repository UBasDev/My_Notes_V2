import { Authenticated_Routes } from "@/interfaces/auth";
import { Header_Nav_Items } from "@/interfaces/header";

const login_message_local_storage_key:string = "login_message"

const email_regexp:RegExp = new RegExp(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i, 'gi');
const password_regexp: RegExp = new RegExp(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/, 'gi')

const authenticated_routes:ReadonlyArray<Authenticated_Routes> = [
    {
      path:"crypto",
      role: "user"
    },
    {
      path:'direct_message',
      role:"user"
    }
  ];

  const unauthenticated_nav_items:ReadonlyArray<Header_Nav_Items> = [
    {
        id:1,
        key:"Home",
        value:"Home",
        pathname:"/",
        pathname_as:"/",
    },
    {
        id:2,
        key:"About",
        value:"About",
        pathname:"/",
        pathname_as:"/",
    }
];
const authenticated_nav_items: ReadonlyArray<Header_Nav_Items> = [
  {
    id:1,
    key:"Home",
    value:"Home",
    pathname:"/",
    pathname_as:"/",
  },{
    id:2,
    key:"About",
    value:"About",
    pathname:"/",
    pathname_as:"/",
  },
  {
    id:3,
    key:"Crypto",
    value:"Crypto",
    pathname:"/crypto/get_all_cryptos",
    pathname_as:"/crypto/get_all_cryptos",
  },
  {
    id:4,
    key:"Messages",
    value:"Messages",
    pathname:"/direct_message",
    pathname_as:"/direct_message",
  }
]

const constants = {
    login_message_local_storage_key,
    email_regexp,
    password_regexp,
    authenticated_routes,
    unauthenticated_nav_items,
    authenticated_nav_items
}
export default constants