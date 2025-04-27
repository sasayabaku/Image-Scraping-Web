import React from 'react';

import { Modal, Box, CircularProgress } from '@mui/material';

interface loadingProps {
  text: string;
  open_flag: boolean;
}

const LoadingModal = (props: loadingProps) => {
  return (
    <div>
      <Modal
        open={props.open_flag}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#ffffff',
            borderRadius: '1rem',
            width: '40%',
            minHeight: '3rem',
            padding: '2rem',
          }}
        >
          <div id="innerContent" className="flex justify-center items-center">
            <CircularProgress size="1.5rem" />
            <div className="mx-4">{props.text}</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoadingModal;
