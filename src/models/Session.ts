export default interface Session {
    id?: string;
    userId?: string;
    capacity?: number;
    currentCount?: number;
    name?: string;
    shortSessionCode?: string;
}