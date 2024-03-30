import ToolBar from './UI/ToolBar.tsx';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Gallery from './features/arts/components/Gallery.tsx';
import ArtByUser from './features/arts/components/ArtByUser.tsx';
import NewArt from './features/arts/components/NewArt.tsx';
import OneArt from './features/arts/components/OneArt.tsx';


function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <ToolBar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Gallery />}></Route>
            <Route path="/users/:id" element={<ArtByUser/>}></Route>
            <Route path="/arts/new" element={<NewArt/>}></Route>
            <Route path="/arts/:id" element={<OneArt/>}></Route>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
