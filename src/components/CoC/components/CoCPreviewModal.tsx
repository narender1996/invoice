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
} from "@chakra-ui/react";
import { CoC } from "../typings";
import html2pdf from "html2pdf.js";
import { useState } from "react";

interface Props {
  coc: CoC;
  isOpen: boolean;
  onClose: () => void;
}

const COCPreviewModal = (props: Props) => {
  const { coc, isOpen, onClose } = props;
  const [fileName, setFileName] = useState("");

  const formatDate = (inputDate: string) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const exportPDF = () => {
    const element = document.getElementById("coc-pdf");
    html2pdf(element, {
      margin: [10, 0, 10, 0],
      filename: fileName || "coc.pdf",
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
            id="coc-pdf"
            border="2px solid grey"
            fontSize={14}
            p={2}
          >
            <HStack alignItems="flex-start" gap={4}>
              <Stack
                flex={3}
                gap={0}
                alignItems="flex-end"
                justifyContent="flex-start"
                pb={2}
              >
                <Text mb={2} fontSize={20} fontWeight={700}>
                  Certificate of Conformance / Dispatch Note
                </Text>
                <Text>Daalmeerstraat 24, 2131 HC</Text>
                <Text>Hoofddrop, The Netherlands</Text>
                <Text>VAT: NL862198446B01</Text>
              </Stack>
              <Image flex={2} width="30%" ml="1%" src="/icon.png" />
            </HStack>

            <HStack
              alignItems="stretch"
              fontWeight={700}
              fontSize={11}
              border="2px solid grey"
              mt={4}
            >
              <Stack pb={2} p={1} flex={1} borderRight={"2px solid grey"}>
                <Text>Document Number: {coc.document.number}</Text>
                <Text>Document Date: {formatDate(coc.document.date)}</Text>
                <Text>Goods Shipped from: {coc.document.shippedFrom}</Text>
                <Text>Ultimate Destination: {coc.document.destination}</Text>
              </Stack>
              <Stack
                p={1}
                alignItems="center"
                borderRight={"2px solid grey"}
                flex={1}
                pb={2}
              >
                <Text fontSize={14}>Deliver To: </Text>
                <Text>{coc.deliverTo}</Text>
              </Stack>
              <Stack p={1} pb={2} flex={1}>
                <Text>Customer PO Number: {coc.customer.poNumber}</Text>
                <Text>Invoice Number: {coc.customer.invoiceNumber}</Text>
                <Text>Forwarder: {coc.customer.forwarder}</Text>
                <Text>Tracking Number: {coc.customer.trackingNumber}</Text>
              </Stack>
            </HStack>

            <Stack
              fontWeight={700}
              fontSize={11}
              mt={4}
              gap={0}
              border="2px solid grey"
            >
              <HStack alignItems="stretch">
                <Text p={1} pb={2} flex={1}>
                  Weight / Dimension
                </Text>
                <Text borderLeft="2px solid grey" p={1} flex={2}>
                  {coc.weightAndDimension}
                </Text>
              </HStack>
              <HStack alignItems="stretch">
                <Text p={1} pb={2} flex={1}>
                  Number of boxes
                </Text>
                <Text borderLeft="2px solid grey" p={1} flex={2}>
                  {coc.numberOfBoxes}
                </Text>
              </HStack>
            </Stack>

            <Stack
              border="2px solid grey"
              mt={4}
              fontWeight={700}
              fontSize={11}
              gap={0}
              __css={{
                "& p": {
                  padding: "4px",
                  paddingBottom: "8px",
                },
              }}
            >
              <HStack alignItems="stretch">
                <Text borderRight={"2px solid grey"} flex={1} textAlign={"center"}>
                  Qty
                </Text>
                <Text borderRight={"2px solid grey"} flex={8} textAlign={"center"}>
                  Part & Description
                </Text>
                <Text borderRight={"2px solid grey"} flex={2}>
                  Lot Number
                </Text>
                <Text borderRight={"2px solid grey"} flex={2}>
                  Shelf Life
                </Text>
                <Text flex={3}>Country Of Origin</Text>
              </HStack>

              {coc.items.map((item) => (
                <HStack alignItems="stretch" borderTop="2px solid grey">
                  <Text borderRight={"2px solid grey"} flex={1} textAlign={"center"}>
                    {item.qty}
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={8} textAlign={"center"}>
                    {item.description}
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={2} textAlign="center">
                    {item.lotNumber}
                  </Text>
                  <Text borderRight={"2px solid grey"} flex={2} textAlign="center">
                    {item.shelfLife}
                  </Text>
                  <Text flex={3} textAlign="center">{item.origin}</Text>
                </HStack>
              ))}
            </Stack>

            <Text px={4} fontSize={10} fontWeight={700} mt={8}>
              We certified that the whole of the parts/materials covered by this
              certificate have been received under the cover of the approved
              certificates or release notes quoted and are in the same condition
              as when received and are further issued for your inspection.
            </Text>
            <Box style={{display:"flex"}} mt={2} mb={2}>
               <Image  width="20%" ml="1%" src="/icon2.jpeg" />
              <Image  width="20%" ml="5%" src="/icon1.jpeg" />

               </Box>
            <Stack>
              <Text px={4} fontSize={10} fontWeight={700} >
                Signed on Behalf of Partium, Elite B.V.: Quality Control
              </Text>
              {/* TODO: Implement Image here */}
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default COCPreviewModal;
