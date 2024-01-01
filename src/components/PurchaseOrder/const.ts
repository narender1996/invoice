export const InitialItemState = {
  part: "",
  description: "",
  quantity: "",
  unitPrice: "",
};

export const InitialPurchaseOrderState = {
  date: "",
  purchaseOrder: "",
  supplier: "",
  shipTo: "",
  shippingMethod: "",
  destination: "",
  contactPerson: "",
  contactEmail: "",
  items: [{ ...InitialItemState, id: Date.now() }],
};
