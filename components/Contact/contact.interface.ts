export interface Contact {
  id: string;
  status: string;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title: string;
  contact_info: string;
  siteName: string;
  open_hours_title: string;
  open_hours: string;
  facebook_link: string;
  instagram_link: string;
  mail_link: string;
  ggmap_link: string;
  ggmap: string;
  connect_title: string;
  connect_content: string;
  connect_link: ConnectLink[];
  social: SocialLink[];
}

export interface SocialLink {
  icon: string;
  link: string;
  name: string;
}
export interface ConnectLink {
  icon: string;
  icon_neg: string;
  link_title: LinkTo;
  link_to: string;
  child: ConnectLink[];
}
export enum LinkTo {
  FACEBOOK = 'messenger',
  LINKEDIN = 'linkedin',
  WHATSAPP = 'whatsapp',
  PHONE = 'phone',
  EMAIL = 'email',
}
