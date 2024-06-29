export interface ErrorQuery {
    "status": number,
    "data": {
        "message": string,
        "error": string,
        "statusCode": number
    }
}