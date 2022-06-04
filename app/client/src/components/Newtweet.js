import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import TagIcon from '@mui/icons-material/Tag';
import { baseurl } from '../apicalls';
import toast, { Toaster } from 'react-hot-toast';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../config'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';

export default function Newtweet(props) {
    const [tweet, settweet] = useState('')
    const [image, setImage] = useState('')
    const [hashtagString, setHashtagString] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleUpload = (e) => {
        const data = e.target.files[0]
        if (data.type === "image/png" || data.type === "image/jpg" || data.type === "image/jpeg" || data.type === "image/gif") {
            upload(data)
        }
        else {
            toast.error('Not a valid extension', {
                duration: 2000,
                position: 'top-center',
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '11px'
                },
            });
        }
    }
    const upload = (file) => {
        const storageRef = ref(storage, 'photos/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        toast.loading('uploading...', {
            duration: 3000,
            style: {
               fontSize:'12px'
            }
        });
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL)
                    toast.success('Done uploading', {
                        duration: 1000
                    });
                });
            }
        );

    }
    const uploadTweet = () => {
        if (tweet === '') return
        settweet('')
        let hashtagarr=[]
        if(hashtagString!=='')
        hashtagarr= hashtagString.split(',')
        setHashtagString('')
        const data = {
            uid: props.uid,
            caption: tweet,
            image: image,
            hashtag: hashtagarr
        };
        fetch(`${baseurl}/post/newpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.reload()
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='newtweet' style={{ backgroundColor: 'white', padding: '11px', borderRadius: '9px', display: 'flex', flexDirection: 'column' }}>
            <Toaster />
            <div className="header" style={{ borderBottom: '1px solid #E0E0E0', width: '96.25%', margin: 'auto' }}>
                <h6 style={{ margin: '8px', marginTop: '4px', marginBottom: '8px', fontSize: '12px', }}>Tweet Something</h6>
            </div>
            <div className="writetweet" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '9px' }}>
                <img style={{ width: '32px', borderRadius: '9px', marginLeft: '2%' }} src={props.userimg} alt="" />
                <input type="text" style={{ height: '49px', width: '88%', marginLeft: '9px', outline: 'none', border: 'none', fontFamily: 'Poppins' }} placeholder="Whats's Happening" value={tweet} onChange={e => settweet(e.target.value)} />
            </div>
            <div className="btns" style={{ marginTop: "15px", marginBottom: '15px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input type="file" id="imagein" onChange={(e) => handleUpload(e)} hidden />
                <label htmlFor="imagein">
                    <div className="imgico hoverbtn" style={{ marginLeft: '2%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '-5px', fontFamily: 'Poppins', width: 'fit-content', cursor: 'pointer', padding: '0.2px 9px', borderRadius: '6px' }}>
                        <ImageIcon color="primary" style={{ cursor: 'pointer', width: '22px' }} />
                        <p style={{ fontSize: '12px', marginLeft: "5px", color: '#828282', widht: '275px' }}>Image</p>
                    </div>
                </label>
                <div className="imgico hoverbtn" style={{ marginLeft: '2%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '-5px', fontFamily: 'Poppins', cursor: 'pointer', padding: '0.2px 9px', borderRadius: '6px', }} onClick={handleClickOpen}>
                    <TagIcon color="primary" style={{ cursor: 'pointer', width: '22px' }} />
                    <p style={{ fontSize: '12px', marginLeft: "5px", color: '#828282' }}>Hashtag</p>
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '13.75px', fontFamily: 'Poppins'  }}>
                            Add Hashtags seperated by commas ( , )
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={hashtagString}
                            onChange={e => setHashtagString(e.target.value)}
                            inputProps={{ style: { fontSize: '12.75px', fontFamily: 'Poppins' } }}
                            style={{ marginTop: '19px' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ fontSize: '11.75px', fontFamily: 'Poppins',color:'red' ,fontWeight:'bold'}} onClick={handleClose}>Cancel</Button>
                        <Button style={{ fontSize: '11.75px', fontFamily: 'Poppins',fontWeight:'bold' }} onClick={handleClose}>done</Button>
                    </DialogActions>
                </Dialog>
                <div className="btntweet" style={{ marginLeft: 'auto', width: 'fit-content', marginRight: '9px', }}>
                    <button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '31px', width: '75px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px' }} onClick={() => uploadTweet()}>Tweet</button>
                </div>

            </div>
        </div>
    )
}
