import './App.css';

import {
  Stack,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { useState } from 'react';

function ItunesResult({ props }) {
  return (
    <Table variant="simple">
      <TableCaption>Itunes music</TableCaption>
      <Thead>
        <Tr>
          <Th>Artist Name</Th>
          <Th>Track Name</Th>
          <Th>Genre Name</Th>
        </Tr>
      </Thead>
      <Tbody>
          {props.map((val, index) =>
            <Tr key={index}>
              <Td>{val.artistName}</Td>
              <Td>{val.trackCensoredName}</Td>
              <Td>{val.primaryGenreName}</Td>
              </Tr>
          )}
      </Tbody>
    </Table>
  );
}
function Itunes() {
  const [searchTerm, setSetchTerm] = useState('');
  const [results, setResults] = useState([]);
  const handleChange = (event) => setSetchTerm(event.target.value);
  const getTerms = async () => {
    const result = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=musicVideo`);
    const data = await result.json();
    setResults(data.results);
  };

  return (
    <Stack direction="column">
      <Stack direction="row">
        <Input value={searchTerm} onChange={handleChange} />
        <Button colorScheme="blue" onClick={getTerms}>Search</Button>
      </Stack>
      <ItunesResult props={results} />
    </Stack>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Itunes />
      </header>
    </div>

  );
}

export default App;
