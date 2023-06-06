import cv2
from django.http import StreamingHttpResponse
from django.shortcuts import render
from django.views import View

# Create your views here.
# ストリーミング画像・映像を表示するview


class IndexView(View):
    def get(self, request):
        return render(request, "read_qr/index.html", {})


def video_feed_view():
    return lambda _: StreamingHttpResponse(generate_frame(), content_type='multipart/x-mixed-replace; boundary=frame')


def generate_frame():
    capture = cv2.VideoCapture(0)

    while True:
        if not capture.isOpened():
            print("Capture is not opened.")
            break
        # カメラからフレーム画像を取得
        ret, frame = capture.read()
        if not ret:
            print("Failed to read frame.")
            break
        # フレーム画像をバイナリ変換
        ret, jpeg = cv2.imencode('.jpg', frame)
        byte_frame = jpeg.tobytes()
        # フレーム画像のバイナリデータをユーザに送付する
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + byte_frame + b'\r\n\r\n')
