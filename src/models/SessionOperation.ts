import { SessionOperationEnum } from '../enums';

export default interface SessionOperation {
    sessionId: string;
    sessionOperation: SessionOperationEnum;
}