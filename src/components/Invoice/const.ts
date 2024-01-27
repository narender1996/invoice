export const InitialItemState = {
  part: "",
  description: "",
  quantity: 0,
  unitPrice: 0,
};

export const InitialState = {
  quotation: {
    date: "",
    quote: "",
    reference: "",
    paymentTerms: "",
  },
  billTo: {
    billname: "",
    billaddress:"",
    attn: "",
    email: "",
  },
  shipTo: {
    shipname: "",
    address:""
  },
  items: [{ ...InitialItemState, id: Date.now() }],
};

export const TermsAndConditions = [
  "Stock items are always subject to prior sales.",
  "Orders are subject to a minimum value of $250.00.",
  "Unless otherwise specified, all goods are supplied EX-Works.",
  `Quoted prices are based on the quantities we have offered. If you reduce or increase the quantities, prices may be subject to change.`,
  "Quoted prices are for routine services. AOG (Aircraft on Ground) priority services will incur additional charges.",
  "For stock items, we require 1-2 days for packaging and documentation.",
  "Dangerous goods packaging and documentation charges are extra.",
  "If you require any additional certificates or documents to accompany your shipment, please check with us prior to placing your order.",
  "Once the order is placed, it cannot be cancelled without written confirmation from our side.",
  "By placing a purchase order, you acknowledge and accept the terms and conditions of the company.",
];
