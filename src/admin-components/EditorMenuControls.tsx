import { useRef } from "react";
import { useTheme } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import {
  MenuButtonAddTable,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonHorizontalRule,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonSubscript,
  MenuButtonSuperscript,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontFamily,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  MenuButton,
  isTouchDevice,
} from "mui-tiptap";

interface EditorMenuControlsProps {
  handleNewImageFiles: (
    files: File[],
    insertPosition?: number,
  ) => void | Promise<void>;
}

export default function EditorMenuControls({
  handleNewImageFiles,
}: EditorMenuControlsProps) {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <MenuControlsContainer>
      <MenuSelectFontFamily
        options={[
          { label: "Comic Sans", value: "Comic Sans MS, Comic Sans" },
          { label: "Cursive", value: "cursive" },
          { label: "Monospace", value: "monospace" },
          { label: "Serif", value: "serif" },
        ]}
      />

      <MenuDivider />
      <MenuSelectHeading />
      <MenuDivider />
      <MenuSelectFontSize />
      <MenuDivider />

      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuButtonUnderline />
      <MenuButtonStrikethrough />
      <MenuButtonSubscript />
      <MenuButtonSuperscript />

      <MenuDivider />

      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: "#000000", label: "Black" },
          { value: "#ffffff", label: "White" },
          { value: "#888888", label: "Grey" },
          { value: "#ff0000", label: "Red" },
          { value: "#ff9900", label: "Orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#00d000", label: "Green" },
          { value: "#0000ff", label: "Blue" },
        ]}
      />

      <MenuButtonHighlightColor
        swatchColors={[
          { value: "#595959", label: "Dark grey" },
          { value: "#dddddd", label: "Light grey" },
          { value: "#ffa6a6", label: "Light red" },
          { value: "#ffd699", label: "Light orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#99cc99", label: "Light green" },
          { value: "#90c6ff", label: "Light blue" },
          { value: "#8085e9", label: "Light purple" },
        ]}
      />

      <MenuDivider />

      <MenuButtonEditLink />
      <MenuDivider />
      <MenuSelectTextAlign />
      <MenuDivider />
      <MenuButtonOrderedList />
      <MenuButtonBulletedList />
      <MenuButtonTaskList />

      {isTouchDevice() && (
        <>
          <MenuButtonIndent />
          <MenuButtonUnindent />
        </>
      )}

      <MenuDivider />

      <MenuButtonBlockquote />
      <MenuDivider />
      <MenuButtonCode />
      <MenuButtonCodeBlock />

      <MenuDivider />

      {/* 🟩 CUSTOM IMAGE UPLOAD */}
      <MenuButton
        tooltipLabel="Upload image"
        IconComponent={ImageIcon}
        onClick={() => fileInputRef.current?.click()}
      />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length > 0) {
            handleNewImageFiles(files); // ← YOUR upload logic
          }
        }}
      />

      <MenuDivider />

      <MenuButtonHorizontalRule />
      <MenuButtonAddTable />

      <MenuDivider />

      <MenuButtonRemoveFormatting />

      <MenuDivider />

      <MenuButtonUndo />
      <MenuButtonRedo />
    </MenuControlsContainer>
  );
}
