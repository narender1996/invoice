export const InitialItemState = {
  part: "",
  description: "",
  quantity: "",
  unitPrice: "",
};

export const InitialPurchaseOrderState = {
  date: "",
  purchaseOrder: "",
  supplier: {
    suppliername: "",
    supplieraddress:"",
    attn: "",
    email: "",
  },
  shipTo: {
    shipname: "",
    address:""
  },
  shippingMethod: "",
  destination: "",
  contactPerson: "",
  contactEmail: "",
  items: [{ ...InitialItemState, id: Date.now() }],
};
