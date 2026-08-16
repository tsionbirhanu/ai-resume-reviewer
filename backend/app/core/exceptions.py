class AppError(Exception):
    code = "APP_ERROR"
    message = "An application error occurred."
    status_code = 500

    def __init__(self, message: str | None = None) -> None:
        super().__init__(message or self.message)
        self.client_message = message or self.message


class InvalidInputError(AppError):
    code = "INVALID_INPUT"
    message = "The submitted input is invalid."
    status_code = 400


class PayloadTooLargeError(AppError):
    code = "PAYLOAD_TOO_LARGE"
    message = "The uploaded file is too large."
    status_code = 413


class UnusableTextError(AppError):
    code = "UNUSABLE_TEXT"
    message = "Could not extract enough usable text from the resume."
    status_code = 422


class AIProviderError(AppError):
    code = "AI_PROVIDER_ERROR"
    message = "The AI provider could not complete the request."
    status_code = 502
