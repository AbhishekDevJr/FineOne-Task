import React, { ReactNode } from 'react';
import { Button, Box, Typography } from '@mui/material';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false };

    //Lifecycle Method that runs whenever an Error occurs down it's component tree.
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    //Lifecycle Method that catches & logs the Error.
    componentDidCatch(error: unknown, info: unknown) {
        console.error("ErrorBoundary caught an error", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Oops! Something went wrong.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Abhishek has been notified and he will be working on a fix.
                    </Typography>
                    <Box sx={{ marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => (window.location.href = '/')}
                            sx={{ marginRight: '10px' }}
                        >
                            Back to Home
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => (window.location.reload())}
                        >
                            Try Again
                        </Button>
                    </Box>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
