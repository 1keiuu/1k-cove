import { PageNavigation } from "@1k-cove/common";
import DefaultHead from "./_components/meta/DefaultHead";
import styles from "./404.module.scss";

const Custom404 = () => {
  return (
    <>
      <DefaultHead meta={{}}></DefaultHead>
      <div className={styles["container"]}>
        <PageNavigation backPath="/"></PageNavigation>
        <div className={styles["inner"]}>
          <h3>404 - Page Not Found</h3>
        </div>
      </div>
    </>
  );
};

export default Custom404;
