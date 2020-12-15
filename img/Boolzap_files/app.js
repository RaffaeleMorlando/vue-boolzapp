const app = new Vue(
  {
    el: "#app",
    data : {
      contacts: [
        {
          name: 'Michele',
          avatar: 'img/Avatars Set Flat Style-07.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Ricordati di dargli da mangiare',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              text: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Fabio',
          avatar: 'img/Avatars Set Flat Style-19.png',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              text: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              text: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              text: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Samuele',
          avatar: 'img/Avatars Set Flat Style-38.png',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              text: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              text: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              text: 'Ah scusa!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Luisa',
          avatar: 'img/Avatars Set Flat Style-43.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'Shopping sfrenato?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Mi piacerebbe , ma ho degli impegni',
              status: 'received'
            }
          ],
        },
        {
          name: 'Armando',
          avatar: 'img/Avatars Set Flat Style-21.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'Buon Natale',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Grazie, anche a te',
              status: 'received'
            }
          ],
        },
        {
          name: 'Jack',
          avatar: 'img/Avatars Set Flat Style-44.png',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'Partitina online?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Si dai! Accendo la Playstation',
              status: 'received'
            }
          ],
        },
      ],
      currentMessage: '',
      currentContact: '', 
      index: 0,
      selected : 0,
      selectedMessage: 0,
      hoveredMessage: 0,
      newMessage: '',
      chat: '',
      isShow: false,
      isHovering: false,
      newArrayContacts: []
    },

    updated() {
      this.$nextTick(() => this.scrollToEnd()); 
    },

    created() {
      this.newArrayContacts = this.contacts.map(
        (item) => {
          let riceivedMessage = item.messages.filter(
            (message) => {
             return  message.status == 'received';
            }
          );

          console.log(riceivedMessage);

          return {username: item.name, lastSeen: riceivedMessage[riceivedMessage.length - 1].date};
        }
      );
    },

    computed: {
      filteredChat() {
        if(this.chat.length == 0) {
          return this.contacts;
        } else {
          return this.contacts.filter(
            (element) => {
              return element.name.toLowerCase().includes(this.chat.toLowerCase());
          });
        }
      }
    },

    methods: {

      getCurrent: function(contact,index) {
        this.index = index
        this.currentContact = contact;
        this.currentMessage = contact.messages
        this.selected = index;
      },

      sendMessage : function() {
        this.contacts[this.index].messages.push({date: dayjs().format('DD/MM/YY HH:mm:ss'),text: this.newMessage, status: 'sent'});
        this.newMessage = '';
        const defaultMessages = [
          'Ok', 
          'Ciao', 
          'Come stai?', 
          'Andiamo?' , 
          'Ci sto!',
          'Bene, anche io',
          'Aperitivo?',
          `Wow! E' una notizia fantastica`,
          'Ottima idea',
          'Purtroppo, non ci sono',
          'Buon Natale!',
          'Ho da fare ,oggi! Andiamo un altro giorno',
          '...'
        ];
        const randomNumber = Math.floor(Math.random() * defaultMessages.length);
        const randomNumberReply = Math.floor(Math.random() * 10000);
        const autoMessage = setTimeout(
          () => {
            const date = dayjs().format('DD/MM/YY HH:mm:ss');
            this.contacts[this.index].messages.push({
              date,
              text:defaultMessages[randomNumber],
              status : 'received'
            });

            // const name = this.contacts[this.index].name;
            // const find = this.newArrayContacts.find((item) => item.username === name);
            // find.date = date;
            this.getLastSeen();

            this.scrollToEnd();
            clearTimeout(this.autoMessage);
          }
        ,randomNumberReply)
        this.scrollToEnd();
      },

      scrollToEnd: function() {
        const chatBox = this.$el.querySelector('#chat-background');
        chatBox.scrollTop = chatBox.scrollHeight;
      },

      deleteMessage : function(index) {
        this.currentMessage.splice(index,1);
      },

      showOptions: function(index) {
        this.selectedMessage = index;
        !this.isShow ? this.isShow = true : this.isShow = false;
      },

      getLastSeen: function(index) {
        const name = this.contacts[index].name;
        const find = this.newArrayContacts.find((item) => item.username === name);
        return `Last seen: ${find.lastSeen}`;
      },
    }
  }
);

//--- TODO
//[] add last seen
//[] se non chiudo l'option , resta aperto anche negli altri messaggi
//[] add string 'is typing' to contact bar info


//--- DONE
//[x] add auto scroll to end when a new message is added in chat
//[x] problema cancellare ultimo messsaggio