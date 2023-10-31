import styles from "../../../styles/page.module.css";
import utils from "@/styles/utils.module.css";
import ProductGallery from "@/components/utils/productGallery";
import { product } from "../../../../public/data";

const CampgroundViewPage = () => {
  
  return (
    <main className={`${styles.main} ${utils.flex}`}>
      <ProductGallery images={product.images} />
      <div className={styles.productDetail}></div>
    </main>
  );
};

export default CampgroundViewPage;
