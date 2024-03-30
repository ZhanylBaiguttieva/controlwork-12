import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useEffect } from 'react';
import { selectArts } from '../artsSlice.ts';
import { fetchArts } from '../artsThunk.ts';
import { Grid, Typography } from '@mui/material';
import ArtPiece from './ArtPiece.tsx';

const Gallery = () => {
  const dispatch = useAppDispatch();
  const arts  = useAppSelector(selectArts);

  useEffect(() => {
    dispatch(fetchArts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          <strong>
            Photo Gallery:
          </strong>
        </Typography>
      </Grid>
      <Grid item container justifyContent="flex-start" alignItems="flex-start" direction="row">
        {arts.map((art) => (
          <ArtPiece
            key={art._id}
            art={art}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Gallery;