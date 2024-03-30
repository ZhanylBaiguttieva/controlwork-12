import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectArtCreating } from '../artsSlice.ts';
import { ArtMutation } from '../../../types';
import { Grid, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
interface Props {
  onSubmit: (mutation: ArtMutation) => void;
}
const ArtForm:React.FC<Props> = ({onSubmit}) => {
  const isCreating = useAppSelector(selectArtCreating);
  const [state, setState] = useState<ArtMutation>({
    name: '',
    photo: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };


  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name" label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Photo"
            name="photo"
            onChange={fileInputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <LoadingButton type="submit" color="primary" variant="contained" loading={isCreating}>Create
            photo</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtForm;