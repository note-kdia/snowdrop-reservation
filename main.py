
class Guest:

    def __init__(self):
        self.id = ""
        self.name = ""
        self.name_kana = ""
        self.mail = ""
        self.number_entered = ""
        self.number_reserved = ""
        self.number_cancelled = ""

    def init_from_QR_str(qr_str: str) -> None:
        raise NotImplementedError

    def reserved(self) -> int:
        return self.number_reserved

    def entered(self) -> int:
        return self.number_entered


# read string from QR code
def read_QR() -> str:
    raise NotImplementedError
