import { useState } from 'react';
import { useZxing } from 'react-zxing';
import './App.css';

const API_RESERVATIONS = 'http://127.0.0.1:8000/api/reservation/'
const RESERVATION_DETAIL_BLANK = {
  'id': '',
  'name': '',
  'name_kana': '',
  'mail': '',
  'party_size': 0,
  'reserved_at': '',
  'notes': '',
  'checkin_set': [],
  'checkin_sum': 0,
}

export default function Index() {
  const [reservationDetail, setReservationDetail] = useState(RESERVATION_DETAIL_BLANK)
  const [qrResult, setQrResult] = useState('');
  const [isQrValid, setIsQrValid] = useState(false)
  const { ref } = useZxing({
    onResult(reader) {
      const qr_text = reader.getText();
      if (qrResult !== qr_text) {
        setQrResult(qr_text);
        const query_url = API_RESERVATIONS + qr_text
        fetch(query_url)
          .then((response) => {
            if (response.ok) {
              setIsQrValid(true)
            } else {
              setIsQrValid(false)
            }
            return response.json()
          })
          .then((data) => {
            console.log(data)
            if (data.id) {
              setReservationDetail({
                'id': data.id,
                'name': data.name,
                'name_kana': data.name_kana,
                'mail': data.mail,
                'party_size': data.party_size,
                'reserved_at': data.reserved_at,
                'notes': data.notes,
                'checkin_set': data.checkin_set,
                'checkin_sum': data.checkin_sum,
              })
            }
          })
          .catch(error => {
            setReservationDetail(RESERVATION_DETAIL_BLANK)
            setIsQrValid(false)
            console.error('Failed', error);
          })
      }
    },
  });

  function QrReadResultComponent() {
    return (
      <>
        <p>
          <span>last result : </span>
          <span>{qrResult}</span>
        </p>
        <p>isQrValid : {isQrValid ? 'True' : 'False'}</p>
      </>
    )
  }

  function ReservationDetailComponentWrapper() {
    if (isQrValid) {
      return <ReservationDetailComponent />
    } else {
      return <></>
    }
  }

  function ReservationDetailComponent() {
    return (
      <>
        <p>id : {reservationDetail.id}</p>
        <p>name : {reservationDetail.name}</p>
        <p>name_kana : {reservationDetail.name_kana}</p>
        <p>mail : {reservationDetail.mail}</p>
        <p>party_size : {reservationDetail.party_size}</p>
        <p>reserved_at : {reservationDetail.reserved_at}</p>
        <p>notes : {reservationDetail.notes}</p>
        <p>checkin_sum : {reservationDetail.checkin_sum}</p>
        <p>checkin_set : [ {reservationDetail.checkin_set.join(' , ')} ]</p>
      </>
    )
  }

  return (
    <>
      <video ref={ref} />
      <QrReadResultComponent />
      <ReservationDetailComponentWrapper />
    </>
  )
};