# email-service

## Setup

Run `npm install`

## Start development server

Run `npm run build-and-watch` in one console window.

Run `npm run serve` in another console window.

## APIs

- `GET /email/v1/timestamp`

- `POST /email/v1/send`

```
{
  "sender_email": string,
  "recipient_email": string,
  "template_id": number,
  "params": {
    "displayed_name": string,
    "otp": string,
  }
}
```
