import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react"
import {ArrowDownIcon, ArrowUpIcon} from "@chakra-ui/icons";
import { ModalItunes } from "../ModalItunes/ModalItunes";
import { useState } from 'react';


export function ItunesResult({ props }) {
  const [sortType, setSortType] = useState(props);
  const [sortASC, setSort] = useState({
    artist: true,
    track: true,
  });
  let fieldName = '';

  const sort = (field) => {
    fieldName = field;
    console.log(sortASC)
    if (sortASC.artist) {
      setSortType([...props.sort(sortingMethod)]);
      setSort({...sortASC, artist: false});
    }
    else {
      setSortType([...props.sort(sortingMethod)]);
      setSort({...sortASC, artist: true});
    }
  }
  const sortingMethod = (a, b) => {
    if (a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) {
      return sortASC.artist ? -1 : 1;
    }
    if (a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) {
      return sortASC.artist ? 1 : -1;
    }
    return 0;
  }

  return (
    <Table variant="simple">
      <TableCaption>Itunes music</TableCaption>
      <Thead>
        <Tr>
          <Th>Artist Name  <Button onClick={() => sort('artistName')} colorScheme="blue" size="xs" variant="outline">
            {sortASC.artist &&
            <ArrowDownIcon></ArrowDownIcon>}
            {!sortASC.artist &&
            <ArrowUpIcon></ArrowUpIcon>}
          </Button></Th>
          <Th>Track Name   <Button onClick={() => sort('trackCensoredName')} colorScheme="blue" size="xs" variant="outline"> sort</Button></Th>
          <Th>Preview</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortType.map((val, index) =>
          <Tr key={index}>
            <Td>{val.artistName}</Td>
            <Td>{val.trackCensoredName}</Td>
            <Td>
              <ModalItunes result={val} />
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
}
