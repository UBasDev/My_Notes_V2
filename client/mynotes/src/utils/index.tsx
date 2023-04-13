const get_cookie_by_name:any = (cookie_name: string)=>{
    return document.cookie.match(`(^|;)\\s*` + `${cookie_name}` + `\\s*=\\s*([^;]+)`)?.pop() || ""
}
const set_cookie_by_name:any = (name:string,value:string,minutes:number) =>{
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
const utils = {
    get_cookie_by_name,
    set_cookie_by_name,
}
export default utils