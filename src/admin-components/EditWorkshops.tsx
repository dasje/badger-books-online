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
import { WorkshopType } from "../db/types/WorkshopTypes";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs, { Dayjs } from "dayjs";
import { Image } from "@mui/icons-material";
import { uploadFileToBucket } from "../db/funcs/uploadFileToBucket";

export default function EditWorkshops() {
  const [workshops, setWorkshops] = useState<WorkshopType[]>([]);
  const [workshopId, setWorkshopId] = useState("");
  const [workshopTitle, setWorkshopTitle] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [workshopLocation, setWorkshopLocation] = useState("");
  const [workshopCost, setWorkshopCost] = useState<number>(0);
  const [workshopDescription, setWorkshopDescription] = useState("");
  const [mainImgAddress, setMainImgAddress] = useState("");
  const [fromDate, setFromDate] = useState<Dayjs | null>(
    dayjs(new Date().getTime()),
  );
  const [toDate, setToDate] = useState<Dayjs | null>(
    dayjs(new Date().getTime()),
  );
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>();

  const workshopFetch = async () => {
    await fetchAll("workshops").then((data) => {
      setWorkshops(data as WorkshopType[]);
    });
  };

  const updateInputWorkshop = async () => {
    if (workshopId && workshopId !== "") {
      await updateRow("workshops", workshopId, {
        type: workshopType,
        location: workshopLocation,
        date_from: fromDate ? dayjs(fromDate) : null,
        date_to: toDate ? dayjs(toDate) : null,
        cost: Number(workshopCost),
        title: workshopTitle,
        description: workshopDescription,
        main_img: mainImgAddress,
      }).then(() => {
        workshopFetch();
      });
    } else if (!workshopId || workshopId === "") {
      createEntry("workshops", {
        type: workshopType,
        location: workshopLocation,
        date_from: fromDate ? dayjs(fromDate) : null,
        date_to: toDate ? dayjs(toDate) : dayjs(fromDate),
        cost: Number(workshopCost),
        title: workshopTitle,
        description: workshopDescription,
        main_img: mainImgAddress,
      }).then(() => {
        workshopFetch();
      });
    }
  };

  const deleteSelectedWorkshop = async () => {
    if (workshopId !== "") {
      await deleteEntry(workshopId, "workshops").then(async () => {
        await workshopFetch().then(() => {
          setWorkshopId("");
          setWorkshopTitle("");
          setFromDate(dayjs(new Date().getTime()));
          setToDate(dayjs(new Date().getTime()));
          setWorkshopCost(0);
          setWorkshopType("");
          setWorkshopDescription("");
          setWorkshopLocation("");
          setMainImgAddress("");
          setSelectionModel({
            type: "include",
            ids: new Set<string>(),
          } as GridRowSelectionModel);
        });
      });
    }
  };

  useEffect(() => {
    workshopFetch();
  }, []);

  useEffect(() => {
    if (!selectionModel) return;

    const id = selectionModel.ids.values().next().value;
    const w = workshops.find((workshop) => workshop.id === id);

    if (!w) return;

    setWorkshopId(id ? id.toString() : "");
    setWorkshopTitle(w.title || "");
    setWorkshopType(w.type || "");
    setWorkshopLocation(w.location || "");
    setWorkshopCost(w.cost || 0);
    setWorkshopDescription(w.description || "");
    setFromDate(w.date_from ? dayjs(w.date_from) : null);
    setToDate(w.date_to ? dayjs(w.date_to) : null);
    setMainImgAddress(w.main_img || "");
  }, [selectionModel]);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "date_from", headerName: "Date From", width: 100 },
    { field: "date_to", headerName: "Date To", width: 100 },
    { field: "location", headerName: "Location", width: 100 },
    { field: "cost", headerName: "Cost", width: 50 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "main_img", headerName: "Image", width: 150 },
  ];
  const rows = workshops.map((workshop) => ({
    id: workshop.id,
    type: workshop.type,
    date_from: dayjs(workshop.date_from).format("DD-MM-YYYY"),
    date_to: dayjs(workshop.date_to).format("DD-MM-YYYY"),
    title: workshop.title,
    description: workshop.description,
    cost: workshop.cost,
    location: workshop.location,
    main_img: workshop.main_img,
  }));
  const paginationModel = { pageSize: 5, page: 0 };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ mb: 4, gap: 2, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h2" gutterBottom>
          Edit Workshop
        </Typography>
        <InputLabel htmlFor="workshop-title" sx={{ color: "black" }}>
          Workshop Title
        </InputLabel>
        <TextField
          id="workshop-title"
          variant="outlined"
          value={workshopTitle}
          onChange={(e) => setWorkshopTitle(e.target.value)}
        />
        <InputLabel htmlFor="workshop-dates" sx={{ color: "black" }}>
          Workshop Dates
        </InputLabel>
        <Container sx={{ display: "flex", gap: 2, p: 0, m: 0 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField", "DateField"]}>
              <DateField
                label="From"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                format="DD-MM-YYYY"
              />
              <DateField
                label="To"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                format="DD-MM-YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Container>
        {/* <TextField
          id="workshop-dates"
          variant="outlined"
          value={workshopDates}
          onChange={(e) => setWorkshopDates(e.target.value)}
        /> */}
        <InputLabel htmlFor="workshop-dates" sx={{ color: "black" }}>
          Workshop Cost
        </InputLabel>
        <TextField
          id="workshop-cost"
          variant="outlined"
          value={String(workshopCost)}
          onChange={(e) => setWorkshopCost(Number(e.target.value))}
        />
        <InputLabel htmlFor="workshop-type" sx={{ color: "black" }}>
          Workshop Type
        </InputLabel>
        <TextField
          id="workshop-type"
          variant="outlined"
          value={workshopType}
          onChange={(e) => setWorkshopType(e.target.value)}
        />
        <InputLabel htmlFor="workshop-location" sx={{ color: "black" }}>
          Workshop Location
        </InputLabel>
        <TextField
          id="workshop-location"
          variant="outlined"
          value={workshopLocation}
          onChange={(e) => setWorkshopLocation(e.target.value)}
        />
        <InputLabel htmlFor="workshop-description" sx={{ color: "black" }}>
          Workshop Description
        </InputLabel>
        <TextField
          id="workshop-description"
          variant="outlined"
          value={workshopDescription}
          onChange={(e) => setWorkshopDescription(e.target.value)}
        />
        <InputLabel htmlFor="workshop-image" sx={{ color: "black" }}>
          Workshop Image
        </InputLabel>

        <Button variant="contained" component="label">
          {mainImgAddress.length === 0
            ? "Upload Image File For Workshop"
            : mainImgAddress}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={async (e) => {
              e.preventDefault();
              if (e.target.files && e.target.files[0]) {
                const publicUrl = await uploadFileToBucket(e.target.files[0]);
                setMainImgAddress(publicUrl);
              }
            }}
          />
        </Button>

        <Box sx={{ height: 20 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setFromDate(dayjs(new Date().getTime()));
              setToDate(dayjs(new Date().getTime()));
              setWorkshopTitle("");
              setWorkshopId("");
              setWorkshopType("");
              setWorkshopLocation("");
              setWorkshopCost(0);
              setWorkshopDescription("");
              setMainImgAddress("");
            }}
          >
            Clear fields to enter new workshop
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={updateInputWorkshop}
          >
            Save Workshop
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            color="warning"
            onClick={deleteSelectedWorkshop}
          >
            Delete Selected Workshop
          </Button>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Select Workshop to Edit
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
