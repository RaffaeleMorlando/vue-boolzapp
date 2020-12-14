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
              text: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },
      ],
      currentMessage: '',
      currentContact: '',
      index: 0,
      selected : 0,
      newMessage: '',
      chat: ''

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
      },sendMessage : function() {

        const date = new Date();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();

        const currentTime = `${h}:${m}:${s}`;

        this.currentContact.messages.push({date: currentTime,text: this.newMessage, status: 'sent'});
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
          'Sei speciale',
          'Ho da fare ,oggi! Andiamo un altro giorno',
          '...'
        ];

        const randomNumber = Math.floor(Math.random() * defaultMessages.length);
        const randomNumberReply = Math.floor(Math.random() * 10000);

        const autoMessage = setTimeout(
          () => {
            this.currentContact.messages.push({date: currentTime,text:defaultMessages[randomNumber],status : 'received'});
            clearTimeout(this.autoMessage);
          }
        ,randomNumberReply)
      }
    }
  }
);
