import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { green } from '@mui/material/colors';
import { Content } from './Contents';

interface Props {
    statmentIndex: number;
    statements: Content[];
}

const DisplayContent: React.FC<{
    index: number,
    isVisible: boolean,
    statement: Content
}> = ({
    index,
    isVisible,
    statement
}) => (
        <Box
            key={index}
            sx={{
                transition: 'transform 1s ease, opacity 1s ease-in',
                transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
                opacity: isVisible ? 1 : 0,
                padding: "2px 6px",
                borderRadius: "4px",
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                my={2}
            >
                <Avatar
                    sx={{
                        backgroundColor: index % 2 === 0 ? green[400] : "#fff",
                        marginRight: 2,
                        color: index % 2 === 0 ? "#fff" : green[600],
                        border: "1px solid " + green[400],
                    }}>
                    {statement.icon}
                </Avatar>
                <Box flexGrow={1}>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        {statement.title}
                    </Typography>
                    {statement.content}
                </Box>
            </Box>
        </Box>
    );

const Main = ({ statmentIndex, statements }: Props) => (
    <Box>
        {statements.map((statement, index) => (
            <DisplayContent
                index={index}
                isVisible={statmentIndex >= index}
                statement={statement}
            />
        ))}
    </Box>
);

export default Main;
