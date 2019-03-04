export function getFromStorage(key) {
    if (!key) {
        return null;
    }

    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function setInStorage(key, obj) {
    if (!key) {
        console.error('Error: key no es encontrada');        
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (error) {
        console.error(error);  
    }
}