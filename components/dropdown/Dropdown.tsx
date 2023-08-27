import React, { ReactNode, useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
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
  const [suggestions, setSuggestions] = useState<string[]>(dropdownData);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>(dropdownValue);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [showButton, setShowButton] = useState<boolean>(false);
  // add useEffect to avoid preserving state between rerenders
  useEffect(() => {
    setValue(dropdownValue);
    if (value) {
      setShowButton(true)
    }   
  }, [dropdownValue, showButton]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 0) {
      const filterSuggestions = dropdownData.filter(
        (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setIsShow(true);
      setShowButton(true);
    } else {
      setIsShow(false);
      setShowButton(false);
    }
  };

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSuggestions([]);
    setValue(e.target.innerText);
    // return selected value to parent component
    setDropdownValue(e.target.innerText);
    setIsShow(false);
  };

  const handleKeyDown = (e: KeyboardEvent&ChangeEvent<HTMLInputElement>) => {
    // UP ARROW
    if (e.code === "ArrowUp") {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.code === "ArrowDown") {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.code === "Enter") { 
      e.preventDefault(); 
      setValue(suggestions[suggestionIndex]);
      setDropdownValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setIsShow(false);
    }
  };

  return (
    <form className={styles.dropdownContainer}>
      <input
        {...props}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        list="data"
        type="text"
        className={styles.input}
        placeholder="Search for a city"
        maxLength={30}
      />
      {showButton && (
        <button
          type="submit"
          onClick={clearAllFilters}
          className={styles.cancelBtn}
        >
          <img src="/cancel-btn.svg" />
        </button>
      )}

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
