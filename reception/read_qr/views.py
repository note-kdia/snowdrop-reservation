import cv2
from django.http import StreamingHttpResponse
from django.shortcuts import render
from django.views import View

from .models import Reservation

# Create your views here.
# ストリーミング画像・映像を表示するview


class IndexView(View):
    def get(self, request):
        return render(request, "read_qr/index.html", {})


def reservation_list(request):
    res_list = Reservation.objects.all()
    context = {
        "reservation_list": res_list,
    }
    return render(request, "read_qr/reservation_list.html", context)


def reservation_detail(request, reservation_id):
    try:
        r = Reservation.objects.get(id=reservation_id)
        c = r.checkin_set.all()
        context = {
            "reservation": r,
            "checkin_list": c,
            "checkin_sum": r.calc_checkin(),
        }
    except Exception:
        context = {}
    return render(request, "read_qr/reservation_detail.html", context)


def video_feed_view():
    return lambda _: StreamingHttpResponse(generate_frame(), content_type='multipart/x-mixed-replace; boundary=frame')


def generate_frame():
    capture = cv2.VideoCapture(0)

    qcd = cv2.QRCodeDetector()

    while True:
        if not capture.isOpened():
            print("Capture is not opened.")
            break
        # カメラからフレーム画像を取得
        ret, frame = capture.read()
        if not ret:
            print("Failed to read frame.")
            break
        # QRコードの読み取り
        ret_qr, decoded_info, points, _ = qcd.detectAndDecodeMulti(frame)
        if ret_qr:
            for s, p in zip(decoded_info, points):
                if s:
                    # print(s)
                    color = (0, 255, 0)
                else:
                    color = (0, 0, 255)
                # 枠を追加
                frame = cv2.polylines(frame, [p.astype(int)], True, color, 8)
                # 文字列を追加
                frame = cv2.putText(frame, s, p[0].astype(int), cv2.FONT_HERSHEY_SIMPLEX,
                                    1, (0, 0, 255), 2, cv2.LINE_AA)

        # フレーム画像をバイナリ変換
        ret, jpeg = cv2.imencode('.jpg', frame)
        byte_frame = jpeg.tobytes()
        # フレーム画像のバイナリデータをユーザに送付する
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + byte_frame + b'\r\n\r\n')
