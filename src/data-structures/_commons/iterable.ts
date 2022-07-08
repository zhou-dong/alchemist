import { Iterator } from './iterator';

export interface Iterable<T> {
    iterator(): Iterator<T>;
}
