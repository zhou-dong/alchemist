import * as React from 'react';
import { useGames } from "../../games/commons/GamesContext";
import TextField from '@mui/material/TextField';
import { Autocomplete, Avatar, Box, ListItem, ListItemAvatar, ListItemText, Paper, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

interface CustomPaperProps {
    width: string | number;
}

const CustomPaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'width',
})<CustomPaperProps>(({ theme, width }) => ({
    width,
    marginTop: theme.spacing(1),
}));

const Main = () => {

    const navigate = useNavigate();
    const defaultInputWidth = "120px";
    const enabledInputWidth = "300px";

    const { games } = useGames();
    const [inputWidth, setInputWidth] = React.useState<number | string>(defaultInputWidth);

    return (
        <Autocomplete
            PaperComponent={(props) => (
                <CustomPaper {...props} width={inputWidth} />
            )}
            autoHighlight
            options={games}
            getOptionLabel={(option) => option.name}
            sx={{
                '& .MuiSvgIcon-root': {
                    color: '#fff', // Change icon color
                },
            }}
            renderInput={(params) =>
                <Box
                    {...params}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center",
                    }}
                >
                    <SearchIcon />
                    <TextField
                        {...params}
                        label="Search..."
                        variant="outlined"
                        onFocus={() => {
                            setInputWidth(enabledInputWidth);
                        }}
                        onBlur={() => {
                            setInputWidth(defaultInputWidth);
                        }}
                        sx={{
                            transition: 'width 0.3s ease',
                            width: inputWidth,
                            borderRadius: "3%",
                            borderColor: "lightgray",
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: "none",
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff', // Change text color
                                fontWeight: 300
                            },
                            '& .MuiInputLabel-root': {
                                color: '#fff', // Change label color
                            },
                        }}
                    />
                </Box>

            }
            renderOption={(props, option) => (
                <ListItem
                    {...props}
                    onClick={() => navigate(option.path)}
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
