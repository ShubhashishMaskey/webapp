import React, {useState} from 'react';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const Message = ({toggle, title, msg}) => {
  const [show, setShow] = useState(toggle);
  return (
    <Portal>
      <Dialog visible={show} onDismiss={() => setShow(false)}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{msg}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShow(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Message;
