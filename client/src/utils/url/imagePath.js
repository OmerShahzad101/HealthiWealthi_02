export default function imagePath(path) {
    if (path.startsWith('http')) {
        return path;
    } else {
        path = process.env.REACT_APP_BASE_API+ '/' + path;
        return path;
    }
}
