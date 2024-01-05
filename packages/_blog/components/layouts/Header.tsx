import Link from "next/link";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const items = [
    {
      name: "home",
      text: "Home",
    },
    {
      name: "portfolio",
      text: "Portfolio",
    },
    {
      name: "github",
      text: "",
    },
  ];
  return (
    <header className={styles.header}>
      <ul className={styles["anchor-list"]}>
        {items.map((item, i) => {
          if (item.name === "portfolio") {
            return (
              <li key={`item-${i}`} className={styles["anchor-list-item"]}>
                <Link
                  href="https://1keiuu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.anchor}
                >
                  <p className={styles.text}>{item.text}</p>
                </Link>
              </li>
            );
          }
          if (item.name === "github") {
            return (
              <div
                className={styles["outer-link-list-item-icon"]}
                key={`item-${i}`}
              >
                <Link
                  className={styles["icon-anchor"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/1keiuu"
                >
                  <img
                    className={styles.image}
                    src="/icons/github.png"
                    width={24}
                    height={24}
                    alt="github icon"
                  ></img>
                </Link>
              </div>
            );
          }
          return (
            <li key={`item-${i}`} className={styles["anchor-list-item"]}>
              <Link href="/" className={styles.anchor}>
                <p className={styles.text}>{item.text}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
export default Header;
