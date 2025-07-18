import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <TextField
      placeholder="Search..."
      variant="outlined"
      size="small"
      sx={{
    minWidth: 250,  
    flex: 1, 
    maxWidth: 700,
    px: 2,                      // total height of the input box
    '& .MuiOutlinedInput-root': {       // the wrapper inside the input
      height: 40,
      fontSize: '14px',
    },
    '& input': {                         // the actual input text area
      padding: '10px 12px',
    },
    '& .MuiSvgIcon-root': {             // search icon
      fontSize: 20,
    },
  }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
