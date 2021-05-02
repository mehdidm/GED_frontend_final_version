
import { useDropzone } from 'react-dropzone';
import React, { useState, useEffect, useCallback, Component } from 'react';
import axios from "axios";
import AuthService from "../../services/auth"
import hello from "../../assets/avatar.png";
import * as ReactBootstrap from "react-bootstrap";





export default function Home() {

  const [UserName, setUsername] = useState("");

  useEffect(() => {
    const getCurrentUse = () => {
      const id = AuthService.getCurrentUser();
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      axios.get('user/' + id, config).then(
        res => {
          console.log(res.data.firstName);
          setUsername(res.data.firstName)
        },
        err => {
          console.log(err)
        }
      )
    }
    getCurrentUse()
  }, [])


  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [files, setfiles] = useState([]);
  async function FetchFiles() {
    await axios.get('files', config).then(res => {
      console.log(res.data)
      setfiles(res.data)
    });
  }
  useEffect(
    () => {
      FetchFiles();
    }, []);










  return (
    <main>
      <div className="main__container">
        <MyDropzone_file></MyDropzone_file>
        <ReactBootstrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>id</th>
              <th>size</th>
              <th>ADD</th>
              <th>CONFIG</th>
              <th>CONFIG</th>

            </tr>
          </thead>
          <tbody>
            {files.map(RenderFiles)}

          </tbody>
        </ReactBootstrap.Table>






      </div>
    </main>


  );

};

export function RenderFiles(file, index) {

  return (
    <tr key={index}>
      <td> {file[1]}</td>
      <td>{file[0]}</td>
      <td>{file[3]}</td>
      <td><Versions id={file[0]}></Versions></td>
      <MyDropzone id={file[0]} />



      <td>

        <ReactBootstrap.Button variant="primary" >
          <a href={'http://localhost:8080/files/' + file[0]}>Download main file</a>
        </ReactBootstrap.Button>
        <br />
        <br />

      </td>



    </tr>

  )
}



export function Versions({ id }) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const [versions, setVersions] = useState([])
  useEffect(() => {
    axios.get(`files/ListVersions/${id}`, config)
      .then(res => {
        console.log(res.data)
        setVersions(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>

      { versions.map(version => <li key={version[0]}>{version[1]}</li>)}

    </div>

  )
}

export function MyDropzone({ id }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];



    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", id);
    formData.append("groupe", 1);


    axios.post(`http://localhost:8080/files/${id}`,
      formData,
      {
        Headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    ).then(() => {
      console.log("file uploaded successfully")
      alert("file uploaded successfully")
    }

    ).catch(er => {
      console.log(er);
    });

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          (<p>Drop the files here ...</p>) : (
            <ReactBootstrap.Button variant="info">ADD NEW FILE</ReactBootstrap.Button>
          )

      }
    </div>
  )

};
export function MyDropzone_file() {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    console.log(file);
    const id = localStorage.getItem('id');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", id);
    formData.append("groupe", 1);


    console.log(file);
    axios.post(`http://localhost:8080/files`, formData,

      {
        Headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    ).then(() => {
      console.log("file uploaded successfully")
    }

    ).catch(er => {
      console.log(er);
    });

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          (<p>Drop the files here ...</p>) : (
            <ReactBootstrap.Button variant="info">ADD NEW FILE</ReactBootstrap.Button>
          )

      }
    </div>
  )
};
