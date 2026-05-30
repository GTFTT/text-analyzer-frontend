import styles from "./BorderedSection.module.css"

export interface BorderedSectionPropsI {
  title?: string
  children?: React.ReactNode
  className?: string
}

export function BorderedSection({title, children, className}: BorderedSectionPropsI) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <div className={`${styles.content} ${className? className: ""}`}>
        {children}
      </div>
    </div>
  );
}