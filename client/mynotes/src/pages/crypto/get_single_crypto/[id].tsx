import { Breadcrumbs, Link, Typography, styled, emphasize } from "@mui/material";
import { useRouter } from "next/router";

import Chip from '@mui/material/Chip';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  }) as typeof Chip;

const Get_Single_Crypto = (props: any) => {
    const router = useRouter()    
  return (
    <>        
      <p>Get Single Crypto works!</p>
      <p>Currency: {router.query?.id ?? ""}</p>
    </>
  );
};
export default Get_Single_Crypto;
