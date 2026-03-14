# OTP SMS format for Web OTP autofill

For the login OTP popup to **autofill** (not just show the popup), the SMS must include an **origin-bound** line that Chrome’s Web OTP API expects.

## Required format

Use this format in your backend when sending the OTP SMS:

```text
<#> ${otp} is your Pursolina OTP

@YOUR_DOMAIN #${otp}
```

- Replace `YOUR_DOMAIN` with your **site hostname only** (no `https://`), e.g. `www.pursolina.com` or `pursolina.com` (must match the origin where the app is served).
- The **last line** must be exactly: `@YOUR_DOMAIN #OTP` (space between domain and `#OTP`).
- The `<#>` line is optional (used by some SMS providers for template approval).

## Example (Node.js)

```js
const otp = "123456";
const appSignature = "pursolina";
// Use the actual domain where your login page is hosted (no https://)
const siteDomain = "www.pursolina.com"; // or process.env.SITE_DOMAIN

const messageBody = `<#> ${otp} is your Pursolina OTP

@${siteDomain} #${otp}`;
```

## Why this fixes autofill

- Chrome shows the OTP popup when it sees an SMS that looks like an OTP.
- It **fills the code** only when the SMS contains the origin-bound line `@domain.com #OTP`, so the code is tied to your site.
- Without that line, the popup can appear but the code may not be passed to the page, so nothing gets filled.

## Reference

- [Web OTP API – web.dev](https://web.dev/web-otp/)
- [Origin-bound one-time codes (SMS)](https://wicg.github.io/sms-one-time-codes/)
