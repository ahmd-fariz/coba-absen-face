// src/components/WebcamCapture.js
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [message, setMessage] = useState("");

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      const response = await axios.post(
        "http://localhost:5000/mark",
        { image: imageSrc },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(`Attendance marked for user ID: ${response.data.userId}`);
    } catch (error) {
      setMessage("Failed to mark attendance");
    }
  }, [webcamRef]);

  return (
    <div className="container">
      <div className="box">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <button className="button is-primary" onClick={capture}>
          Mark Attendance
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default WebcamCapture;
