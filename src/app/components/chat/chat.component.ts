import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  userId!: string
  messageInput!: string
  messages: Array<MessageModel>

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {
    this.handleMessages()
    this.messageInput = ''
    this.messages = []
  }

  handleMessages() {
    this.chatService.getMessages().subscribe((messages: Array<MessageModel>) => {
      this.messages = messages
    })
  }

  sendMessage() {
    const message: MessageModel = {
      message: this.messageInput,
      user: this.userId
    }

    this.chatService.sendMessage('room1', message)
    this.messageInput = ''
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId']
    this.chatService.joinRoom('room1')
  }
}
