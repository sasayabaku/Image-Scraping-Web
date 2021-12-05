import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Header from '../components/Header';

import axios from "axios";

interface imgListItem {
  src: string;
  alt: string;
  class: string;
}

const Home = () => {

  const [scrapeServerUrl, setScrapeServerUrl] = useState("");

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

  const listup_image = () => {
    let url = "http://localhost:9999/listup";

    axios.post(url, {"url": scrapeServerUrl})
    .then((response) => {
      setImgList(JSON.parse(response.data.img_list));
      setUuid(response.data.connection_id);
    }).catch(error => {
      console.log(error);
    });
  }

  const listup_image_ui = imgList.map((item, index) => {
    return (
      <Grid item xs={3}>
        <FormControl>
          <FormControlLabel 
            control={<Checkbox value={index} onChange={onChange}/>}
            label={<img src={item["src"]}/>}
            labelPlacement="top"
          />
        </FormControl>
       </Grid>
    )
  });

  const create_pdf = async() => {
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

    axios.post(url, data, { headers:{'Content-Type': 'application/json', 'Accept': 'application/pdf'}, responseType: 'blob'})
    .then((response) => {
      
      const url = URL.createObjectURL(new Blob([response.data], { type:  'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', String(uuid) + '.pdf');
      document.body.appendChild(link);
      link.click();

    }).catch(error => {
      console.error(error);
    })
  };

  return (
    <div className="">
      <Header />
      <div className="h-screen p-8 flex-y overflow-y-scroll overscroll-contain">
        <div className="flex">
          <TextField required fullWidth size="small" label="url" id="url" value={scrapeServerUrl} onChange={(e) => { setScrapeServerUrl(e.target.value) }} />
          <Button className="mx-2" variant="contained" onClick={() => {listup_image()}}>Scrape</Button>
          <Button className="mx-2" variant="contained" onClick={() => {create_pdf()}}>Create</Button>
        </div>
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
