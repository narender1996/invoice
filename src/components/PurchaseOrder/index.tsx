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
import { Link } from "react-router-dom";
import { InitialItemState, InitialPurchaseOrderState } from "./const";
import { PurchaseOrder } from "./typings";
import PurchaseOrderPreviewModal from "./components/PurchaseOrderPreviewModal";

const PurchaseOrderForm = () => {
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(
    InitialPurchaseOrderState
  );
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const addNewItem = () => {
    setPurchaseOrder({
      ...purchaseOrder,
      items: [
        ...purchaseOrder.items,
        { ...JSON.parse(JSON.stringify(InitialItemState)), id: Date.now() },
      ],
    });
  };

  const deleteItem = (id: number) => () => {
    if (purchaseOrder.items.length === 1) {
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

    setPurchaseOrder({
      ...purchaseOrder,
      items: purchaseOrder.items.filter((item) => item.id !== id),
    });
  };

  const handleChange =
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPurchaseOrder({
        ...purchaseOrder,
          [e.target.name]: e.target.value,
      });
    };

    const handleNestedchanges=
      (field:"supplier" | "shipTo") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setPurchaseOrder({
          ...purchaseOrder,
          [field]: {
            ...purchaseOrder[field],
            [e.target.name]: e.target.value,
          },
        });
    }

  const handleItemChange =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPurchaseOrder({
        ...purchaseOrder,
        items: purchaseOrder.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              [e.target.name]: ["qty"].includes(e.target.name)
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

    Object.entries(purchaseOrder).forEach(([key, value]) => {
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
    purchaseOrder.items.forEach((item) => {
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
        <PurchaseOrderPreviewModal
          isOpen={isOpen}
          purchaseOrder={purchaseOrder}
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
        <HStack alignItems="center" justifyContent="space-between">
          <Button
            variant="outline"
            colorScheme="blue"
            width="150px"
            as={Link}
            to="/"
          >
            Back
          </Button>

          <Heading size="xl" textAlign="center">
            Purchase Order Form
          </Heading>

          <Button width="150px" onClick={seePreview} colorScheme="blue">
            Preview
          </Button>
        </HStack>
        <Box mt={2}>
          <Heading size="lg" mb={4}>
            Basic Info
          </Heading>
          <Stack spacing={4}>
            <HStack alignItems="flex-start">
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  onChange={handleChange}
                  value={purchaseOrder.date}
                  name="date"
                  type="date"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Purchase Order</FormLabel>
                <Input
                  value={purchaseOrder.purchaseOrder}
                  onChange={handleChange}
                  name="purchaseOrder"
                  type="text"
                  placeholder="Purchase Order"
                />
              </FormControl>
            </HStack>
          </Stack>
        </Box>
          {/* <HStack mt={4} alignItems="stretch">
            <Box flex={1}>
              <Heading size="lg" mb={4}>
                Supplier
              </Heading>
              <FormControl>
                <Input
                  value={purchaseOrder.supplier}
                  onChange={handleChange}
                  name="supplier"
                  type="text"
                  placeholder="Supplier"
                />
              </FormControl>
            </Box>
          </HStack>
        <HStack mt={4} alignItems="stretch">
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Ship to
            </Heading>
            <FormControl>
              <Input
                value={purchaseOrder.shipTo}
                onChange={handleChange}
                name="shipTo"
                type="text"
                placeholder="Ship to"
              />
            </FormControl>
          </Box>
        </HStack> */}
         <HStack mt={4} alignItems="stretch">
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Supplier
            </Heading>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Company Name</FormLabel>
                <Input
                  name="suppliername"
                  value={purchaseOrder.supplier.suppliername}
                  onChange={handleNestedchanges("supplier")}
                  type="text"
                  placeholder="Company Name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  name="supplieraddress"
                  value={purchaseOrder.supplier.supplieraddress}
                  onChange={handleNestedchanges("supplier")}
                  type="text"
                  placeholder="Address"
                />
              </FormControl>
              <HStack>
                <FormControl>
                  <FormLabel>Attn</FormLabel>
                  <Input
                    name="attn"
                    value={purchaseOrder.supplier.attn}
                    onChange={handleNestedchanges("supplier")}
                    type="text"
                    placeholder="Attn"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    value={purchaseOrder.supplier.email}
                    onChange={handleNestedchanges("supplier")}
                    type="text"
                    placeholder="Email"
                  />
                </FormControl>
              </HStack>
            </Stack>
          </Box>
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Ship To
            </Heading>
            <Stack spacing={4} alignItems="stretch">
              <FormControl>
                <FormLabel>Company Name</FormLabel>
                <Input
                  name="shipname"
                  value={purchaseOrder.shipTo.shipname}
                  onChange={handleNestedchanges("shipTo")}
                  type="text"
                  placeholder="Company Name"
                />
              </FormControl>
              <HStack>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    name="address"
                    value={purchaseOrder.shipTo.address}
                    onChange={handleNestedchanges("shipTo")}
                    type="text"
                    placeholder="Address"
                  />
                </FormControl>
              </HStack>
            </Stack>
          </Box>
        </HStack>
        <HStack mt={4} alignItems="stretch">
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Shipping Method
            </Heading>
            <FormControl>
              <Input
                value={purchaseOrder.shippingMethod}
                onChange={handleChange}
                name="shippingMethod"
                type="text"
                placeholder="Shipping Method"
              />
            </FormControl>
          </Box>
        </HStack>
        <HStack mt={4} alignItems="stretch">
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Ultimate Destination
            </Heading>
            <FormControl>
              <Input
                value={purchaseOrder.destination}
                onChange={handleChange}
                name="destination"
                type="text"
                placeholder="Ultimate Destination"
              />
            </FormControl>
          </Box>
        </HStack>
        <HStack mt={4} alignItems="stretch">
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Contact Person & Email
            </Heading>
            <HStack>
              <FormControl>
                <Input
                  value={purchaseOrder.contactPerson}
                  onChange={handleChange}
                  name="contactPerson"
                  type="text"
                  placeholder="Contact Person"
                />
              </FormControl>
              <FormControl>
                <Input
                  value={purchaseOrder.contactEmail}
                  onChange={handleChange}
                  name="contactEmail"
                  type="text"
                  placeholder="Email"
                />
              </FormControl>
            </HStack>
          </Box>
        </HStack>
        <Box mt={4}>
          <Heading size="lg" mb={4}>
            Items
          </Heading>
          <Stack spacing={4}>
            {purchaseOrder.items.map((item) => (
              <HStack key={item.id} alignItems="flex-end">
                <FormControl flex={3}>
                  <FormLabel>Part Number</FormLabel>
                  <Input
                    type="text"
                    name="part"
                    onChange={handleItemChange(item.id)}
                    value={item.part}
                    placeholder="Part Number"
                  />
                </FormControl>
                <FormControl flex={8}>
                  <FormLabel>Description</FormLabel>
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
                    placeholder="Qty"
                  />
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel>Unit Price</FormLabel>
                  <Input
                    value={item.unitPrice}
                    name="unitPrice"
                    onChange={handleItemChange(item.id)}
                    type="number"
                    placeholder="Price"
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

export default PurchaseOrderForm;
