import { type } from "os";
import styles from "./Toggle.module.css";

type ToggleProps = {
  showMap: boolean;
  setShowMap: Function;
};

const Toggle: React.FC<ToggleProps> = ({ showMap, setShowMap }) => {
  console.log("showMap", showMap);
  return (
    <div className={styles.toggleContainer}>
      <label className={styles.toggleLabel}>
        <input
          value="List"
          name="mode"
          type="radio"
          className={styles.toggleInput}
          checked
          // onChange={() => {
          //   setShowMap(false);
          // }}

          // disabled={showMap!== null}
        />
        <span
          className={styles.toggleText}
          onClick={() => {
            setShowMap(false);
          }}
        >
          List
        </span>
      </label>
      <label className={styles.toggleLabel}>
        <input
          placeholder="test 2"
          value="Map"
          name="mode"
          type="radio"
          className={styles.toggleInput}
          // onChange={() => {
          //   setShowMap(true);
          // }}
          // checked
          // disabled={showMap!== null}
        />
        <span
          className={styles.toggleText}
          onClick={() => {
            setShowMap(true);
          }}
        >
          Map
        </span>
      </label>
    </div>
  );
};

export default Toggle;
