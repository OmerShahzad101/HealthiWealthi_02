export default async function imageExist(path) {
    return new Promise(async (resolve, reject) => {
        if (path) {
            if (path.startsWith('http')) {
                const available = await checkImage(path);

                if (available) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                path = process.env.REACT_APP_BASE_API + '/' + path;
                return path;
            }
        }
    });
}

function checkImage(url) {
    return new Promise((resolve, reject) => {
        var httpReq = new XMLHttpRequest();
        httpReq.open('GET', url, true);
        httpReq.setRequestHeader('Access-Control-Allow-Headers', '*');
        httpReq.setRequestHeader('Content-type', 'application/ecmascript');
        httpReq.setRequestHeader('Access-Control-Allow-Origin', '*');
        httpReq.send();
        httpReq.onload = function () {
            if (httpReq.status === 200) {
                console.log('image');
                resolve(true);
            } else {
                console.log('not image');
                resolve(false);
            }
        };
    });
}
