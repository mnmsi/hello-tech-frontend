const DataLayer = ({ productPreview = "", cart = {}, checkout = {} }) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "BDT",
        items: [
          {
            item_name: productPreview.name,
            item_id: productPreview.id,
            item_brand: productPreview?.brand?.name,
            item_category: productPreview?.category?.name,
            price: productPreview.offer_price,
          },
        ],
      },
    });
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "BDT",
        items: [
          {
            item_name: cart?.name,
            item_id: cart?.id,
            item_brand: cart?.item_brand,
            item_category: cart?.item_category,
            price: cart?.price,
            quantity: cart?.quantity,
          },
        ],
      },
    });
    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        currency: "BDT",
        revenue: checkout?.revenue,
      },
      items: checkout?.items?.map((item) => ({
        product_name: item?.product_name,
        product_id: item?.product_id,
        quantity: item?.quantity,
        price: item?.product_price,
        product_code: item?.product_code,
      })),
    });
  }
  return <></>;
};

export default DataLayer;
