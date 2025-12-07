import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  insertImages,
  type RichTextEditorRef,
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import { createBlogPost } from "../db/funcs/createBlogPost";
import { uploadFileToBucket } from "../db/funcs/uploadFileToBucket";
import useExtensions from "./useExtensions";

const exampleContent = "";

function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.

  return Array.from(fileList).filter((file) => {
    console.log("Filtering file:", file);
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

export default function Editor() {
  console.log("📌 Editor component rendered");

  const extensions = useExtensions({
    placeholder: "Add your content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogDescription, setBlogDescription] = useState<string>("");
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleNewImageFiles = useCallback(
    async (files: File[], insertPosition?: number) => {
      if (!rteRef.current?.editor) return;

      const file = files[0];

      try {
        // 1️⃣ Upload first
        const publicUrl = await uploadFileToBucket(file);

        // 2️⃣ Then insert image
        insertImages({
          images: [
            {
              src: publicUrl,
              alt: file.name,
            },
          ],
          editor: rteRef.current.editor,
          position: insertPosition,
        });
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    },
    [],
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback(
      (view, event, _slice, _moved) => {
        console.log("🔥 Drop event fired", event);
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);

          event.preventDefault();
          return true; // ← MUST RETURN TRUE
        }
        return false;
      },
      [handleNewImageFiles],
    );

  // Allow for pasting images
  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files,
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);

          return true; // ← MUST RETURN TRUE
        }
        return false;
      },
      [handleNewImageFiles],
    );

  const [submittedContent, setSubmittedContent] = useState("");

  const handleSave = () => {
    // Handle events on "save" button click.
    // Verify that all fields are filled correctly.
    setLoading(true);
    const htmlContent = rteRef.current?.editor?.getHTML() ?? "";
    setSubmittedContent(htmlContent);
    createBlogPost(
      blogTitle,
      htmlContent,
      mainImageUrl,
      blogDescription,
    ).finally(() => setLoading(false));
  };

  useEffect(() => {
    window.addEventListener("drop", (e) => console.log("WINDOW DROP", e));
    window.addEventListener("paste", (e) => console.log("WINDOW PASTE", e));
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        {!loading ? (
          <>
            <Container
              maxWidth="lg"
              component="main"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginBottom: "20px",
              }}
            >
              <TextField
                required
                id="blog-title"
                label="Blog Title"
                defaultValue="..."
                variant="standard"
                onChange={(e) => setBlogTitle(e.target.value)}
              />
              <TextField
                required
                id="blog-description"
                label="Description/Byline"
                defaultValue="..."
                variant="standard"
                onChange={(e) => setBlogDescription(e.target.value)}
              />
              <Button variant="contained" component="label">
                {mainImageUrl.length === 0
                  ? "Upload Blog Cover Image File"
                  : mainImageUrl}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={async (e) => {
                    e.preventDefault();
                    if (e.target.files && e.target.files[0]) {
                      const publicUrl = await uploadFileToBucket(
                        e.target.files[0],
                      );
                      setMainImageUrl(publicUrl);
                    }
                  }}
                />
              </Button>
              {/* <TextField
                required
                id="main-image-url"
                label="Image URL"
                defaultValue="..."
                variant="standard"
                onChange={(e) => setMainImageUrl(e.target.value)}
              /> */}
            </Container>
            <RichTextEditor
              ref={rteRef}
              extensions={extensions}
              content={exampleContent}
              editable={isEditable}
              editorProps={{
                handleDrop: handleDrop,
                handlePaste: handlePaste,
              }}
              renderControls={() => (
                <EditorMenuControls handleNewImageFiles={handleNewImageFiles} />
              )}
              RichTextFieldProps={{
                // The "outlined" variant is the default (shown here only as
                // example), but can be changed to "standard" to remove the outlined
                // field border from the editor
                variant: "outlined",
                MenuBarProps: {
                  hide: !showMenuBar,
                },
                // Below is an example of adding a toggle within the outlined field
                // for showing/hiding the editor menu bar, and a "submit" button for
                // saving/viewing the HTML content
                footer: (
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      borderTopStyle: "solid",
                      borderTopWidth: 1,
                      borderTopColor: (theme) => theme.palette.divider,
                      py: 1,
                      px: 1.5,
                    }}
                  >
                    <MenuButton
                      value="formatting"
                      tooltipLabel={
                        showMenuBar ? "Hide formatting" : "Show formatting"
                      }
                      size="small"
                      onClick={() =>
                        setShowMenuBar((currentState) => !currentState)
                      }
                      selected={showMenuBar}
                      IconComponent={TextFields}
                    />

                    <MenuButton
                      value="formatting"
                      tooltipLabel={
                        isEditable
                          ? "Prevent edits (use read-only mode)"
                          : "Allow edits"
                      }
                      size="small"
                      onClick={() =>
                        setIsEditable((currentState) => !currentState)
                      }
                      selected={!isEditable}
                      IconComponent={isEditable ? Lock : LockOpen}
                    />

                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleSave();
                      }}
                    >
                      Save
                    </Button>
                  </Stack>
                ),
              }}
              sx={{
                // An example of how editor styles can be overridden. In this case,
                // setting where the scroll anchors to when jumping to headings. The
                // scroll margin isn't built in since it will likely vary depending on
                // where the editor itself is rendered (e.g. if there's a sticky nav
                // bar on your site).
                "& .ProseMirror": {
                  "& h1, & h2, & h3, & h4, & h5, & h6": {
                    scrollMarginTop: showMenuBar ? 50 : 0,
                  },
                },
              }}
            >
              {() => (
                <>
                  <LinkBubbleMenu />
                  <TableBubbleMenu />
                </>
              )}
            </RichTextEditor>

            {submittedContent ? (
              <>
                {/* <pre style={{ marginTop: 10, overflow: "auto", maxWidth: "100%" }}>
            <code>{submittedContent}</code>
          </pre> */}

                <Box mt={3}>
                  <Typography variant="overline" sx={{ mb: 2 }}>
                    Read-only saved snapshot:
                  </Typography>

                  <RichTextReadOnly
                    content={submittedContent}
                    extensions={extensions}
                  />
                </Box>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </>
  );
}
