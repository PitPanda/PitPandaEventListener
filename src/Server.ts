import { WebhookClient, MessageEmbed } from 'discord.js';
import { eventGlobals, forumsGlobals, degrees, types, degreeTag, typeTag } from './defaults';

export type Event = {
  degree: degreeTag;
  type: typeTag;
  timestamp: number;
  id: string;
};

export type Hook = {
  /**
   * if you are getting the id from the webhook url its here
   * discordapp.com/api/webhooks/# ->id<- #/#  token  #
   */
  id: string;
  /**
   * if you are getting the token from the webhook url its here
   * discordapp.com/api/webhooks/#  id  #/#  ->token<-  #
   */
  token: string;
};

type ForumSettings = typeof forumsGlobals;

export type Props = {
  eventHook?: Hook;
  forumsHook?: Hook;
  eventSettings?:{
    degrees?:{
      [p in degreeTag]?: Partial<Omit<CompleteEvent,'typeTag'>>;
    };
    types?:{
      [p in typeTag]?: Partial<Omit<CompleteEvent,'degreeTag'>>;
    };
    globals?: Partial<Omit<CompleteEvent,'degreeTag'|'typeTag'>>;
  };
  forumSettings?: Partial<ForumSettings>;
}

export type CompleteEvent = {
  /**
   * Method called when this event is triggered to generate the main text for the message
   */
  toString(this: CompleteEvent): string;
  /**
   * this replaces the prefix of the event
   * for example this could be "MAJOR EVENT!""
   */
  prefix: string; 
  /**
   * this replaces the name of the event
   * for example this could be "AUCTION""
   */
  name: string;
  /**
   * this replaces the part after the event name
   * for example this could be "starting in 3 minutes!""
   */
  postfix: string;
  /**
   * should this event be announced?
   */
  ignore: boolean;
  /**
   * color to put on the side of the embed
   */
  color: string; 
  /**
   * specific role id to tag for the event
   */
  typeTag?: string;
  /**
   * role id to tag for events of this degree
   */
  degreeTag?: string;
  /**
   * should this pitpanda event id display in the footer
   */
  showId: boolean;
}

export type EventSettings = {
  [p in typeTag]: CompleteEvent;
}

export default class Server{
  eventHook?: WebhookClient;
  forumsHook?: WebhookClient;
  eventSettings?: EventSettings;
  forumSettings?: ForumSettings;

  constructor(props: Props){
    if(props.eventHook){
      this.eventHook = new WebhookClient(props.eventHook.id, props.eventHook.token);
      let settings: any = {};
      for(const [type, data] of Object.entries(types)){
        let serverDegrees = props.eventSettings?.degrees || {};
        let serverTypes = props.eventSettings?.types || {};
        settings[type] = {
          ...eventGlobals,
          ...props.eventSettings?.globals,
          ...degrees[data.degree],
          ...data,
          ...serverDegrees[data.degree],
          ...serverTypes[type as typeTag],
        };
      }
      this.eventSettings = settings;
    }
    if(props.forumsHook){
      this.forumsHook = new WebhookClient(props.forumsHook.id, props.forumsHook.token);
      this.forumSettings = {
        ...forumsGlobals,
        ...props.forumSettings,
      }
    }
  }

  sendEvent(e: Event){
    if(this.eventHook && this.eventSettings){
      const current = this.eventSettings[e.type];
      if(current.ignore) return;
      let content = '';
      if(current.degreeTag) content += `<@&${current.degreeTag}> `;
      if(current.typeTag) content += `<@&${current.typeTag}>`;
      const embed = new MessageEmbed()
        .setColor(current.color)
        .setTitle(current.toString())
        .setTimestamp(e.timestamp);
      if(current.showId) embed.setFooter(e.id);
      this.eventHook.send(content, embed);
    }
  }

  sendForums(e: any){
    if(this.forumsHook && this.forumSettings){
      const embed = new MessageEmbed()
        .setColor(this.forumSettings.embedColor)
        .setTitle(e.title)
        .setURL(e.link)
        .setFooter(`by: ${e.author}`)
        .setTimestamp(e.timestamp)
      this.forumsHook.send(embed);
    }
  }
}