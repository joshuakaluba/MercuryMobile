import { Config } from '../constants';
import { UserService } from './UserService';
import { Session, SessionOperation, User } from './../models';

export class SessionsService {

    private userService: UserService = new UserService();

    public async createSession(session: Session): Promise<void> {
        const user: User = await this.userService.getUser();
        session.userId = user.id;

        const apiUrl = `${Config.serverUrl}/Sessions/Create`;
        const body = JSON.stringify(session);

        const response = await fetch(apiUrl, {
            method: "post",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to create session');
        }
        return json;
    }    
    
    public async updateSessionCount(sessionOperation: SessionOperation): Promise<Session> {

        const apiUrl = `${Config.serverUrl}/Sessions/UpdateCount`;
        const body = JSON.stringify(sessionOperation);

        const response = await fetch(apiUrl, {
            method: "post",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to update session count');
        }
        return json as Session;
    }    
    
    
    public async updateSession(session: Session): Promise<Session> {

        const apiUrl = `${Config.serverUrl}/Sessions/UpdateSession/${session.id}`;
        const body = JSON.stringify(session);

        const response = await fetch(apiUrl, {
            method: "put",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to update count');
        }
        return json as Session;
    }

    public async joinSession(sessionCode: string): Promise<Session> {

        const apiUrl = `${Config.serverUrl}/Sessions/JoinSession`;

        const user: User = await this.userService.getUser();

        const body = {
            sessionCode,
            userId: user.id
        };

        const response = await fetch(apiUrl, {
            method: "post",
            body:JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to join session');
        }
        return json as Session;
    }    
    
    public async leaveSession(sessionId: string): Promise<Session> {

        const apiUrl = `${Config.serverUrl}/Sessions/LeaveSession`;

        const user: User = await this.userService.getUser();

        const body = {
            sessionId,
            userId: user.id
        };

        const response = await fetch(apiUrl, {
            method: "post",
            body:JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to leave session');
        }
        return json as Session;
    }

    public async getSessions() {
        const user = await this.userService.getUser();
        const apiUrl = `${Config.serverUrl}/Sessions/GetSessionsByUserId/${user.id}`;

        const response = await fetch(apiUrl, { method: "get" });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to get sessions');
        }

        return json;
    }

    public async getSession(sessionId: string) : Promise<Session> {
        const apiUrl = `${Config.serverUrl}/Sessions/GetSession/${sessionId}`;

        const response = await fetch(apiUrl, { method: "get" });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to get session');
        }

        return json;
    }
}