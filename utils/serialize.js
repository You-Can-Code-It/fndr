import styles from "@/styles/Home.module.css";

export function Pagination({
  totalCards,
  cardsPerPage,
  currentPage,
  setCurrentPage,
}) {
  let pages = [];

  const totalCardsInHistory = totalCards - 1;

  for (let i = 1; i <= Math.ceil(totalCardsInHistory / cardsPerPage); i++) {
    pages.push(i);
  }
  const clicked = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className={styles.button}>
      {pages.map((page, index) => {
        return (
          <button
            className={`${
              currentPage === page ? styles.buttonActive : styles.buttonInner
            } `}
            key={index}
            // onClick={() => setCurrentPage(page)}
            onClick={() => clicked(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
