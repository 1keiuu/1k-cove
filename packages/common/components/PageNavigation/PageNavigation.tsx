"use client";
import { useRouter } from "next/navigation";
import styles from "./PageNavigation.module.css";

type PageNavigationProps = {
  backPath?: string;
};

export const PageNavigation: React.FC<PageNavigationProps> = (props) => {
  const router = useRouter();
  return (
    <nav className={styles["nav"]}>
      <ul className={styles["list"]}>
        <li className={styles["list-item"]}>
          <button
            onClick={() => {
              if (props.backPath) {
                router.push(props.backPath);
                return;
              }
              router.back();
            }}
            className={styles["back-button"]}
          >
            Back
          </button>
        </li>
      </ul>
    </nav>
  );
};
