import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
// import { baseurl } from '../apicalls'
import { storage } from '../config'
import toast from 'react-hot-toast'
import { baseurl } from '../apicalls'


function Account(props) {
    const [email,setEmal]=useState('')
    const[username,setusername]=useState('')
    const[cover,setcover]=useState('')
    const[bio,setBio]=useState('')
    const[password,setPassword]=useState('')
    const[image,setImage]=useState('https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg')
    const handleUpload = (e) => {
        const data = e.target.files[0]
        if (data.type === "image/png" || data.type === "image/jpg" || data.type === "image/jpeg" || data.type === "image/gif") {
            upload(data)
        }
        else {
            toast.error('Upload image in png , jpg format', {
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
                fontSize: '12px'
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
    const handleChange = () => {
        console.log(email,username,password,image,cover,bio);
        if (email === '') {
            return toast.error('Enter email', {
                duration: 2000,
                position: 'top-center',
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '11px'
                },
            });
        }
        if (password === '') {
            return toast.error('Enter Password', {
                duration: 2000,
                position: 'top-center',
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '11px'
                },
            });
        }
        if (username === '') {
            return toast.error('Enter Username', {
                duration: 2000,
                position: 'top-center',
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '11px'
                },
            });
        }
        const data = { email: email, password: password, userimg: image, username: username, coverimg: cover, bio: bio };
        fetch(`${baseurl}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('auth',JSON.stringify(data))
                toast.success('Updated', {
                    duration: 2000,
                    position: 'top-center',
                    style: {
                        fontFamily: 'Poppins',
                        fontSize: '11px'
                    },
                });
            })
            .catch((error) => {
                toast.error('Error sign up', {
                    duration: 2000,
                    style: {
                        fontSize: '12px'
                    }
                });
                console.error('Error:', error);
            });
    }
    return (
        <div className="container" style={{ marginTop: '29px', borderRadius: '9px', padding: '29px', backgroundColor: 'white', height: 'fit-content',paddingTop:'29px',paddingBottom:'19px'  }}>
            <div className="forms" style={{ margin: 'auto',marginTop:'25px',marginBottom:'19px' }}>
                <div className="header">
                    <h3 style={{ marginTop: '-25px', marginBottom: '35px' }}>{props.htext}</h3>
                </div>
                <input onChange={e => handleUpload(e)} type="file" name="" id="imgup" hidden />
                <label htmlFor="imgup">
                    <div className="image" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                        <img style={{ width: '45px', borderRadius: '9px', marginRight: '9px' }} src={image} alt="" />
                        <p style={{ fontSize: "13.5px" }}>Change Photo</p>
                    </div>
                </label>
                <div className="name">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Name *</p>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={username}
                        onChange={e => setusername(e.target.value)}
                        variant="outlined"
                        placeholder='Eric Paul'
                        size="small"
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />
                </div>
                <div className="email">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Email *</p>
                    <TextField
                        type="email"
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={email}
                        placeholder='pauleric@gmail.com'
                        onChange={e => setEmal(e.target.value)}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />
                </div>
                <div className="cover">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Cover Image url</p>
                    <TextField
                        type="email"
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={cover}
                        placeholder="https://www.trendycovers.com/covers/ship_in_harbor_facebook_cover_1490286118.jpg"
                        onChange={e => setcover(e.target.value)}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />
                </div>
                <div className="bio">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Bio</p>
                    <TextField
                        hiddenLabel
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        size="small"
                        placeholder='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever'
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />

                </div>
                <div className="password">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Create Password *</p>
                    <TextField
                        type="password"
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        variant="outlined"
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        size="small"
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />
                </div>
                <div className="btn">
                    <button onClick={e=>handleChange()} style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '31px', width: '75px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginTop: '19px' }}>{props.btntext}</button>
                </div>
            </div>
        </div>
    )
}

export default Account