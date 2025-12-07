import { useEffect, useState } from "react";
import { fetchMarkets } from "../db/funcs/fetchMarkets";
import {
  Box,
  Button,
  Container,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { updateMarket } from "../db/funcs/updateMarket";
import { createMarkets } from "../db/funcs/createMarkets";
import { deleteMarket } from "../db/funcs/deleteMarket";
import { MarketType } from "../db/types/MarketTypes";

export default function EditMarkets() {
  const [markets, setMarkets] = useState<MarketType[]>([]);
  const [marketId, setMarketId] = useState("");
  const [marketName, setMarketName] = useState("");
  const [marketDates, setMarketDates] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>();

  const marketFetch = async () => {
    await fetchMarkets().then((data) => {
      setMarkets(data as MarketType[]);
    });
  };

  const updateInputMarket = async () => {
    if (marketId && marketId !== "") {
      await updateMarket(marketId, marketName, marketDates, "", "").then(() => {
        marketFetch();
      });
    } else if (!marketId || marketId === "") {
      createMarkets(marketName, marketDates, "", "").then(() => {
        marketFetch();
      });
    }
  };

  const deleteSelectedMarket = async () => {
    if (marketId !== "") {
      await deleteMarket(marketId).then(async () => {
        await marketFetch().then(() => {
          setMarketId("");
          setMarketName("");
          setMarketDates("");
          setSelectionModel({
            type: "include",
            ids: new Set<string>(),
          } as GridRowSelectionModel);
        });
      });
    }
  };

  useEffect(() => {
    marketFetch();
  }, []);

  useEffect(() => {
    var iterator = selectionModel?.ids.values();
    const id = iterator ? iterator.next().value : "";
    setMarketId(id as string);
    setMarketName(
      markets.find((market) => market.id === (id as string))?.market || "",
    );
    setMarketDates(
      markets.find((market) => market.id === (id as string))?.dates || "",
    );
  }, [selectionModel, markets]);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "marketName", headerName: "Market name", width: 300 },
    { field: "marketDates", headerName: "Market dates", width: 300 },
  ];
  const rows = markets.map((market) => ({
    id: market.id,
    marketName: market.market,
    marketDates: market.dates,
  }));
  const paginationModel = { pageSize: 5, page: 0 };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{ mb: 4, gap: 2, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h2" gutterBottom>
          Edit Market
        </Typography>
        <InputLabel htmlFor="market-name" sx={{ color: "black" }}>
          Market Name
        </InputLabel>
        <TextField
          id="market-name"
          variant="outlined"
          value={marketName}
          onChange={(e) => setMarketName(e.target.value)}
        />
        <InputLabel htmlFor="market-dates" sx={{ color: "black" }}>
          Market Dates
        </InputLabel>
        <TextField
          id="market-dates"
          variant="outlined"
          value={marketDates}
          onChange={(e) => setMarketDates(e.target.value)}
        />
        <Box sx={{ height: 20 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setMarketDates("");
              setMarketName("");
              setMarketId("");
            }}
          >
            Clear fields to enter new market
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={updateInputMarket}
          >
            Save Market
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            color="warning"
            onClick={deleteSelectedMarket}
          >
            Delete Selected Market
          </Button>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Select Market to Edit
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
