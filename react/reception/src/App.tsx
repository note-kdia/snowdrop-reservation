import { Alert, AlertTitle, Box, Button, ButtonGroup, Card, CssBaseline, Grow, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
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

  function IsQrValidAlert() {
    const valid_qr_alert = (
      <Alert severity="success">
        <AlertTitle>Valid QR</AlertTitle>
        {qrResult}
      </Alert>
    )
    const invalid_qr_alert = (
      <Alert severity="warning">
        <AlertTitle>Invalid QR or ID</AlertTitle>
        {qrResult}
      </Alert>
    )

    if (isQrValid) {
      return (
        <Grow in={true}>{valid_qr_alert}</Grow>
      )
    } else {
      return (
        <Grow in={true}>{invalid_qr_alert}</Grow>
      )
    }
  }

  function QrReadResultComponent() {
    return (
      <>
        <IsQrValidAlert />
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

  const ReservationCheckinButtons = ({ size }: { size: number }) => {
    const values: { value: number }[] = [
      { value: 1 },
      { value: 2 },
    ]
    return (
      <ButtonGroup variant="outlined" aria-label='outlined button group'>
        <Button>{values[0].value}</Button>
        <Button>{values[1].value}</Button>
      </ButtonGroup>
    )
  }

  function ReservationDetailComponent() {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Reservation Detail">
            <TableBody>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>{reservationDetail.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>{reservationDetail.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>name_kana</TableCell>
                <TableCell>{reservationDetail.name_kana}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>mail</TableCell>
                <TableCell>{reservationDetail.mail}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>party_size</TableCell>
                <TableCell>{reservationDetail.party_size}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>reserved_at</TableCell>
                <TableCell>{reservationDetail.reserved_at}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>notes</TableCell>
                <TableCell>{reservationDetail.notes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>checkin_sum</TableCell>
                <TableCell>{reservationDetail.checkin_sum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>checkin_set</TableCell>
                <TableCell>[ {reservationDetail.checkin_set.join(' , ')} ]</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <ReservationCheckinButtons size={3} />
      </>
    )
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Card sx={{ maxWidth: 700 }}>
          <video ref={ref} width="500" />
          <QrReadResultComponent />
        </Card>
        <Card>
          <ReservationDetailComponentWrapper />
        </Card>
      </Box>
    </>
  )
};