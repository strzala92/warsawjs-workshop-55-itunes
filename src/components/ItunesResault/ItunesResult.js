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
    artistName: false,
    trackCensoredName: false,
  });
  let fieldName = '';

  const sort = (field) => {
    fieldName = field;
    if (sortASC[field]) {
      setSortType([...props.sort(sortingMethodASC)]);
      const a = sortASC;
      a[field] = false;
      setSort({...sortASC, ...a});
    }
    else {
      setSortType([...props.sort(sortingMethodDSC)]);
      const a = sortASC;
      a[field] = true;
      setSort({...sortASC, ...a});
    }
  }
  const sortingMethodASC = (a, b) => {
    return a[fieldName].toLowerCase() < b[fieldName].toLowerCase() ? -1 : a[fieldName].toLowerCase() > b[fieldName].toLowerCase() ? 1 : 0
  }

  const sortingMethodDSC = (a, b) => {
    return a[fieldName].toLowerCase() < b[fieldName].toLowerCase() ? 1 : a[fieldName].toLowerCase() > b[fieldName].toLowerCase() ? -1 : 0
  }

  return (
    <Table variant="simple">
      <TableCaption>Itunes music</TableCaption>
      <Thead>
        <Tr>
          <Th>Artist Name  <Button onClick={() => sort('artistName')} colorScheme="blue" size="xs" variant="outline">
            {sortASC.artistName &&
            <ArrowDownIcon></ArrowDownIcon>}
            {!sortASC.artistName &&
            <ArrowUpIcon></ArrowUpIcon>}
          </Button></Th>
          <Th>Track Name   <Button onClick={() => sort('trackCensoredName')} colorScheme="blue" size="xs" variant="outline">
            {sortASC.trackCensoredName &&
            <ArrowDownIcon></ArrowDownIcon>}
            {!sortASC.trackCensoredName &&
            <ArrowUpIcon></ArrowUpIcon>}
          </Button></Th>
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
