import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { InitialItemState, InitialState } from "./const";
import { Invoice } from "./typings";
import InvoicePreviewModal from "./components/InvoicePreview";

const InvoiceForm = () => {
  const [invoice, setInvoice] = useState<Invoice>(InitialState);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const addNewItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { ...JSON.parse(JSON.stringify(InitialItemState)), id: Date.now() },
      ],
    });
  };

  const deleteItem = (id: number) => () => {
    if (invoice.items.length === 1) {
      toast({
        title: "Error",
        description: "At least one item is required.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });

      return;
    }

    setInvoice({
      ...invoice,
      items: invoice.items.filter((item) => item.id !== id),
    });
  };

  const handleChange =
    (field: keyof typeof invoice) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInvoice({
        ...invoice,
        [field]: {
          ...invoice[field],
          [e.target.name]: e.target.value,
        },
      });
    };

  const handleItemChange =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInvoice({
        ...invoice,
        items: invoice.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              [e.target.name]: ["unitPrice", "quantity"].includes(e.target.name)
                ? Number(e.target.value) || 0
                : e.target.value,
            };
          }

          return item;
        }),
      });
    };

  const seePreview = () => {
    const errorFields: string[] = [];

    Object.entries(invoice).forEach(([key, value]) => {
      if (key !== "items") {
        Object.entries(value).forEach(([key, value]) => {
          if (!value) {
            errorFields.push(key);
          }
        });
      }
    });

    if (errorFields.length) {
      toast({
        title: "Error",
        description: `${errorFields.join(", ")} is required.`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });

      return;
    }

    // validate items
    let hasValidItems = true;
    invoice.items.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (key !== "id" && !value) {
          hasValidItems = false;
        }
      });
    });

    if (!hasValidItems) {
      toast({
        title: "Error",
        description: `All item fields are required.`,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });

      return;
    }

    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <InvoicePreviewModal
          isOpen={isOpen}
          invoice={invoice}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Box
        p={8}
        my={8}
        bg="white"
        maxW={"95%"}
        borderRadius="md"
        border="1px solid grey"
        mx="auto"
      >
        <HStack position={"relative"} justifyContent="right">
          <Heading
            position="absolute"
            left="50%"
            transform={"translateX(-50%)"}
            size="xl"
            textAlign="center"
            mb={4}
          >
            Invoice Form
          </Heading>

          <Button onClick={seePreview} colorScheme="blue">
            Preview Invoice
          </Button>
        </HStack>
        <Box mt={2}>
          <Heading size="lg" mb={4}>
            Quotation
          </Heading>
          <Stack spacing={4}>
            <HStack alignItems="flex-start">
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  value={invoice.quotation.date}
                  onChange={handleChange("quotation")}
                  type="date"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Quote</FormLabel>
                <Input
                  name="quote"
                  value={invoice.quotation.quote}
                  onChange={handleChange("quotation")}
                  type="text"
                  placeholder="Quote"
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl>
                <FormLabel>Reference</FormLabel>
                <Input
                  name="reference"
                  value={invoice.quotation.reference}
                  onChange={handleChange("quotation")}
                  type="text"
                  placeholder="Reference"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Payment Terms</FormLabel>
                <Input
                  name="paymentTerms"
                  value={invoice.quotation.paymentTerms}
                  onChange={handleChange("quotation")}
                  type="text"
                  placeholder="Payment terms"
                />
              </FormControl>
            </HStack>
          </Stack>
        </Box>
        <HStack mt={4}>
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Bill To
            </Heading>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Billing Address</FormLabel>
                <Input
                  name="address"
                  value={invoice.billTo.address}
                  onChange={handleChange("billTo")}
                  type="text"
                  placeholder="Billing Address"
                />
              </FormControl>
              <HStack>
                <FormControl>
                  <FormLabel>ACCT</FormLabel>
                  <Input
                    name="acct"
                    value={invoice.billTo.acct}
                    onChange={handleChange("billTo")}
                    type="text"
                    placeholder="ACCT"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Account terms</FormLabel>
                  <Input
                    name="accountTerms"
                    value={invoice.billTo.accountTerms}
                    onChange={handleChange("billTo")}
                    type="text"
                    placeholder="Account terms"
                  />
                </FormControl>
              </HStack>
            </Stack>
          </Box>
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Ship To
            </Heading>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Shipping Address</FormLabel>
                <Input
                  name="address"
                  value={invoice.shipTo.address}
                  onChange={handleChange("shipTo")}
                  type="text"
                  placeholder="Shipping Address"
                />
              </FormControl>

              <HStack>
                <FormControl>
                  <FormLabel>Attn</FormLabel>
                  <Input
                    name="attn"
                    value={invoice.shipTo.attn}
                    onChange={handleChange("shipTo")}
                    type="text"
                    placeholder="Attn"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    value={invoice.shipTo.email}
                    onChange={handleChange("shipTo")}
                    type="text"
                    placeholder="Email"
                  />
                </FormControl>
              </HStack>
            </Stack>
          </Box>
        </HStack>
        <Box mt={4}>
          <Heading size="lg" mb={4}>
            Items
          </Heading>
          <Stack spacing={4}>
            {invoice.items.map((item) => (
              <HStack key={item.id} alignItems="flex-end">
                <FormControl flex={8}>
                  <FormLabel>Part Number / Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    onChange={handleItemChange(item.id)}
                    value={item.description}
                    placeholder="Description"
                  />
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    name="quantity"
                    onChange={handleItemChange(item.id)}
                    type="number"
                    value={item.quantity}
                    placeholder="Quantity"
                  />
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel>Unit Price</FormLabel>
                  <Input
                    value={item.unitPrice}
                    name="unitPrice"
                    onChange={handleItemChange(item.id)}
                    type="number"
                    placeholder="Unit Price"
                  />
                </FormControl>

                <Button colorScheme="red" onClick={deleteItem(item.id)}>
                  Delete
                </Button>
              </HStack>
            ))}
          </Stack>
          <HStack onClick={addNewItem} mt={4} justifyContent="flex-end">
            <Button>+ Add Item</Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default InvoiceForm;
