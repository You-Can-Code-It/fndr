import styles from "./Toggle.module.css"

const Toggle = () => {
  return (
    <div className={styles.toggleContainer}>
        <label className={styles.toggleLabel}>
            <input className={styles.toggleInput} />
            <span className={styles.toggleText}>Map</span>
        </label>
    </div>
  )
}

export default Toggle;
