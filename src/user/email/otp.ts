const emailTemplate = `
    <!doctype html>
    <html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>OTP Email Template</title>
            <meta name="description" content="OTP Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        <body>
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #20e277;text-decoration:none;font-weight:600">LokSewa Tayari App</a>
                    </div>
                    <p style="font-size:1.1em">Hi, {name}</p>
                    <p>Thank you for choosing LokSewa Tayari App. Use the following OTP to complete your Sign Up procedures. OTP is valid for 15 minutes</p>
                    <h2 style="background: #20e277;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{code}</h2>
                    <p style="font-size:0.9em;">Regards,<br />LokSewa Tayari App</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>NepTechPal Pvt. Ltd.</p>
                        <p>Pokhara, Chipledhunga</p>
                        <p>Nepal</p>
                    </div>
                </div>
            </div>
        </body>
    </html>
`;

export const sendOTPEmailHtml = (name: string, code: string): string => {
  const html = emailTemplate.replace('{name}', name).replace('{code}', code);

  return html;
};
