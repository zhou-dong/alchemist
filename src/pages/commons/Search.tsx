import * as React from 'react';
import { useGames } from "../../games/commons/GamesContext";
import TextField from '@mui/material/TextField';
import { Autocomplete, Avatar, Box, InputAdornment, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Main = () => {
    const { games } = useGames();
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <Autocomplete
            autoHighlight
            options={games}
            getOptionLabel={(option) => option.name}
            sx={{

            }}
            renderInput={(params) =>
                <Box
                    {...params}
                    // sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        {...params}
                        label="Search..."
                        variant="outlined"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        sx={{
                            transition: 'width 0.3s ease',
                            width: isFocused ? '300px' : '150px', // Adjust widths as needed\
                            // border: "1px solid #000",
                            borderRadius: "3%",
                            // borderColor: "lightgray",
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: "none",
                                },
                            },
                        }}
                    />
                </Box>

            }
            renderOption={(props, option) => (
                <ListItem
                    {...props}
                >
                    <ListItemAvatar>
                        <Avatar src={option.img} />
                    </ListItemAvatar>
                    <ListItemText primary={option.name} />
                </ListItem>
            )}
        />
    );
}

export default Main;
