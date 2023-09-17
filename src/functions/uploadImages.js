import { 
    getStorage, 
    ref, 
    uploadBytes 
} from "firebase/storage";
import app from "./config";

const storage = getStorage(app);

async function uploadImage(token, file) {}

export {
    uploadImage
}