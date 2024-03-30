import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import { Art } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { selectDeletingArt } from '../artsSlice.ts';
import { useNavigate } from 'react-router-dom';
import { deleteArt, fetchArtsByUser } from '../artsThunk.ts';
import { apiURL } from '../../../constants.ts';
import { LoadingButton } from '@mui/lab';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  art: Art;
}
const ArtPieceByUser: React.FC<Props> = ({art}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectDeletingArt);
  const navigate = useNavigate();

  const removeArt = async() => {
    await dispatch(deleteArt(art._id));
    await dispatch(fetchArtsByUser(art.user._id));
    navigate('/');
  };

  let cardImage;
  if (art.photo) {
    cardImage = apiURL + '/' + art.photo;
  }
  return (
    <Grid item sm md={6} lg={4} m={1}>
      <Card sx={{ maxWidth: 345}}>
        <ImageCardMedia image={cardImage}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {art.name}
          </Typography>
        </CardContent>
        <CardActions>
          {user?.role === 'admin' &&  (
            <Grid item>
              <LoadingButton
                color="primary"
                onClick={removeArt}
                loading={isDeleting}
                disabled={isDeleting}
              >
                Delete
              </LoadingButton>
            </Grid>
          )}
          {user?.role === 'user' && user?._id === art.user?._id && (
            <Grid item>
              <LoadingButton
                color="primary"
                onClick={removeArt}
                loading={isDeleting}
                disabled={isDeleting}
              >
                Delete
              </LoadingButton>
            </Grid>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtPieceByUser;