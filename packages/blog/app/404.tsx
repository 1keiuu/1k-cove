import { PageNavigation } from "@1k-cove/common";
import styles from "./404.module.scss";

export const metadata = {
  title: "404 - Page Not Found",
  viewport: "width=device-width,initial-scale=1.0",
  description: "404 - Page Not Found",
};

const Custom404 = () => {
  return (
    <>
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
