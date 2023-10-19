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

  // const generatePageRange = () => {
  //   let start = Math.max(1, currentPage - middleButton + 1);
  //   let end = Math.min(totalPageCount, start + pageButtonsToShow - 1);

  //   // Adjust start when reaching the end
  //   if (end === totalPageCount) {
  //     start = Math.max(1, end - pageButtonsToShow + 1);
  //   }

  //   return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  // };
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
    if (currentPage > 1) {
      setCurrentPage(currentPage - pageButtonsToShow);
    }
  };

  const nextGroup = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + pageButtonsToShow);
    }
  };

  const pages = generatePageRange();

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Button variant="paginationArrow" onClick={previousGroup}>
          Back
        </Button>
      )}

      {pages.map((page) => (
        <Button
          variant="pagination"
          key={page}
          className={`pagination-Button ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => clicked(page)}
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
