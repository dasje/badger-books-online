import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { deleteEntry } from "../db/funcs/deleteEntry";
import { createEntry } from "../db/funcs/createEntry";
import { fetchAll } from "../db/funcs/fetchAll";
import { updateRow } from "../db/funcs/updateRow";
import { uploadFileToBucket } from "../db/funcs/uploadFileToBucket";
import { ItemType } from "../db/types/ItemType";

export default function EditShopItems() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [itemId, setItemId] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemCurrency, setItemCurrency] = useState("");
  const [itemImage, setItemImage] = useState("");

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>();

  const itemFetch = async () => {
    await fetchAll("products").then((data) => {
      setItems(data as ItemType[]);
    });
  };

  const updateInputItem = async () => {
    if (itemId && itemId !== "") {
      await updateRow("products", itemId, {
        title: itemTitle,
        description: itemDescription,
        price: itemPrice,
        currency: itemCurrency,
        image_url: itemImage,
      }).then(() => {
        itemFetch();
      });
    } else if (!itemId || itemId === "") {
      createEntry("products", {
        title: itemTitle,
        description: itemDescription,
        price: itemPrice,
        currency: itemCurrency,
        image_url: itemImage,
      }).then(() => {
        itemFetch();
      });
    }
  };

  const deleteSelectedItem = async () => {
    if (itemId !== "") {
      await deleteEntry(itemId, "products").then(async () => {
        await itemFetch().then(() => {
          setItemId("");
          setItemTitle("");
          setItemDescription("");
          setItemPrice(0);
          setItemCurrency("");
          setItemImage("");
          setSelectionModel({
            type: "include",
            ids: new Set<string>(),
          } as GridRowSelectionModel);
        });
      });
    }
  };

  useEffect(() => {
    itemFetch();
  }, []);

  useEffect(() => {
    if (!selectionModel) return;

    const id = selectionModel.ids.values().next().value;
    const w = items.find((item) => item.id === id);

    if (!w) return;

    setItemId(id ? id.toString() : "");
    setItemTitle(w.title || "");
    setItemDescription(w.description || "");
    setItemPrice(w.price || 0);
    setItemCurrency(w.currency || "");
    setItemImage(w.image_url || "");
  }, [selectionModel]);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 100 },
    { field: "description", headerName: "Description", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "currency", headerName: "Currency", width: 100 },
    { field: "main_img", headerName: "Image", width: 150 },
  ];
  const rows = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    currency: item.currency,
    main_img: item.image_url,
  }));
  const paginationModel = { pageSize: 5, page: 0 };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ mb: 4, gap: 2, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h2" gutterBottom component={"div"}>
          Edit Product
        </Typography>
        <InputLabel htmlFor="workshop-title" sx={{ color: "black" }}>
          Product Title
        </InputLabel>
        <TextField
          id="workshop-title"
          variant="outlined"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
        />

        <InputLabel htmlFor="item-cost" sx={{ color: "black" }}>
          Product Cost
        </InputLabel>
        <TextField
          id="item-cost"
          variant="outlined"
          value={String(itemPrice)}
          onChange={(e) => setItemPrice(Number(e.target.value))}
        />
        <InputLabel htmlFor="item-description" sx={{ color: "black" }}>
          Product Description
        </InputLabel>
        <TextField
          id="item-description"
          variant="outlined"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <InputLabel htmlFor="item-currency" sx={{ color: "black" }}>
          Product Currency
        </InputLabel>
        <TextField
          id="item-currency"
          variant="outlined"
          value={itemCurrency}
          onChange={(e) => setItemCurrency(e.target.value)}
        />
        <InputLabel htmlFor="workshop-image" sx={{ color: "black" }}>
          Workshop Image
        </InputLabel>

        <Button variant="contained" component="label">
          {itemImage.length === 0 ? "Upload Image File For Product" : itemImage}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={async (e) => {
              e.preventDefault();
              if (e.target.files && e.target.files[0]) {
                const publicUrl = await uploadFileToBucket(e.target.files[0]);
                setItemImage(publicUrl);
              }
            }}
          />
        </Button>

        <Box sx={{ height: 20 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setItemTitle("");
              setItemPrice(0);
              setItemDescription("");
              setItemCurrency("");
              setItemImage("");
            }}
          >
            Clear fields to enter new workshop
          </Button>
          <Button variant="contained" sx={{ ml: 2 }} onClick={updateInputItem}>
            Save Product
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            color="warning"
            onClick={deleteSelectedItem}
          >
            Delete Selected Product
          </Button>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom component={"div"}>
          Select Product to Edit
        </Typography>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableMultipleRowSelection
            sx={{ border: 0 }}
            onRowSelectionModelChange={(newSelection) =>
              setSelectionModel(newSelection)
            }
          />
        </Paper>
      </Container>
    </>
  );
}
