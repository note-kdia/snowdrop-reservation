import { useRef, useState } from "react"
import Webcam from "react-webcam"
import './App.css'

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
}

export default function Index() {
  return (
    <>
      <h1>Index View</h1>
      <CameraView />
    </>
  )
}

function CameraView() {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false)
  const webcamRef = useRef<Webcam>(null)

  return (
    <>
      <header>
        <h3>Camera View</h3>
      </header>
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>Start</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>Exit</button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
            />
          </div>
        </>
      )}
    </>
  )
}