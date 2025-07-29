import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNotes } from '../context/NoteContext';

const Search = () => {

  const { searchQuery, setSearchQuery } = useNotes();

  return (
    <TextField
      placeholder="Search..."
      variant="outlined"
      size="small"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{
        fontSize: '24px',
        fontWeight: 'bold',
        minWidth: 250,
        flex: 1,
        maxWidth: 700,
        px: 2,
        '& .MuiOutlinedInput-root': {
          height: 40,
          fontSize: '14px',
          '&.Mui-focused fieldset': {
            borderColor: '#d97706',
          },
        },
        '& input': {
          padding: '10px 12px',
        },
        '& .MuiSvgIcon-root': {
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
