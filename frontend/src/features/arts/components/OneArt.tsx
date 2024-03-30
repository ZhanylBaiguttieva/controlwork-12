import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchOneArt } from '../artsThunk.ts';
import { selectOneArt } from '../artsSlice.ts';
import { Card, CardContent, CardMedia, styled, Typography } from '@mui/material';
import { apiURL } from '../../../constants.ts';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
const OneArt = () => {

  const dispatch = useAppDispatch();
  const artOne = useAppSelector(selectOneArt);
  const {id} = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchOneArt(id));
  }, [dispatch, id]);

  let cardImage;
  if (artOne?.photo) {
    cardImage = apiURL + '/' + artOne?.photo;
  }
  return (
    <Card sx={{ maxWidth: 345}}>
      <ImageCardMedia image={cardImage}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {artOne?.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {artOne?.user.displayName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OneArt;