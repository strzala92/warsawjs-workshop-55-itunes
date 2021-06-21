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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  useDisclosure,
  Badge
} from "@chakra-ui/react"
import { useState, useEffect } from 'react';

function ModalItunes({ result }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ artist, setArtist ] = useState();

  useEffect(() => {
    if (!isOpen) {
     return;
    }
    (async () => {
      const artisResult= await fetch(`https://itunes.apple.com/lookup?id=${result.artistId}`);
      const data = await artisResult.json();
      setArtist(data.results[0]);
    })();
  }, [isOpen, result]);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>Preview</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{result.trackName}</ModalHeader>
          <ModalBody>
            {artist && (
                  <Badge>
                        {artist.primaryGenreName}
                  </Badge>
            )}
            <AspectRatio ratio={1}>
              <iframe
                title={result.trackName}
                src={result.previewUrl}
                allowFullScreen
              />
            </AspectRatio>
          </ModalBody>

          <ModalFooter style={{ justifyContent: 'center' }}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function Itunes() {
  const [searchTerm, setSetchTerm] = useState('');
  const [results, setResults] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

function ItunesResult({ props }) {
  return (
    <Table variant="simple">
      <TableCaption>Itunes music</TableCaption>
      <Thead>
        <Tr>
          <Th>Artist Name</Th>
          <Th>Track Name</Th>
          <Th>Genre Name</Th>
          <Th>Genre Name</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.map((val, index) =>
          <Tr key={index}>
            <Td>{val.artistName}</Td>
            <Td>{val.trackCensoredName}</Td>
            <Td>{val.primaryGenreName}</Td>
            <Td>
              <ModalItunes result={val} />
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
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
