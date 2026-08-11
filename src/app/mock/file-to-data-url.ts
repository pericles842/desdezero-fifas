import { Observable } from 'rxjs';

export function fileToDataUrl(file: File): Observable<string> {
    return new Observable((subscriber) => {
        const reader = new FileReader();
        reader.onload = () => {
            subscriber.next(reader.result as string);
            subscriber.complete();
        };
        reader.onerror = (err) => subscriber.error(err);
        reader.readAsDataURL(file);
    });
}
