
import { useAppDispatch } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { createArt } from '../artsThunk.ts';
import { ArtMutation } from '../../../types';
import { Container, Typography } from '@mui/material';
import ArtForm from './ArtForm.tsx';

const NewArt = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (artMutation: ArtMutation) => {
    await dispatch(createArt(artMutation)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h4">New Photo</Typography>
      <ArtForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default NewArt;