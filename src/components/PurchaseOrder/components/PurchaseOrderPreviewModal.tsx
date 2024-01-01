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
  const { purchaseOrder, isOpen, onClose } = props;
  const [fileName, setFileName] = useState("");

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
    return `${day}/${month}/${d.getFullYear()}`;
  };

  const exportPDF = () => {
    const element = document.getElementById("purchase-order-pdf");
    html2pdf(element, {
      margin: [10, 0, 10, 0],
      filename: fileName || "purchase-order.pdf",
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
                <Image ml="1%" width="55%" src="/icon.png" />
                <Box>
                  <Text>
                    Daalmeerstraat 24, (2131 HC) Hooddorp The Netherlands
                  </Text>
                  <Text>
                    Email:{" "}
                    <Text fontWeight={700} color="orange" as={"span"}>
                      sales@partimelite.com
                    </Text>
                  </Text>
                  <Text>Phone: +31 (0) 85-301 685</Text>
                  <Text>CoC: 81729618</Text>
                </Box>
              </Stack>
              <Stack height="100%" flex={1}>
                <Text
                  textAlign="center"
                  fontSize={28}
                  fontWeight={700}
                  color="navy"
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
              <HStack
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
              <HStack
                borderBottom="2px solid grey"
                minH={"80px"}
                alignItems="stretch"
                gap={0}
              >
                <Text
                  p={1}
                  fontWeight={700}
                  borderRight="1px solid grey"
                  flex={1}
                >
                  {purchaseOrder.supplier}
                </Text>
                <Text
                  p={1}
                  fontWeight={700}
                  borderLeft="1px solid grey"
                  flex={1}
                >
                  {purchaseOrder.shipTo}
                </Text>
              </HStack>
              <HStack
                borderBottom="2px solid grey"
                alignItems="stretch"
                gap={0}
                minH={"100px"}
              >
                <Stack flex={1} borderRight="2px solid grey">
                  <Text borderBottom={"2px solid grey"} p={1} fontWeight={700}>
                    Shipping Method
                  </Text>
                  <Text p={1} fontWeight={700}>
                    {purchaseOrder.shippingMethod}
                  </Text>
                </Stack>
                <Stack flex={1} borderRight="2px solid grey">
                  <Text borderBottom={"2px solid grey"} p={1} fontWeight={700}>
                    Ultimate Destination
                  </Text>
                  <Text p={1} fontWeight={700}>
                    {purchaseOrder.destination}
                  </Text>
                </Stack>
                <Stack flex={1}>
                  <Text borderBottom={"2px solid grey"} p={1} fontWeight={700}>
                    Contact Person & Email
                  </Text>
                  <Stack p={1} fontWeight={700}>
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
                  <Text borderRight={"2px solid grey"} flex={3}>
                    Part Name & Description
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={1}>
                    Qty
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={1}>
                    Unit Price
                  </Text>
                  <Text flex={1}>Total</Text>
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
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      textAlign={"left !important"}
                      borderRight={"2px solid grey"}
                      flex={3}
                    >
                      [ {item.part} ]&nbsp;{item.description}
                    </Text>
                    <Text borderRight={"2px solid grey"} flex={1}>
                      {item.quantity}
                    </Text>
                    <Text borderRight={"2px solid grey"} flex={1}>
                      {item.unitPrice}
                    </Text>
                    <Text flex={1}>
                      {Number(item.unitPrice) * Number(item.quantity)}
                    </Text>
                  </HStack>
                ))}
              </Box>
            </Box>
            <Stack mx={6} fontSize={12} mt={16}>
              <Text fontWeight={700}>Special Instructions:</Text>
              <List fontWeight={500}>
                <ListItem mb={2}>
                  • Send us a pickup notification via email, which should
                  include the weight, dimensions, pickup location, the contact
                  person's name and documents (Invoice / CoC & Packing List)
                </ListItem>
                <ListItem mb={2}>
                  • For shelf life items, the pickup notification should include
                  all necessary documents, such as Dangerous Goods Declaration
                  (DGD), Material Safety Data Sheet (MSDS), Manufacturer's
                  Certificate of Conformance (MFR CoC) or Certificate of
                  Analysis (COA), and Supplier's Invoice/Packing List &
                  Certificate of Conformance (COC).
                </ListItem>
                <ListItem mb={2}>
                  • For rotable items, include all necessary documents, such as
                  Removal Tag, previous operator NIS, Bill of Sale from the
                  previous operator, Shop teardown report, Shop ARC, Shop
                  warranty details, and Supplier's Invoice/Packing List &
                  Material Certificate (COC).
                </ListItem>
                <ListItem mb={2}>
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
