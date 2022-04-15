export default function imagePath(path) {

    path = path ? process.env.REACT_APP_IMG+ '/' + path : process.env.REACT_APP_IMG+ '/avatar.jpg';
    return path;
}
