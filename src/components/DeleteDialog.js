import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton, Button, useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';

function DeleteDialog({ isOpen, cancelRef, onClose }) {

  const handleClick = () => {
    onClose();
  }
  return (<AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          Delete
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure you want to delete this application? You can't undo this action afterwards.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='red' onClick={handleClick} ml={3}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>)
}

export default DeleteDialog;