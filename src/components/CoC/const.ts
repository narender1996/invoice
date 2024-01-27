export const INITIAL_ITEM_STATE = {
  qty: "12",
  description: "qwer",
  lotNumber: "qwer",
  shelfLife: "qwer",
  origin: "qwer",
};

export const INITIAL_STATE = {
  document: {
    number: "qwer",
    date: "qwer",
    shippedFrom: "1234",
    destination: "1234r",
  },
  deliverTo: "1234",
  customer: {
    poNumber: "234",
    invoiceNumber: "2345",
    forwarder: "2345",
    trackingNumber: "12345",
  },
  weightAndDimension: "120",
  numberOfBoxes: "10",
  items: Array(40)
    .fill("")
    .map((_, index) => ({
      ...INITIAL_ITEM_STATE,
      id: index,
      qty: `${index + 1}`,
    })),
};
