import { Injectable } from '@angular/core';

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { MessageModel } from '../models/message.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any
  private messagesSubject: BehaviorSubject<Array<MessageModel>>

  constructor() {
    this.messagesSubject = new BehaviorSubject<Array<MessageModel>>([])
    this.socketConnect()
  }

  socketConnect() {
    const url = '//localhost:8080/socket'
    const socket = new SockJS(url)
    this.stompClient = Stomp.over(socket)
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (result: any) => {
        const message = JSON.parse(result.body)
        this.messagesSubject.next([...this.messagesSubject.getValue(), message])
      })
    })
  }

  sendMessage(roomId: string, message: MessageModel) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(message))
  }

  getMessages() {
    return this.messagesSubject.asObservable()
  }
}
