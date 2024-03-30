import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchArtsByUser } from '../artsThunk.ts';
import { useParams } from 'react-router-dom';
import { selectArts } from '../artsSlice.ts';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectOne, selectUser } from '../../users/usersSlice.ts';
import ArtPieceByUser from './ArtPieceByUser.tsx';
import { getUser } from '../../users/usersThunk.ts';


const ArtByUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const {id} = useParams() as {id: string}
  const arts = useAppSelector(selectArts);
  const userOne = useAppSelector(selectOne);

  useEffect(() => {
    dispatch(fetchArtsByUser(id))
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
            Gallery by {userOne?.displayName}
          {user?._id === id && (
            <Grid item>
              <Button color="primary" component={Link} to="/arts/new">
                Add new photo
              </Button>
            </Grid>
          )}
        </Typography>
      </Grid>
      <Grid item container justifyContent="flex-start" alignItems="flex-start" direction="row">
        {arts.map((art) => (
          <ArtPieceByUser
            key={art._id}
            art={art}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ArtByUser;