import {
    Stack,
    Input,
    Button,
    Spinner,
    Container,
} from "@chakra-ui/react"
import { useState } from 'react';
import { ItunesResult } from "../ItunesResault/ItunesResult";

export function Itunes() {
    const [searchTerm, setSetchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleChange = (event) => setSetchTerm(event.target.value);

    const getTerms = async () => {
        setLoading(true);
        const result = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=musicVideo`);
        const data = await result.json();
        setResults(data.results);
        setLoading(false);
    };

    return (
        <Stack direction="column" style={{width: '80%'}}>
            <Stack direction="row" pb={5}>
                <Input value={searchTerm} onChange={handleChange} />
                <Button colorScheme="blue" onClick={getTerms}>Search track name</Button>
            </Stack>
            {isLoading &&
                <div>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </div>}
            {!isLoading &&
                <ItunesResult props={results} />
            }
        </Stack>    );
}
