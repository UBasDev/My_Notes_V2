import { signOut, useSession } from "next-auth/react";
import axiosInstances from "../axios/axiosInstances";

export const useRefreshToken = () => {
    const session: any = useSession();
    const refreshToken = async () => {
      const res: any = await axiosInstances.axiosCommonInstance
        .post("/auth/refreshToken", {
            //Burada yeni AccessToken alabilmek için serverdaki endpointe request atarız. Burada SADECE AccessToken alıp mevcut sessiondakini yenileriz; yeni RefreshToken ALMAYIZ!
          refreshToken: session?.data?.user?.refreshToken,
            //Kullanıcının sessionında bulunan `refreshToken`ı, serverın kullanabilmesi için göndeririz
        })
        .catch((error) => {
          console.log(error);
          if (error.response?.status == 401) {
            signOut();
          }
        });
      if (session)
        session.data.user.accessToken = res.data.newGeneratedAccessToken;
          //Eğer mevcut RefreshToken expired olmamışsa ve servera RefreshTokenı gönderdikten sonra bize yeni bir AccessTokenı ilettiyse, bizim sessiondaki eski AccessTokenla serverdan gelen yeniyi değiştiririz
    };
    return refreshToken;
  };