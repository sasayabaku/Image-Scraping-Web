import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../components/Header';

import axios from "axios";

interface imgListItem {
  src: string;
  alt: string;
  class: string;
}

interface loadingProps {
  text: string,
  open_flag: boolean,
}

const LoadingModal = (props: loadingProps) => {

  return(
    <div>
      <Modal
        open={props.open_flag}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position:'absolute', top:'50%', left:'50%', 
          transform:'translate(-50%, -50%)',
          bgcolor:'#ffffff', borderRadius:'1rem',
          width:'40%', minHeight: '3rem',
          padding: '2rem'
        }}>
          <div id="innerContent" className="flex justify-center items-center">
            <CircularProgress size="1.5rem" />
            <div className="mx-4">{props.text}</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const Home = () => {

  const [scrapeServerUrl, setScrapeServerUrl] = useState("");
  const [progressFlag, setProgressFlag] = useState(false);
  const [progressText, setProgressText] = useState("");

  const [uuid, setUuid] = useState("");
  const [imgList, setImgList] = useState<imgListItem[]>([]);
  const [selectedImg, setSelectedImg] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const _state: string[] = selectedImg;
    const _selected_idx = _state.indexOf(e.target.value);

    if (_selected_idx < 0){
      _state.push(e.target.value);
      setSelectedImg(_state);
    } else {
      _state.splice(_selected_idx, 1);
      setSelectedImg(_state);
    };

  };

  const listup_image = async() => {

    await setProgressText("Now Scraping....")
    await setProgressFlag(true);

    let url = "http://localhost:9999/listup";

    await axios.post(url, {"url": scrapeServerUrl})
    .then((response) => {
      setImgList(JSON.parse(response.data.img_list));
      setUuid(response.data.connection_id);
    }).catch(error => {
      console.log(error);
    });

    await setProgressFlag(false);
  }

  const listup_image_ui = imgList.map((item, index) => {

    interface hoverInteractionProps {
      img_src: string
    };

    const HoverInteraction = (props: hoverInteractionProps) => {
      return(
        <div>
          <img src={props.img_src} style={{width: '100%'}}/>
        </div>
      )
    };

    return (
      <Grid item xs={3}>
        <FormControl>
          <FormControlLabel 
            control={<Checkbox value={index} onChange={onChange} style={{color: '#00cdcd'}} />}
            label={ <HoverInteraction img_src={item["src"]}/> }
            labelPlacement="top"
          />
        </FormControl>
       </Grid>
    )
  });

  const create_pdf = async() => {

    await setProgressText("Generate PDF File....")
    await setProgressFlag(true);

    let url = "http://localhost:9999/generate";

    const _sorted_selectedImg = selectedImg;
    await _sorted_selectedImg.sort((a, b) => {
      if(Number(a) < Number(b)) return -1;
      if(Number(a) > Number(b)) return 1;
      return 0;
    });

    const data = {
      uuid: uuid,
      indexes: _sorted_selectedImg
    };

    await axios.post(url, data, { headers:{'Content-Type': 'application/json', 'Accept': 'application/pdf'}, responseType: 'blob'})
    .then((response) => {
      
      const url = URL.createObjectURL(new Blob([response.data], { type:  'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', String(uuid) + '.pdf');
      document.body.appendChild(link);
      link.click();

    }).catch(error => {
      console.error(error);
    });

    await setProgressFlag(false);
  };

  return (
    <div className="">
      <Header />
      <div className="flex p-6">
          <TextField required fullWidth size="small" label="url" id="url" value={scrapeServerUrl} onChange={(e) => { setScrapeServerUrl(e.target.value) }} />
          <Button className="mx-2" variant="contained" onClick={() => {listup_image()}}>Scrape</Button>
          <Button className="mx-2" variant="contained" onClick={() => {create_pdf()}}>Create</Button>
        </div>
      <div className="h-screen p-8 flex-y overflow-y-scroll overscroll-contain">
        <LoadingModal 
          text={progressText}
          open_flag={progressFlag}
        />
        <div className="m-4">
          <Grid container spacing={3}>
            {listup_image_ui}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
