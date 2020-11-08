import React from "react";
import { useDropzone } from "react-dropzone";
import XLSX from "xlsx";
import { apiCalls } from "../../api/apiCalls";
import { useSnackbar } from "notistack";

export default function UploadNotasExamen() {
  const { enqueueSnackbar } = useSnackbar();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 1,
    noClick: false,
  });

  const removeAll = () => {
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
  };

  const handleExcelDrop = () => {
    acceptedFiles.forEach((file) => {
      // See https://stackoverflow.com/questions/30859901/parse-xlsx-with-node-and-create-json
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString; // !! converts object to boolean
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = (e) => {
        // Do what you want with the file contents
        var bstr = e.target.result;
        var workbook = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        var sheet_name_list = workbook.SheetNames[0];
        var jsonFromExcel = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list],
          {
            raw: false,
            dateNF: "MM-DD-YYYY",
            header: 1,
            defval: "",
          }
        );

        apiCalls
          .updateNotasExamen({ excel: jsonFromExcel })
          .then((response) => {
            enqueueSnackbar("Se actualizaron las notas", {
              variant: "success",
            });
          })
          .catch((error) => {
            enqueueSnackbar(error.response.data.errors.details[0].messages[0], {
              variant: "error",
            });
          });
        removeAll();
      };
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    });
  };

  return (
    <section
      className="container"
      style={{ width: "100%", marginLeft: "10px", marginTop: "8px" }}
    >
      <div
        {...getRootProps({
          className: "dropzone",
          acceptedFiles: handleExcelDrop(),
        })}
        className="dropzoneContainer"
      >
        <input {...getInputProps()} />
        <p>Arrastra o selecciona el archivo de notas para subir</p>
      </div>
    </section>
  );
}
