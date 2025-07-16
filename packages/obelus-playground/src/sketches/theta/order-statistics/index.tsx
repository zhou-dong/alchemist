// OrderStatisticsPage.tsx
import { Box, Typography, Container } from '@mui/material';

export default function OrderStatisticsPage() {
    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" gutterBottom>
                📈 Order Statistics
            </Typography>
            <Typography variant="body1">
                Welcome to the next step in your journey through the math behind Theta Sketch!
            </Typography>
        </Container>
    );
}