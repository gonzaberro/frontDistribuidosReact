import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function FotoUpload(props) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.slice(0).map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (files.length > 0) getBase64(files[0]);
  });

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      props.setBase64Image(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const thumbs = files.map((file) => {
    return (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    );
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section
      className="container"
      style={{ marginLeft: "10px", marginBottom: "15px" }}
    >
      <div
        {...getRootProps({ className: "dropzone" })}
        className="dropzoneContainer"
      >
        <input {...getInputProps()} />
        <p>Arrastra o selecciona la imagen del perfil</p>
      </div>
      <aside style={thumbsContainer}>
        {files.length > 0 ? (
          thumbs
        ) : (
          <img
            src={props.base64Image}
            width="100"
            style={{ borderRadius: "5px", border: "3px solid rgb(150 10 10)" }}
          ></img>
        )}
      </aside>
    </section>
  );
}
