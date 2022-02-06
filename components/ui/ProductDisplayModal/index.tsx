import Image from "next/image";
import { Modal } from "@shopify/polaris";
import { ProductDisplayModalProps as Props } from "types/prop-types";
import classes from "./classes.module.scss";

export default function ProductDisplayModal(props: Props) {
  const { productItem, isProductModalOpen, handleClose } = props;
  const { rating } = productItem;
  return (
    <Modal
      {...props}
      open={isProductModalOpen}
      onClose={handleClose}
      title={productItem.title}
    >
      <Modal.Section>
        <main className={classes.content}>
          <section className={classes.image_display}>
            <Image src={productItem.image} alt={productItem.title} />
          </section>
          <section className={classes.description}>
            <h3 className={classes.title}>A Description:</h3>
            <div className={classes.desc_text}>{productItem.description}</div>
          </section>
          <section className={classes.rating}>
            <h3 className={classes.title}>Rating:</h3>
            <div className={classes.datum}>
              <span className={classes.label}>Rating:</span>
              <span className={classes.value}>{rating.rate}</span>
            </div>
            <div className={classes.datum}>
              <span className={classes.label}>Rated by:</span>
              <span className={classes.value}>{rating.count} customers</span>
            </div>
          </section>
        </main>
      </Modal.Section>
    </Modal>
  );
}
