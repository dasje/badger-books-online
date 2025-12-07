import { Lock, LockOpen, TextFields } from "@mui/icons-material";
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
          </Select>
        </FormControl>
      </Box>
      {showCurrentSection()}
    </>
  );
}
