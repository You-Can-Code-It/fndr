import React, { ReactNode, useEffect, useState } from "react";
import styles from "./Dropdown.module.css";

type DropdownProps = {
  className?: string;
  children?: ReactNode;
  dropdownData: string[];
  setDropdownValue: Function;
  dropdownValue: string;
  clearAllFilters: Function;
};

const Dropdown: React.FC<DropdownProps> = ({
  dropdownData,
  children,
  setDropdownValue,
  dropdownValue,
  clearAllFilters,
  ...props
}) => {
  // console.log("dropdownData", dropdownData);
  const [suggestions, setSuggestions] = useState<string[]>(dropdownData);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>(dropdownValue);
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  // add useEffect to avoid preserving state between rerenders
  useEffect(() => {
    setValue(dropdownValue);
  }, [dropdownValue]);

  console.log("dropdownValue", dropdownValue);
  console.log("value", value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    console.log("query", query);
    if (query.length > 1) {
      const filterSuggestions = dropdownData.filter(
        (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    // return selected value to parent component
    setDropdownValue(e.target.innerText);
    setIsShow(false);
    // console.log("hey", e.target.innerText);
  };

  // console.log("suggestions", suggestions);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // UP ARROW
    if (e.key === "ArrowUp") {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.key === "ArrowDown") {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.key === "Enter") {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setIsShow(false);
      setDropdownValue(suggestions[suggestionIndex]);
    }
  };

  return (
    <form className="dropdownContainer">
      <input
        {...props}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        list="data"
        type="text"
        className={styles.input}
        placeholder="Search for a city"
      />
      <button
        type="submit"
        onClick={clearAllFilters}
        className={styles.cancelBtn}
      >
        <img src="/cancel-btn.svg" />
      </button>

      {isShow && (
        <div className={styles.citiesContainer}>
          <ul className={styles.listOfCitiesContainer}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={
                  index === suggestionIndex
                    ? styles.active
                    : styles.listOfCities
                }
                onClick={handleClick}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default Dropdown;
