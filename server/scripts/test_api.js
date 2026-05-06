import http from 'http';

console.log("Testing API at http://localhost:5000/courses");

http.get('http://localhost:5000/courses', (res) => {
    console.log('StatusCode:', res.statusCode);
    console.log('Headers:', res.headers);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response Body Length:', data.length);
        console.log('Response Snippet:', data.substring(0, 200));
    });

}).on('error', (e) => {
    console.error("API Request Failed:", e.message);
});
