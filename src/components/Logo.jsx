import styles from "./Header.module.css";
function Logo() {
  return (
    <h1 className={styles.heading}>
      Expense
      <span className={styles.headingconti}>Mate</span>
    </h1>
  );
}

export default Logo;
