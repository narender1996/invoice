export const INITIAL_ITEM_STATE = {
  qty: "",
  description: "",
  lotNumber: "",
  shelfLife: "",
  origin: "",
};

export const INITIAL_STATE = {
  document: {
    number: "",
    date: "",
    shippedFrom: "",
    destination: "",
  },
  deliverTo: "",
  customer: {
    poNumber: "",
    invoiceNumber: "",
    forwarder: "",
    trackingNumber: "",
  },
  weightAndDimension: "",
  numberOfBoxes: "0",
  items: [
    {
      ...INITIAL_ITEM_STATE,
      id: Date.now(),
    },
  ],
};
