import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalBody,
  Button,
  HStack,
  Image,
  Box,
  ModalHeader,
  Input,
  Stack,
  List,
  ListItem,
  Center,
} from "@chakra-ui/react";
import html2pdf from "html2pdf.js";
import { useState } from "react";
import { PurchaseOrder } from "../typings";

interface Props {
  purchaseOrder: PurchaseOrder;
  isOpen: boolean;
  onClose: () => void;
}


const PurchaseOrderPreviewModal = (props: Props) => {
console.log(props.purchaseOrder,"asdasdas")

  const { purchaseOrder, isOpen, onClose } = props;
  const [fileName, setFileName] = useState("");

  const formatDate = (inputDate: string) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const getTotal = () => {
    return purchaseOrder.items
      .reduce((acc, item) => {
        return acc + Number(item.quantity) * Number(item.unitPrice);
      }, 0)
      .toFixed(2);
  };

  const exportPDF = () => {
    const element = document.getElementById("purchase-order-pdf");
    html2pdf(element, {
      margin: [10, 0, 10, 0],
      filename: fileName || "purchase-order.pdf",
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    });
  };

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="space-between" gap={8}>
          <Box>
            <Button colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </Box>
          <HStack justifyContent="flex-end" flex={1} gap={4}>
            <Input
              type="text"
              width={"240px"}
              placeholder="Enter file name"
              onChange={(e) => setFileName(e.target.value)}
              display={"inline-block"}
            />
            <Button colorScheme="blue" onClick={exportPDF}>
              Download
            </Button>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <Box
            mx={"auto"}
            my={2}
            width={"768px"}
            id="purchase-order-pdf"
            border="2px solid grey"
            fontSize={12}
          >
            <HStack p={2} alignItems="flex-start">
              <Stack flex={1}>
                <Image ml="1%" width="85%" src="/icon.png" />
                <Box>
                  <Text fontWeight={500}  fontSize={11}>
                    Daalmeerstraat 24, (2131 HC) Hooddorp The Netherlands
                  </Text>
                  <Text fontWeight={500} fontSize={11}>
                    Email:{" "}
                    <Text fontWeight={500}  as={"span"} fontSize={11}>
                      sales@partimelite.com
                    </Text>
                  </Text>
                  <Box style={{display:"flex", justifyContent:"space-between"}} width="80%">
                  <Text fontWeight={500} fontSize={11}>Phone: +31 (0) 85-301 685</Text>
                  <Text fontWeight={500} fontSize={11}>CoC: 81729618</Text>
                  </Box>
                </Box>
              </Stack>
              <Stack height="100%" flex={1}>
                <Text
                  textAlign="center"
                  fontSize={28}
                  fontWeight={700}
                >
                  PURCHASE ORDER
                </Text>
                <Stack
                  border="2px solid grey"
                  fontSize={14}
                  fontWeight={700}
                  alignItems="center"
                >
                  <Text
                    width={"100%"}
                    textAlign="center"
                    pb={1}
                    background="gray.100"
                  >
                    Date: {formatDate(purchaseOrder.date)}
                  </Text>
                  <Text pb={1} width={"100%"} textAlign="center">
                    Purchase Order# {purchaseOrder.purchaseOrder}
                  </Text>
                </Stack>
              </Stack>
            </HStack>

            

            <Box m={2} border="2px solid grey">
            <HStack gap={0} alignItems="stretch">
              <Box
                p={2}
                flex={1}
                borderRight="1px solid grey"
                borderBottom="2px solid grey"
              >
                <Text mb={2} fontWeight={900} fontSize={14}>
                Supplier
                </Text>
                <Text fontSize={12} fontWeight={900}>
                  {purchaseOrder.supplier.suppliername}
                </Text>
                <HStack alignItems="stretch">
                  <Text fontSize={12} fontWeight={900}>
                    Address:
                  </Text>
                  <Text fontSize={12} fontWeight={500}>
                    {purchaseOrder.supplier.supplieraddress}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontSize={12} fontWeight={900}>
                    Attn:
                  </Text>
                  <Text fontSize={12} fontWeight={500}>
                    {purchaseOrder.supplier.attn}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontSize={12} fontWeight={900}>
                    Email:
                  </Text>
                  <Text fontSize={12} fontWeight={500}>
                    {purchaseOrder.supplier.email}
                  </Text>
                </HStack>
              </Box>
              <Box
                p={2}
                flex={1}
                borderBottom="2px solid grey"
                borderLeft="1px solid grey"
              >
                <Text fontSize={14} mb={2} fontWeight={900}>
                  Ship To
                </Text>
                <Text fontSize={12} fontWeight={900}>
                  {purchaseOrder.shipTo.shipname}
                </Text>
                <HStack alignItems="stretch">
                  <Text fontSize={12} fontWeight={900}>
                    Address:
                  </Text>
                  <Text fontSize={12} fontWeight={500}>
                    {purchaseOrder.shipTo.address}
                  </Text>
                </HStack>
                <Text >
                  <Box />
                </Text>
                <HStack />
              </Box>
            </HStack>
               {/* {/* <HStack
                alignItems="stretch"
                borderBottom="2px solid grey"
                gap={0}
              >
                <Text
                  p={1}
                  fontWeight={700}
                  borderRight="1px solid grey"
                  flex={1}
                >
                  Supplier
                </Text>
                <Text
                  p={1}
                  fontWeight={700}
                  borderLeft="1px solid grey"
                  flex={1}
                >
                  Ship To
                </Text>
              </HStack> 
              {/* <HStack
                borderBottom="2px solid grey"
                minH={"80px"}
                alignItems="stretch"
                gap={0}
              >
                <Text
                  p={1}
                  fontWeight={500}
                  borderRight="1px solid grey"
                  flex={1}
                >
                 {purchaseOrder.supplier}
                </Text>
                <Text
                  p={1}
                  fontWeight={500}
                  borderLeft="1px solid grey"
                  flex={1}
                >
                   {purchaseOrder.shipTo} 
                </Text>
              </HStack> */}
              <HStack
                borderBottom="2px solid grey"
                alignItems="stretch"
                gap={0}
                minH={"100px"}
              >
                <Stack flex={1} borderRight="2px solid grey">
                  <Text borderBottom={"2px solid grey"} p={1} fontWeight={700}>
                    Ultimate Destination
                  </Text>
                  <Text p={1} fontWeight={500}>
                    {purchaseOrder.destination}
                  </Text>
                </Stack>
                <Stack flex={1} borderRight="2px solid grey">
                  <Text borderBottom={"2px solid grey"} p={1} fontWeight={700}>
                    Shipping Method
                  </Text>
                  <Text p={1} fontWeight={500}>
                    {purchaseOrder.shippingMethod}
                  </Text>
                </Stack>
                
                <Stack flex={1}>
                  <Text borderBottom={"2px solid grey"} p={1} fontWeight={700}>
                    Contact Person & Email
                  </Text>
                  <Stack p={1} fontWeight={500}>
                    <Text>{purchaseOrder.contactPerson}</Text>
                    <Text>{purchaseOrder.contactEmail}</Text>
                  </Stack>
                </Stack>
              </HStack>
              <Box
                css={{
                  "& p": {
                    textAlign: "center",
                    paddingBottom: "8px",
                  },
                }}
              >
                <HStack px={1} fontWeight={700}>
                  <Text borderRight={"2px solid grey"} flex={1}>
                    Item
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={1}>
                    Part Number 
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={3}>
                     Description
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={1}>
                    Qty
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={1}>
                    Unit Price
                  </Text>
                  <Text flex={1}>Total Amount</Text>
                </HStack>
                {purchaseOrder.items.map((item, idx) => (
                  <HStack
                    alignItems="stretch"
                    borderTop="2px solid grey"
                    px={1}
                    fontWeight={700}
                  >
                    <Text borderRight={"2px solid grey"} flex={1}>
                      {idx + 1}
                    </Text>
                    <Text
                      textAlign={"end"}
                      borderRight={"2px solid grey"}
                      flex={1}
                    >
                       {item.part} 
                    </Text>
                    <Text borderRight={"2px solid grey"} flex={3}>
                    {item.description}
                    </Text>
                    <Text borderRight={"2px solid grey"} flex={1}>
                      {item.quantity}
                    </Text>
                    <Text borderRight={"2px solid grey"} flex={1}>
                      {item.unitPrice}
                    </Text>
                    <Text flex={1}>
                      {(Number(item.unitPrice) * Number(item.quantity)).toFixed(2)}
                    </Text>
                  </HStack>
                ))}
                
                  <Box
                css={{
                  "& p": {
                    textAlign: "end",
                    paddingBottom: "8px",
                  },
                }}
              >
                  <HStack
                    alignItems="stretch"
                    borderTop="2px solid grey"
                    px={1}
                    fontWeight={700}
                  >
                  <Text flex={7.5}  borderRight={"2px solid grey"}>Total Amount (USD)</Text>
                  <Text flex={1}  >{getTotal()} </Text>

                  </HStack>
                  
              </Box>
                 
              </Box>
            </Box> 
            <Stack mx={6} fontSize={12} mt={16}>
              <Text fontWeight={700}>Special Instructions:</Text>
              <List fontWeight={500}>
                <ListItem mb={2} fontSize={10} fontWeight={500}>
                  • Send us a pickup notification via email, which should
                  include the weight, dimensions, pickup location, the contact
                  person's name and documents (Invoice / CoC & Packing List)
                </ListItem>
                <ListItem mb={2} fontSize={10} fontWeight={500}>
                  • For shelf life items, the pickup notification should include
                  all necessary documents, such as Dangerous Goods Declaration
                  (DGD), Material Safety Data Sheet (MSDS), Manufacturer's
                  Certificate of Conformance (MFR CoC) or Certificate of
                  Analysis (COA), and Supplier's Invoice/Packing List &
                  Certificate of Conformance (COC).
                </ListItem>
                <ListItem mb={2} fontSize={10} fontWeight={500}>
                  • For rotable items, include all necessary documents, such as
                  Removal Tag, previous operator NIS, Bill of Sale from the
                  previous operator, Shop teardown report, Shop ARC, Shop
                  warranty details, and Supplier's Invoice/Packing List &
                  Material Certificate (COC).
                </ListItem>
                <ListItem mb={2} fontSize={10} fontWeight={500}>
                  • Ensure that the shipment is well packed for air movement in
                  accordance with international standards.
                </ListItem>
              </List>
            </Stack>
            <Center m={6} color="grey" fontWeight={700} fontSize={14}>
              We appreciate your support & services !!
            </Center>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PurchaseOrderPreviewModal;
