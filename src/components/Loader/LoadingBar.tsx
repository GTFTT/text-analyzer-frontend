import styles from "./LoadingBar.module.css"

export interface LoaderPropsI {
  percentage?: number;
}

export function LoadingBar({ percentage }: LoaderPropsI) {
  let currPercentage = percentage ?? 0;
  if (currPercentage < 0) currPercentage = 0;
  if (currPercentage > 100) currPercentage = 100;

  return (
    <div className={styles.container}>
      <div className={styles.loadingBar} style={{
        width: `${currPercentage}%`
      }}/>
      <div className={styles.percentageLabel}>{currPercentage}%</div>
    </div>
  );
}