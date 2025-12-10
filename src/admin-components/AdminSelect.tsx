import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import EditMarkets from "./EditMarkets";
import Editor from "./Editor";
import EditWorkshops from "./EditWorkshops";

export default function AdminSelect() {
  const [currentSiteSection, setCurrentSiteSection] = useState<string>("");

  const handleSectionChange = (event: SelectChangeEvent) => {
    setCurrentSiteSection(event.target.value as string);
  };

  const showCurrentSection = () => {
    if (currentSiteSection === "markets") {
      return <EditMarkets />;
    } else if (currentSiteSection === "blog") {
      return <Editor />;
    } else if (currentSiteSection === "workshops") {
      return <EditWorkshops />;
    }
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Section</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentSiteSection}
            label="Age"
            onChange={handleSectionChange}
          >
            <MenuItem value={"markets"}>Markets</MenuItem>
            <MenuItem value={"blog"}>New Blog</MenuItem>
            <MenuItem value={"workshops"}>Workshops</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {showCurrentSection()}
    </>
  );
}
