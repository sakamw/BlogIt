import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search posts",
}) => {
  const [input, setInput] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) onSearch(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        background: "background.default",
        borderRadius: 3,
        px: 2,
        py: 0.5,
        width: { xs: 100, sm: 160, md: 320, lg: 500 },
        maxWidth: { xs: 120, sm: 200, md: 400, lg: 600 },
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <SearchIcon
        sx={{
          color: "text.secondary",
          mr: 1,
          fontSize: { xs: 18, sm: 20, md: 22 },
        }}
      />
      <InputBase
        placeholder={placeholder}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        sx={{
          flex: 1,
          fontSize: { xs: 14, sm: 15, md: 16 },
          color: "text.primary",
          minWidth: 0,
        }}
        inputProps={{ "aria-label": placeholder }}
      />
    </Box>
  );
};

export default SearchBar;
