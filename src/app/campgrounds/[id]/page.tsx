import styles from "./page.module.css";
import utils from "@/components/utils/utils.module.css";
import ProductGallery from "@/components/utils/productGallery"
import { product } from "../../../../public/data";

const CampgroundsID = () => {
  return (
    <main className={`${styles.main} ${utils.flex}`}>
      <ProductGallery images={product.images} />
      <div className={styles.productDetail}>
      </div>
    </main>
  );
};

export default CampgroundsID;
