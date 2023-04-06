import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axiosInstances from "../axios/axiosInstances";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
    const session: any = useSession();
    const refreshToken = useRefreshToken();
    useEffect(() => {
      const requestInterceptor =
        axiosInstances.axiosAuthInstance.interceptors.request.use(
          (config) => {
            if (!config.headers["Authorization"]) {
                //Eğer servera attığımız requestin headerında `Authorization` yani token yoksa, userın mevcut sessionında tutulan AccessTokenı alarak otomatik olarak yerleştirecektir
              config.headers["Authorization"] = `Bearer ${session?.data?.user?.accessToken}`;
            }
            return config;
          },
          (error) => Promise.reject(error)
        );
      const responseInterceptor =
        axiosInstances.axiosAuthInstance.interceptors.response.use(
          (response) => {
            return response;
          },
          async (error) => { //Eğer servera gönderdiğimiz requestte herhangi bir error alınırsa burası çalışır
            const previousRequest = error.config; //Bir önceki reqeusti döndürür[serverdan response olarak error dönmesine sebep olan requesti]
            if (error.response.status === 403 && !previousRequest.sent) {
                //Eğer serverdan response status 403 dönmüşse[yani userın accessTokenı expire oldu ve serverdan ilk defa expired için 403 responseu aldı ise]
              previousRequest.sent = true;
              await refreshToken(); 
                //Burada serverdaki refresh endpointine request atacak ve eğer mevcut `refreshToken` expired DEGILSE; clienttaki hem AccessTokenı hem RefreshTokenı yenileyecek; eğer `refreshToken` expired olmuşsa da Userı SignOut edecek
              previousRequest.headers["Authorization"] = `Bearer ${session?.data?.user?.accessToken}`;
                //Clientta yenilenen `accessTokenı` çektik ve 403 aldığımız bir önceki requestin headerına yerleştirdik
              return axiosInstances.axiosAuthInstance(previousRequest); //Bir önceki requestin headerına yeni AccessTokenı yerleştirdikten sonra önceki requesti yeniden servera gönderdik
            }
            return Promise.reject(error);
          }
        );
      return () => { //Memory allocation için interceptorlar kullanıldıktan sonra `eject` edilir
        axiosInstances.axiosAuthInstance.interceptors.request.eject(
          requestInterceptor
        );
        axiosInstances.axiosAuthInstance.interceptors.response.eject(
          responseInterceptor
        );
      };
    }, [session]);
    return axiosInstances.axiosAuthInstance;
  };
  export default useAxiosAuth;