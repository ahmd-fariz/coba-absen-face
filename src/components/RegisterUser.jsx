import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const RegisterUser = () => {
  const webcamRef = useRef(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Fungsi untuk mendeteksi wajah dan mengambil deskriptor
  const detectFaceAndGenerateDescriptor = async (imageSrc) => {
    // Di sini Anda harus mengimplementasikan logika untuk mendeteksi wajah
    // dan menghasilkan deskriptor menggunakan teknologi seperti Face API atau OpenCV.js
    // Contoh sederhana menggunakan fetch untuk mendapatkan deskriptor:
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageSrc }),
    });
    const data = await response.json();
    return data.faceDescriptor; // Mengembalikan deskriptor wajah dari respons
  };

  const register = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const faceDescriptor = await detectFaceAndGenerateDescriptor(imageSrc);

      const blob = await fetch(imageSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", blob, "webcam-image.jpeg"); // Menggunakan nama file default 'webcam-image.jpeg'
      formData.append("faceDescriptor", faceDescriptor); // Menambahkan deskriptor wajah ke FormData

      const response = await axios.post(
        "http://localhost:5000/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(`User registered with ID: ${response.data.id}`);
    } catch (error) {
      setMessage(
        `Failed to register user: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="container">
      <div className="box">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <input
          className="input"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="button is-primary" onClick={register}>
          Register User
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default RegisterUser;
