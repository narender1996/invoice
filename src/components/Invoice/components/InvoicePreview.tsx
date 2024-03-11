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
  VStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  ModalHeader,
  Input,
} from "@chakra-ui/react";
import { Invoice } from "../typings";
import { TermsAndConditions } from "../const";
import html2pdf from "html2pdf.js";
import { useState } from "react";

interface Props {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

const InvoicePreviewModal = (props: Props) => {
  const { invoice, isOpen, onClose } = props;
  const [fileName, setFileName] = useState("");

  const formatDate = (inputDate: string) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const getTotal = () => {
    return invoice.items
      .reduce((acc, item) => {
        return acc + Number(item.quantity) * Number(item.unitPrice);
      }, 0)
      .toFixed(2);
  };

  const exportPDF = () => {
    try{
      const element = document.getElementById("invoice-pdf");
      const contentHeight = element?.offsetHeight || 0
      const pageHeight = 841.89;
      const totalPages = Math.ceil(contentHeight / pageHeight);
      const pdf = html2pdf();
  
      for (let i = 0; i < totalPages; i++) {
        const startY = i * pageHeight;
        html2pdf(element, {
            margin: [10, 0, 10, 0],
            filename: fileName || "invoice.pdf",
            pagebreak: { mode: 'avoid-all', before: '.page-break' },
            startY
            // pagebreak: { mode: ["avoid-all", "css", "legacy"] },
          });
        // pdf.from(element).set({
        //   margin: [10, 0, 10, 0], // Reset margins for each page
        //   pagebreak: { mode: 'avoid-all', before: '.page-break' }, // Use a class to indicate page breaks
        //   startY,
        // });
      }
  
      // html2pdf(element, {
      //   margin: [10, 0, 10, 0],
      //   filename: fileName || "invoice.pdf",
      //   // pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      // });
    }catch(err){
    }
  };

  const shouldBreakBeforeRow = (row:any) => {
    // Define a threshold for content length that triggers a page break
    const contentThreshold = 50; // Adjust based on your needs
    const totalContentLength = row?.description.length// Add other columns as needed

    return totalContentLength > contentThreshold;
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
            id="invoice-pdf"
            // border="2px solid grey"
            overflowX="hidden"
          >
            <HStack alignItems="flex-start" border="2px solid grey">
              <HStack
                alignItems="flex-start"
                justifyContent={"space-between"}
                flex={2}
                mt={1}
              >
                <Image ml="1%" width="55%" src="/icon.png" />
                <VStack
                  gap={0}
                  alignItems="flex-start"
                  justifyContent="flex-end"
                  color="black"
                  fontSize={11}
                  fontWeight={500}
                >
                  <Text>Daalmeerstraat 24 </Text>
                  <Text> 2131 HC Hoofddorp The Netherlands</Text>
                  <Text>sales@partiumelite.com</Text>
                  <Text>+31 (0) 85 – 1301 685</Text>
                  <Text>VAT: NL862198446B01</Text>
                  <Text>CoC: 81729618</Text>
                </VStack>
              </HStack>
              <Box
                pb={2}
                background="#c7c7c7"
                borderLeft="2px solid grey"
                flex={1}
              >
                <Box width="100%" textAlign="center" height={10}>
                  <Heading mb={0} fontSize={16} fontWeight={800}>
                    Quotation
                  </Heading>
                </Box>
                <VStack gap={0} alignContent="center">
                  <HStack>
                    <Text fontSize={12} fontWeight={900}>
                      Quote
                    </Text>
                    <Text fontSize={12}>{invoice.quotation.quote}</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize={12} fontWeight={900}>
                      Date
                    </Text>
                    <Text fontSize={12}>
                      {formatDate(invoice.quotation.date)}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize={12} fontWeight={900}>
                      Reference
                    </Text>
                    <Text fontSize={12}>{invoice.quotation.reference}</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize={12} fontWeight={900}>
                      Payment terms
                    </Text>
                    <Text fontSize={12}>{invoice.quotation.paymentTerms}</Text>
                  </HStack>
                </VStack>
              </Box>
            </HStack>
            <HStack
              borderLeft="2px solid grey"
              borderRight="2px solid grey"
              gap={0}
              alignItems="stretch"
            >
              <Box
                p={2}
                flex={1}
                borderRight="1px solid grey"
                borderBottom="2px solid grey"
              >
                <Text mb={2} fontWeight={900} fontSize={14}>
                  Bill To
                </Text>
                <Text fontSize={12} fontWeight={900}>
                  {invoice.billTo.billname}
                </Text>
                <HStack alignItems="stretch">
                  <Text fontSize={12} fontWeight={900}>
                    Address:
                  </Text>
                  <Text fontSize={12} fontWeight={500}>
                    {invoice.billTo.billaddress}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontSize={12} fontWeight={900}>
                    Attn:
                  </Text>
                  <Text fontSize={12} fontWeight={500}>
                    {invoice.billTo.attn}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontSize={12} fontWeight={900}>
                    Email:
                  </Text>
                  <Text fontSize={12} fontWeight={500}>
                    {invoice.billTo.email}
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
                  {invoice.shipTo.shipname}
                </Text>
                <HStack alignItems="stretch">
                  <Text fontSize={12} fontWeight={900}>
                    Address:
                  </Text>
                  <Text fontSize={12} fontWeight={500}>
                    {invoice.shipTo.address}
                  </Text>
                </HStack>
                <Text>
                  <Box />
                </Text>
                <HStack />
              </Box>
            </HStack>
            <Box>
              <TableContainer>
                <Box borderLeft="2px solid grey" borderRight="2px solid grey">
                  <Text
                    fontSize={14}
                    padding={4}
                    textAlign="center"
                    fontWeight={700}
                  >
                    The Following is in response to your Request For Quote
                  </Text>
                </Box>
                <Table variant="simple">
                  <Thead>
                    <Tr
                      borderLeft="2px solid grey"
                      borderRight="2px solid grey"
                    >
                      <Th fontWeight={900} fontSize={12}>
                        Item
                      </Th>
                      <Th fontWeight={900} fontSize={12}>
                        Part Number
                      </Th>
                      <Th fontWeight={900} fontSize={12} flex={1}>
                        Description
                      </Th>
                      <Th fontWeight={900} fontSize={12}>
                        Qty
                      </Th>
                      <Th fontWeight={900} fontSize={12}>
                        Unit Price
                      </Th>
                      <Th fontWeight={900} fontSize={12}>
                        Total ($)
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {invoice.items.map((item, index) => (
                      <>
                                    {index > 0 && shouldBreakBeforeRow(item) && <tr style={{ pageBreakBefore: 'always' }}></tr>}

                      <Tr
                        borderLeft="2px solid grey"
                        borderRight="2px solid grey"
                        key={index}
                      >
                        <Td fontSize={12} fontWeight={700}>
                          {index + 1}
                        </Td>
                        <Td
                          fontSize={12}
                          whiteSpace="break-spaces"
                          fontWeight={700}
                        >
                          {item.part}
                        </Td>
                        <Td
                          fontSize={12}
                          fontWeight={700}
                          // whiteSpace="break-spaces"
                          maxWidth={'200px'}
                          whiteSpace="break-spaces" overflow="hidden" 
                        >
                          {item.description}
                        </Td>
                        <Td fontSize={12} fontWeight={700} textAlign="end">
                          {item.quantity}
                        </Td>
                        <Td fontSize={12} fontWeight={700} textAlign="end">
                          {item.unitPrice.toFixed(2)}
                        </Td>
                        <Td fontSize={12} fontWeight={700} textAlign="end">
                          {(
                            Number(item.quantity) * Number(item.unitPrice)
                          ).toFixed(2)}
                        </Td>
                      </Tr>
                      </>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr
                      borderLeft="2px solid grey"
                      borderRight="2px solid grey"
                      borderBottom="2px solid grey"
                    >
                      <Td colSpan={5}>
                        <HStack mb={4} justifyContent="space-between">
                          <Text fontSize={12} fontWeight={900}>
                            Terms & Conditions
                          </Text>
                          <Text fontSize={12} fontWeight={900}>
                            USD Total
                          </Text>
                        </HStack>
                        <Box>
                          {TermsAndConditions.map((term, index) => (
                            <HStack
                              fontWeight={500}
                              gap={2}
                              fontSize={8}
                              color="black"
                              key={index}
                              whiteSpace="break-spaces"
                              alignItems="flex-start"
                            >
                              <Text textAlign="right" fontWeight={900}>
                                {index + 1}.
                              </Text>
                              <Text wordBreak="break-all">{term}</Text>
                            </HStack>
                          ))}
                        </Box>
                      </Td>
                      <Td
                        border="none !important"
                        fontWeight={900}
                        display="flex"
                        textAlign="end"
                        fontSize={12}
                      >
                        {getTotal()}
                      </Td>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InvoicePreviewModal;