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
import { CoC } from "./typings";
import { INITIAL_ITEM_STATE, INITIAL_STATE } from "./const";
import COCPreviewModal from "./components/CoCPreviewModal";
import { Link } from "react-router-dom";

const CoCForm = () => {
  const [coc, setCoC] = useState<CoC>(INITIAL_STATE);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const addNewItem = () => {
    setCoC({
      ...coc,
      items: [
        ...coc.items,
        { ...JSON.parse(JSON.stringify(INITIAL_ITEM_STATE)), id: Date.now() },
      ],
    });
  };

  const deleteItem = (id: number) => () => {
    if (coc.items.length === 1) {
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

    setCoC({
      ...coc,
      items: coc.items.filter((item) => item.id !== id),
    });
  };

  const handleChange =
    (
      field: Exclude<
        keyof typeof coc,
        "deliverTo" | "weightAndDimension" | "numberOfBoxes" | "items"
      >
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCoC({
        ...coc,
        [field]: {
          ...coc[field],
          [e.target.name]: e.target.value,
        },
      });
    };

  const handleItemChange =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCoC({
        ...coc,
        items: coc.items.map((item) => {
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

    Object.entries(coc).forEach(([key, value]) => {
      if (["deliverTo", "weightAndDimension", "numberOfBoxes"].includes(key)) {
        if (!value) {
          errorFields.push(key);
        }
        return;
      }

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
    coc.items.forEach((item) => {
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
        <COCPreviewModal
          isOpen={isOpen}
          coc={coc}
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
            COC Form
          </Heading>

          <Button width="150px" onClick={seePreview} colorScheme="blue">
            Preview COC
          </Button>
        </HStack>
        <Box mt={2}>
          <Heading size="lg" mb={4}>
            Document Info
          </Heading>
          <Stack spacing={4}>
            <HStack alignItems="flex-start">
              <FormControl>
                <FormLabel>Document number</FormLabel>
                <Input
                  value={coc.document.number}
                  onChange={handleChange("document")}
                  name="number"
                  type="text"
                  placeholder="Document number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Document Date</FormLabel>
                <Input
                  onChange={handleChange("document")}
                  value={coc.document.date}
                  name="date"
                  type="date"
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl>
                <FormLabel>Document shipped from </FormLabel>
                <Input
                  value={coc.document.shippedFrom}
                  onChange={handleChange("document")}
                  name="shippedFrom"
                  type="text"
                  placeholder="Shipped from"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ultimate destination</FormLabel>
                <Input
                  name="destination"
                  value={coc.document.destination}
                  onChange={handleChange("document")}
                  type="text"
                  placeholder="Destination"
                />
              </FormControl>
            </HStack>
          </Stack>
        </Box>
        <HStack mt={4} alignItems="stretch">
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Deliver To
            </Heading>
            <FormControl>
              <Input
                value={coc.deliverTo}
                onChange={(e) =>
                  setCoC((prev) => ({ ...prev, deliverTo: e.target.value }))
                }
                name="deliverTo"
                type="text"
                placeholder="Deliver to"
              />
            </FormControl>
          </Box>
        </HStack>
        <HStack mt={4} alignItems="stretch">
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Customer Info
            </Heading>
            <Stack spacing={4}>
              <HStack alignItems="flex-start">
                <FormControl>
                  <FormLabel>Customer PO number</FormLabel>
                  <Input
                    value={coc.customer.poNumber}
                    onChange={handleChange("customer")}
                    name="poNumber"
                    type="text"
                    placeholder="PO number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Invoice number</FormLabel>
                  <Input
                    value={coc.customer.invoiceNumber}
                    onChange={handleChange("customer")}
                    name="invoiceNumber"
                    type="text"
                    placeholder="Invoice number"
                  />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel>Forwarder</FormLabel>
                  <Input
                    value={coc.customer.forwarder}
                    onChange={handleChange("customer")}
                    name="forwarder"
                    type="text"
                    placeholder="Forwarder"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Tracking number</FormLabel>
                  <Input
                    value={coc.customer.trackingNumber}
                    onChange={handleChange("customer")}
                    name="trackingNumber"
                    type="text"
                    placeholder="Tracking number"
                  />
                </FormControl>
              </HStack>
            </Stack>
          </Box>
        </HStack>
        <HStack mt={4} alignItems="stretch">
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Weight / Dimension
            </Heading>
            <FormControl>
              <Input
                value={coc.weightAndDimension}
                name="weightAndDimension"
                onChange={(e) =>
                  setCoC((prev) => ({
                    ...prev,
                    weightAndDimension: e.target.value,
                  }))
                }
                type="text"
                placeholder="Weight / Dimension"
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              Number of boxes
            </Heading>
            <FormControl>
              <Input
                value={coc.numberOfBoxes}
                onChange={(e) =>
                  setCoC((prev) => ({ ...prev, numberOfBoxes: e.target.value }))
                }
                name="numberOfBoxes"
                type="text"
                placeholder="Number of boxes"
              />
            </FormControl>
          </Box>
        </HStack>
        <Box mt={4}>
          <Heading size="lg" mb={4}>
            Items
          </Heading>
          <Stack spacing={4}>
            {coc.items.map((item) => (
              <HStack key={item.id} alignItems="flex-end">
                <FormControl flex={1}>
                  <FormLabel>Qty</FormLabel>
                  <Input
                    type="number"
                    name="qty"
                    value={item.qty}
                    onChange={handleItemChange(item.id)}
                    placeholder="Qty"
                  />
                </FormControl>
                <FormControl flex={8}>
                  <FormLabel>Part & Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    onChange={handleItemChange(item.id)}
                    value={item.description}
                    placeholder="Part & Description"
                  />
                </FormControl>
                <FormControl flex={2}>
                  <FormLabel>Lot Number</FormLabel>
                  <Input
                    name="lotNumber"
                    type="text"
                    onChange={handleItemChange(item.id)}
                    value={item.lotNumber}
                    placeholder="Lot number"
                  />
                </FormControl>
                <FormControl flex={2}>
                  <FormLabel>Shelf life</FormLabel>
                  <Input
                    value={item.shelfLife}
                    onChange={handleItemChange(item.id)}
                    name="shelfLife"
                    type="text"
                    placeholder="Shelf life"
                  />
                </FormControl>
                <FormControl flex={2}>
                  <FormLabel>Country of origin</FormLabel>
                  <Input
                    value={item.origin}
                    onChange={handleItemChange(item.id)}
                    name="origin"
                    type="text"
                    placeholder="Country of origin"
                  />
                </FormControl>

                <Button onClick={deleteItem(item.id)} colorScheme="red">
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

export default CoCForm;
