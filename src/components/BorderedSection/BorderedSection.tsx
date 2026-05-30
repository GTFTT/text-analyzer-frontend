import styles from "./BorderedSection.module.css"

export interface BorderedSectionPropsI {
  title?: string
  children?: React.ReactNode
  className?: string
}

export function BorderedSection({title, children, className}: BorderedSectionPropsI) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={`${styles.content} ${className? className: ""}`}>
        {children}
      </div>
    </div>
  );
}