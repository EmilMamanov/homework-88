import React from 'react';
import { Button, TextField, Grid } from '@mui/material';

interface CommentFormProps {
    commentText: string;
    setCommentText: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ commentText, setCommentText, onSubmit }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        value={commentText}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Add Comment
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CommentForm;
