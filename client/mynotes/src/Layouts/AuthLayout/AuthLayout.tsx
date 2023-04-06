import styles from "./AuthLayout.module.css"

export default function AuthLayout({ children }:any) {
    return (
      <div className={styles.AuthLayoutWrapper}>        
        <main className={styles.AuthLayoutMainBox}>{children}</main>        
      </div>
    );
  }