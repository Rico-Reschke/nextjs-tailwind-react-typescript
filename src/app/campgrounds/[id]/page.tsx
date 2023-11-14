import ProductGallery from "@/components/utils/productGallery";
import utils from "@/styles/utils.module.css";
import { product } from "../../../../public/data";
import styles from "../../../styles/page.module.css";

type CampgroundViewPageProps = {
  campground: {
    images: { src: string }[];
  };
};

export default function CampgroundViewPage({ campground }: any) {
  return (
    <main className={`${styles.main} ${utils.flex}`}>
      <ProductGallery images={product.images} />
      <div className={styles.productDetail}></div>
    </main>
  );
}
