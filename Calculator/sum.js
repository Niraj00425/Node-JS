const sumRequestHandler = (req, res) => {
    console.log("In Sum Request Handler", req.url);
    const body = [];

    req.on('data', chunk => body.push(chunk));

    req.on('end', () => {
        const bodyStr = Buffer.concat(body).toString();
        const params = new URLSearchParams(bodyStr);
        const bodyObj = Object.fromEntries(params);

        const result = Number(bodyObj.first) + Number(bodyObj.second);
        console.log("Sum result:", result);

        // Send result to browser
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
            <head><title>Result</title></head>
            <body>
                <h1>Result: ${result}</h1>
                <a href="/calculator">Back to Calculator</a>
            </body>
            </html>
        `);
        return res.end();
    });
};

exports.sumRequestHandler = sumRequestHandler;
