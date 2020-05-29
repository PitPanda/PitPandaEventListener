import Server from '../Server';

export default new Server({
  eventHook: {
    id: 'webhook id',
    token: 'webhook token',
  },
  eventSettings: {
    degrees: {
      major: {
        degreeTag: 'role id', //primary role id to add
        prefix: 'LARGE EVENT!', //would replace "MAJOR EVENT!" in alerts
      },
      minor: {
        degreeTag: 'role id', 
      },
    },
    types: {
      auction: {
        typeTag: 'role id', //seconardy role id to tag
        name: 'CHANCE FOR FEATHER!?', //would replace "AUCTION' in the default alert so it would be "MINOR EVENT! CHANCE FOR FEATHER!? starting now!"
      },
      bounty: {
        postfix: 'gold time!', //would replace "starting now!' in the default alert so it would be "MINOR EVENT! EVENYONE GETS A BOUNTY! gold time!"
      },
      robbery: {
        color: '#ffffff', //change embed color
        toString(){
          return `ITS A HECKING ROBBERY BOYS`; //give it a custom message
        }
      },
      ragepit: {
        ignore: true, //example to make an event not display
      },
    },
  },
  forumsHook: {
    id: 'webhook id',
    token: 'webhook token',
  },
  forumSettings: {
    embedColor: 'ff8000',
  }
});