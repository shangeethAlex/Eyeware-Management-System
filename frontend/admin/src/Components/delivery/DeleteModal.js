import axios from "axios";
import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { deliverDelete } from "../Api/deliveryApi";

function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  console.log(props);
  const handleDelete = async () => {
    try {
      await deliverDelete(props.deliveryId);
      setOpen(false);
      props.handleDeleteDone()
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    // <div class="ui fullscreen modal transition visible active" >
    <Modal
      closeIcon
      open={open}
      trigger={<button className="btn btn bg-danger">Delete</button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" content="Confirmation" />
      <Modal.Content>
        <p>Are you sure to delete this entry?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={handleDelete}>
          <Icon name="checkmark" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
    // </div>
  );
}

export default DeleteModal;
