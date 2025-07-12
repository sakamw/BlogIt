import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const DRAFT_KEY = "blogit-draft";

const DraftsPage = () => {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<null | {
    title: string;
    synopsis: string;
    content: string;
  }>(null);

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      setDraft(JSON.parse(saved));
    }
  }, []);

  const handleContinue = () => {
    navigate("/blogs/create");
  };

  const handleDelete = () => {
    localStorage.removeItem(DRAFT_KEY);
    setDraft(null);
  };

  return (
    <Box maxWidth={700} mx="auto" mt={6}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Drafts
      </Typography>
      {draft ? (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={1}>
            {draft.title || "(No Title)"}
          </Typography>
          <Typography color="text.secondary" mb={2}>
            {draft.synopsis || "(No Synopsis)"}
          </Typography>
          <Typography mb={2}>
            {draft.content.slice(0, 200) || "(No Content)"}
            {draft.content.length > 200 ? "..." : ""}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleContinue}>
              Continue Editing
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete Draft
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Typography color="text.secondary">No drafts found.</Typography>
      )}
    </Box>
  );
};

export default DraftsPage;
