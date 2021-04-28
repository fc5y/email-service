# email-service

## Setup

Run `npm install`

## Start development server

Run `npm run build-and-watch` in one console window.

Run `npm run serve` in another console window.

## APIs
* GET /email/v1/timestamp
* POST /email/v1/send

|                     |                            |
|---------------------|----------------------------|
| Request body schema | {<br>  “sender_email”: string,<br>  “recipient_email”: string,<br>  “template_id”: number,<br>  “params”: {<br>    “displayed_name”: string,<br>    “otp”: string,<br>  }<br>}<br> |

