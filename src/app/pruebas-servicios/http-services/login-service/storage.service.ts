import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    setItem(key: string, value: Object) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): Object | null {
        if (!localStorage.getItem(key)) return null;
        return JSON.parse(localStorage.getItem(key)!);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    removeAllItems() {
        localStorage.clear();
    }

}