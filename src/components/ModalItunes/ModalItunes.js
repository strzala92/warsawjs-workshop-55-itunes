import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    AspectRatio,
    useDisclosure,
    Badge
  } from "@chakra-ui/react"
  import { useState, useEffect } from 'react';

export function ModalItunes({ result }) {
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