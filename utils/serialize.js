import Button from "@/components/Button/Button";
import React from "react";

export function Pagination({
  totalCards,
  cardsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPageCount = Math.ceil(totalCards / cardsPerPage);
  const pageButtonsToShow = 5;
  const middleButton = Math.ceil(pageButtonsToShow / 2);

  const generatePageRange = () => {
    const pages = [];

    const groupSize = 5;
    const totalPages = Math.ceil(totalPageCount / groupSize);

    let groupStart = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
    let groupEnd = Math.min(groupStart + groupSize - 1, totalPageCount);

    for (let page = groupStart; page <= groupEnd; page++) {
      pages.push(page);
    }

    return pages;
  };

  const clicked = (page) => {
    setCurrentPage(page);
  };

  const previousGroup = () => {
    if (currentPage > 5) {
      setCurrentPage(currentPage - pageButtonsToShow);
    }
  };

  const nextGroup = () => {
    if (currentPage < totalPageCount) {
      const setPage = pages[4] + 1;
      setCurrentPage(setPage);
    }
  };

  const pages = generatePageRange();
  console.log(
    "pagination: current page",
    "current page:",
    currentPage,
    "pages:",
    pages
  );

  return (
    <div className="pagination">
      {currentPage > 5 && (
        <Button variant="paginationArrow" onClick={previousGroup}>
          Back
        </Button>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => clicked(page)}
          variant={
            currentPage == page ? "selectedPaginationButton" : "pagination"
          }
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPageCount && (
        <Button variant="paginationArrow" onClick={nextGroup}>
          Next
        </Button>
      )}
    </div>
  );
}

// Original pagination, for reference
//import styles from "@/styles/Home.module.css";

// export function Pagination({
//   totalCards,
//   cardsPerPage,
//   currentPage,
//   setCurrentPage,
// }) {
//   let pages = [];

//   const totalCardsInHistory = totalCards - 1;

//   for (let i = 1; i <= Math.ceil(totalCardsInHistory / cardsPerPage); i++) {
//     pages.push(i);
//   }
//   const clicked = (page) => {
//     setCurrentPage(page);
//   };
//   return (
//     <div className={styles.button}>
//       {pages.map((page, index) => {
//         return (
//           <button
//             className={`${
//               currentPage === page ? styles.buttonActive : styles.buttonInner
//             } `}
//             key={index}
//             // onClick={() => setCurrentPage(page)}
//             onClick={() => clicked(page)}
//           >
//             {page}
//           </button>
//         );
//       })}
//     </div>
//   );
// }
